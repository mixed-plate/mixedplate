import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, NumField, SubmitField, SelectField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { AuditedBalanceSheets } from '../../api/auditedBalanceSheet/AuditedBalanceSheet';

// Generate an array of years from 2000 to 2030
const years = Array.from({ length: 31 }, (_, i) => 2000 + i);

// Modify the schema to include the year field as a select
const modifiedSchema = new SimpleSchema(AuditedBalanceSheets.schema);
modifiedSchema.extend({
  year: {
    type: Number,
    allowedValues: years,
    // defaultValue: new Date().getFullYear().toString(), // Default year as string
  },
});

const bridge = new SimpleSchema2Bridge(modifiedSchema);

const AuditedBalanceSheetPage = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [formData, setFormData] = useState(null); // This holds the form data
  const [docId, setDocId] = useState(null);

  // Fetch the data from the database based on the selected year
  const { ready, balanceSheet } = useTracker(() => {
    const subscription = Meteor.subscribe('AdminPublishAuditedBalanceSheets');
    const fetchedSheet = AuditedBalanceSheets.collection.findOne({ year: selectedYear });
    return {
      ready: subscription.ready(),
      balanceSheet: fetchedSheet, // Renamed to 'balanceSheet' for clarity
    };
  }, [selectedYear]);

  useEffect(() => {
    if (balanceSheet) {
      setFormData(balanceSheet);
      setDocId(balanceSheet._id);
    } else {
      setFormData({ year: selectedYear });
      setDocId(null);
    }
  }, [balanceSheet, selectedYear]);

  const submit = (data, formRef) => {
    // Add createdAt field to the data
    const completeData = {
      ...data,
      createdAt: new Date(),
    };

    // If the document exists, update it
    if (docId) {
      AuditedBalanceSheets.collection.update(docId, { $set: completeData }, (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Audited Balance Sheet updated successfully', 'success');
        }
      });
    } else {
      // Otherwise, insert a new document
      AuditedBalanceSheets.collection.insert(completeData, (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Audited Balance Sheet added successfully', 'success');
          formRef.reset();
        }
      });
    }
  };

  let fRef = null;

  return (
    <Container className="py-3">
      {ready ? (
        <Row className="justify-content-center">
          <Col xs={11}>
            <Col className="text-center"><h2>Audited Balance Sheet</h2></Col>
            <AutoForm
              ref={ref => { fRef = ref; }}
              schema={bridge}
              model={formData} // Use formData here to pre-fill the form
              onSubmit={data => submit(data, fRef)}
            >
              <Card>
                <Card.Body>
                  <Row>
                    <Row>
                      {/* Year SelectField - When year changes, fetch data for that year */}
                      <SelectField
                        name="year"
                        value={selectedYear.toString()}
                        onChange={(value) => {
                          setSelectedYear(value);
                          const year = parseInt(value, 10);
                          setSelectedYear(year);
                        }}
                      />
                    </Row>
                    <Row>
                      <h2>Cash and Cash Equivalents</h2>
                      <Col><NumField name="petty_cash" /></Col>
                      <Col><NumField name="cash" /></Col>
                      <Col><NumField name="cash_in_banks" /></Col>
                      <Col><NumField name="cash_total" disabled /></Col>
                    </Row>
                    <h2>Other Assets</h2>
                    <Row>
                      <Col><NumField name="accounts_receivable" /></Col>
                      <Col><NumField name="due_from_other_funds" /></Col>
                      <Col><NumField name="interest_and_dividends_receivable" /></Col>
                    </Row>
                    <Row>
                      <Col><NumField name="inventory_prepaid_items_and_other_assets" /></Col>
                      <Col><NumField name="notes_receivable_due_within_1_year" /></Col>
                      <Col><NumField name="notes_receivable_due_after_1_year" /></Col>
                    </Row>
                    <Row>
                      <Col><NumField name="security_deposits" /></Col>
                      <Col><NumField name="cash_held_by_investment_managers" /></Col>
                    </Row>
                    <h2>Limited liability Company Bs assets</h2>
                    <Row>
                      <Col><NumField name="companyB_buildings" /></Col>
                      <Col><NumField name="companyB_leasehold_improvements" /></Col>
                      <Col><NumField name="companyB_furniture_and_equipment" /></Col>
                    </Row>
                    <Row>
                      <Col><NumField name="companyB_vehicles" /></Col>
                      <Col><NumField name="companyB_less_accumulated_depreciation" /></Col>
                      <Col><NumField name="companyB_net_fixed_assets" /></Col>
                    </Row>
                    <h2>liability for company B </h2>
                    <Row>
                      <Col><NumField name="land" /></Col>
                      <Col><NumField name="subtotal_limited_liability_companyB_assets" disabled /></Col>
                      <Col><NumField name="capital_assets_net" /></Col>
                    </Row>
                    <h2>Restricted Cash and total other assets</h2>
                    <Row>
                      <Col><NumField name="restricted_cash" /></Col>
                      <Col><NumField name="total_other_assets" disabled /></Col>

                    </Row>
                    <h2>Total liabilities and deferred outflows of resources</h2>
                    <Row>
                      <Col><NumField name="deferred_outflows_of_resources_related_to_pension" /></Col>
                      <Col><NumField name="deferred_outflows_of_resources_related_to_ompeb" /></Col>
                      <Col><NumField name="total_assets_and_deferred_outflows_of_resources" disabled /></Col>
                    </Row>
                    <h2>Liabilities</h2>
                    <Row><Col><NumField name="accounts_payable_and_accrued_expenses" /></Col>
                      <Col><NumField name="due_to_funds" /></Col>
                      <Col><NumField name="due_to_other_funds" /></Col>
                    </Row>
                    <h2>Long term liabilities - due within one year</h2>
                    <Row>
                      <Col><NumField name="accrued_vacation" /></Col>
                      <Col><NumField name="workers_compensation" /></Col>
                      <Col><NumField name="capital_lease_obligations" /></Col>
                    </Row>
                    <Row>
                      <Col><NumField name="net_pension_liability" /></Col>
                      <Col><NumField name="notes_payable_buildingA_acquisition" /></Col>
                      <Col><NumField name="line_of_credit_buildingA" /></Col>

                    </Row>
                    <h2>Long term liabilities - due after one year</h2>
                    <Row>
                      <Col><NumField name="accrued_vacation_after_1_year" /></Col>
                      <Col><NumField name="workers_compensation_after_1_year" /></Col>
                      <Col><NumField name="capital_lease_obligations_after_1_year" /></Col>
                    </Row>
                    <Row>
                      <Col><NumField name="notes_payable_buildingA_acquisition_after_1_year" /></Col>
                      <Col><NumField name="line_of_credit_buildingA_after_1_year" /></Col>
                      <Col><NumField name="total_net_assets_or_fund_balances" disabled /></Col>
                    </Row>
                    <h2>Commitments and Contingencies Net Position</h2>
                    <Row>
                      <Col><NumField name="unrestricted" /></Col>
                      <Col><NumField name="temporarily_restricted" /></Col>
                      <Col><NumField name="permanently_restricted" /></Col>
                    </Row>

                    <h2>Investments</h2>
                    <Row>
                      <Col><NumField name="land_buildings_and_equipment" /></Col>
                      <Col><NumField name="investments_publicly_traded_securities" /></Col>
                      <Col><NumField name="investments_other_securities" /></Col>
                    </Row>
                    <Row>
                      <Col><NumField name="investments_program_related" /></Col>
                      <Col><NumField name="intangible_assets" /></Col>
                      <Col><NumField name="other_assets" /></Col>
                    </Row>
                    <SubmitField value={docId ? 'Update' : 'Submit'} />
                    <ErrorsField />
                  </Row>
                </Card.Body>
              </Card>
            </AutoForm>
          </Col>
        </Row>
      ) : (
        <Row className="justify-content-center">
          <Col xs={8} className="text-center">
            <p>Loading...</p>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default AuditedBalanceSheetPage;
