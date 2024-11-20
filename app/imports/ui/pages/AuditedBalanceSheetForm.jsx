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
          <h2 className="text-center">Audited Balance Sheet</h2>
          <Row>
            <Col>
              <AutoForm
                ref={ref => { fRef = ref; }}
                schema={bridge}
                model={formData} // Use formData here to pre-fill the form
                onSubmit={data => submit(data, fRef)}
              >
                <Card>
                  <Card.Body>
                    <Col>
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
                      <h1>Cash and Cash Equivalents</h1>
                      <NumField name="petty_cash" />
                      <NumField name="cash" />
                      <NumField name="cash_in_banks" />
                      <NumField name="cash_total" disabled />

                      <h2>Other Assets</h2>

                      <NumField name="accounts_receivable" />
                      <NumField name="due_from_other_funds" />
                      <NumField name="interest_and_dividends_receivable" />

                      <NumField name="inventory_prepaid_items_and_other_assets" />
                      <NumField name="notes_receivable_due_within_1_year" />
                      <NumField name="notes_receivable_due_after_1_year" />

                      <NumField name="security_deposits" />
                      <NumField name="cash_held_by_investment_managers" />

                      <h2>Investments</h2>
                      <NumField name="mutual_funds" />
                      <NumField name="commingled_funds" />
                      <NumField name="hedge_funds" />
                      <NumField name="private_equity" />

                      <NumField name="common_trust_funds" />
                      <NumField name="common_and_preferred_stocks" />
                      <NumField name="private_debt" />
                      <NumField name="subtotal_investment" />
                      <NumField name="others" />

                      <h3>Loan Funds</h3>

                      <NumField name="us_treasuries" />
                      <NumField name="us_agencies" />
                      <NumField name="subtotal_loan_fund" />

                      <h2>Investment totals</h2>
                      <NumField name="investments" />
                      <h2>Capital Assets, Net:</h2>
                      <h3>Assets</h3>
                      <NumField name="buildings" />
                      <NumField name="leasehold_improvements" />
                      <NumField name="furniture_and_equipment" />

                      <NumField name="less_accumulated_depreciation" />
                      <NumField name="net_fixed_assets" />

                      <h3>Land:</h3>

                      <NumField name="landA" />
                      <NumField name="landB" />
                      <NumField name="construction_in_progress" />
                      <NumField name="subtotal_capital_assets" />

                      <h3>Limited liability Company B&apos;s assets</h3>
                      <NumField name="companyB_buildings" />
                      <NumField name="companyB_leasehold_improvements" />
                      <NumField name="companyB_furniture_and_equipment" />

                      <NumField name="companyB_vehicles" />
                      <NumField name="companyB_less_accumulated_depreciation" />
                      <NumField name="companyB_net_fixed_assets" />

                      <h3>Liability for Company B </h3>
                      <NumField name="land" />
                      <NumField name="subtotal_limited_liability_companyB_assets" disabled />
                      <NumField name="capital_assets_net" />

                      <h2>Restricted Cash and Total Other Assets</h2>

                      <NumField name="restricted_cash" />
                      <NumField name="total_other_assets" disabled />

                      <h2>Total Liabilities and Deferred Outflows of Resources</h2>
                      <NumField name="deferred_outflows_of_resources_related_to_pension" />
                      <NumField name="deferred_outflows_of_resources_related_to_ompeb" />
                      <NumField name="total_assets_and_deferred_outflows_of_resources" disabled />

                      <h1>Liabilities</h1>
                      <NumField name="accounts_payable_and_accrued_expenses" />
                      <NumField name="due_to_funds" />
                      <NumField name="due_to_other_funds" />

                      <h2>Long Term Liabilities - Due Within 1 Year </h2>
                      <NumField name="accrued_vacation" />
                      <NumField name="workers_compensation" />
                      <NumField name="capital_lease_obligations" />
                      <NumField name="net_pension_liability" />
                      <NumField name="notes_payable_buildingA_acquisition" />
                      <NumField name="line_of_credit_buildingA" />

                      <h2>Long Term Liabilities - Due After 1 Year </h2>
                      <NumField name="accrued_vacation_after_1_year" />
                      <NumField name="workers_compensation_after_1_year" />
                      <NumField name="capital_lease_obligations_after_1_year" />
                      <NumField name="notes_payable_buildingA_acquisition_after_1_year" />
                      <NumField name="line_of_credit_buildingA_after_1_year" />
                      <NumField name="total_net_assets_or_fund_balances" disabled />

                      <h2>Commitments and Contingencies Net Position</h2>

                      <NumField name="unrestricted" />
                      <NumField name="temporarily_restricted" />
                      <NumField name="permanently_restricted" />

                      <h2>Investments</h2>

                      <NumField name="land_buildings_and_equipment" />
                      <NumField name="investments_publicly_traded_securities" />
                      <NumField name="investments_other_securities" />

                      <NumField name="investments_program_related" />
                      <NumField name="intangible_assets" />
                      <NumField name="other_assets" />

                      <SubmitField value={docId ? 'Update' : 'Submit'} />
                      <ErrorsField />
                    </Col>
                  </Card.Body>
                </Card>
              </AutoForm>
            </Col>
            <Col>
              <AutoForm
                ref={ref => { fRef = ref; }}
                schema={bridge}
                model={formData} // Use formData here to pre-fill the form
                onSubmit={data => submit(data, fRef)}
              >
                <Card>
                  <Card.Body>
                    <Col>
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
                      <h1>Cash and Cash Equivalents</h1>
                      <NumField name="petty_cash" />
                      <NumField name="cash" />
                      <NumField name="cash_in_banks" />
                      <NumField name="cash_total" disabled />

                      <h2>Other Assets</h2>

                      <NumField name="accounts_receivable" />
                      <NumField name="due_from_other_funds" />
                      <NumField name="interest_and_dividends_receivable" />

                      <NumField name="inventory_prepaid_items_and_other_assets" />
                      <NumField name="notes_receivable_due_within_1_year" />
                      <NumField name="notes_receivable_due_after_1_year" />

                      <NumField name="security_deposits" />
                      <NumField name="cash_held_by_investment_managers" />

                      <h2>Investments</h2>
                      <NumField name="mutual_funds" />
                      <NumField name="commingled_funds" />
                      <NumField name="hedge_funds" />
                      <NumField name="private_equity" />

                      <NumField name="common_trust_funds" />
                      <NumField name="common_and_preferred_stocks" />
                      <NumField name="private_debt" />
                      <NumField name="subtotal_investment" />
                      <NumField name="others" />

                      <h3>Loan Funds</h3>

                      <NumField name="us_treasuries" />
                      <NumField name="us_agencies" />
                      <NumField name="subtotal_loan_fund" />

                      <h2>Investment totals</h2>
                      <NumField name="investments" />
                      <h2>Capital Assets, Net:</h2>
                      <h3>Assets</h3>
                      <NumField name="buildings" />
                      <NumField name="leasehold_improvements" />
                      <NumField name="furniture_and_equipment" />

                      <NumField name="less_accumulated_depreciation" />
                      <NumField name="net_fixed_assets" />

                      <h3>Land:</h3>

                      <NumField name="landA" />
                      <NumField name="landB" />
                      <NumField name="construction_in_progress" />
                      <NumField name="subtotal_capital_assets" />

                      <h3>Limited liability Company B&apos;s assets</h3>
                      <NumField name="companyB_buildings" />
                      <NumField name="companyB_leasehold_improvements" />
                      <NumField name="companyB_furniture_and_equipment" />

                      <NumField name="companyB_vehicles" />
                      <NumField name="companyB_less_accumulated_depreciation" />
                      <NumField name="companyB_net_fixed_assets" />

                      <h3>Liability for Company B </h3>
                      <NumField name="land" />
                      <NumField name="subtotal_limited_liability_companyB_assets" disabled />
                      <NumField name="capital_assets_net" />

                      <h2>Restricted Cash and Total Other Assets</h2>

                      <NumField name="restricted_cash" />
                      <NumField name="total_other_assets" disabled />

                      <h2>Total Liabilities and Deferred Outflows of Resources</h2>
                      <NumField name="deferred_outflows_of_resources_related_to_pension" />
                      <NumField name="deferred_outflows_of_resources_related_to_ompeb" />
                      <NumField name="total_assets_and_deferred_outflows_of_resources" disabled />

                      <h1>Liabilities</h1>
                      <NumField name="accounts_payable_and_accrued_expenses" />
                      <NumField name="due_to_funds" />
                      <NumField name="due_to_other_funds" />

                      <h2>Long Term Liabilities - Due Within 1 Year </h2>
                      <NumField name="accrued_vacation" />
                      <NumField name="workers_compensation" />
                      <NumField name="capital_lease_obligations" />
                      <NumField name="net_pension_liability" />
                      <NumField name="notes_payable_buildingA_acquisition" />
                      <NumField name="line_of_credit_buildingA" />

                      <h2>Long Term Liabilities - Due After 1 Year </h2>
                      <NumField name="accrued_vacation_after_1_year" />
                      <NumField name="workers_compensation_after_1_year" />
                      <NumField name="capital_lease_obligations_after_1_year" />
                      <NumField name="notes_payable_buildingA_acquisition_after_1_year" />
                      <NumField name="line_of_credit_buildingA_after_1_year" />
                      <NumField name="total_net_assets_or_fund_balances" disabled />

                      <h2>Commitments and Contingencies Net Position</h2>

                      <NumField name="unrestricted" />
                      <NumField name="temporarily_restricted" />
                      <NumField name="permanently_restricted" />

                      <h2>Investments</h2>

                      <NumField name="land_buildings_and_equipment" />
                      <NumField name="investments_publicly_traded_securities" />
                      <NumField name="investments_other_securities" />

                      <NumField name="investments_program_related" />
                      <NumField name="intangible_assets" />
                      <NumField name="other_assets" />

                      <SubmitField value={docId ? 'Update' : 'Submit'} />
                      <ErrorsField />
                    </Col>
                  </Card.Body>
                </Card>
              </AutoForm>
            </Col>
            <Col>
              <AutoForm
                ref={ref => { fRef = ref; }}
                schema={bridge}
                model={formData} // Use formData here to pre-fill the form
                onSubmit={data => submit(data, fRef)}
              >
                <Card>
                  <Card.Body>
                    <Col>
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
                      <h1>Cash and Cash Equivalents</h1>
                      <NumField name="petty_cash" />
                      <NumField name="cash" />
                      <NumField name="cash_in_banks" />
                      <NumField name="cash_total" disabled />

                      <h2>Other Assets</h2>

                      <NumField name="accounts_receivable" />
                      <NumField name="due_from_other_funds" />
                      <NumField name="interest_and_dividends_receivable" />

                      <NumField name="inventory_prepaid_items_and_other_assets" />
                      <NumField name="notes_receivable_due_within_1_year" />
                      <NumField name="notes_receivable_due_after_1_year" />

                      <NumField name="security_deposits" />
                      <NumField name="cash_held_by_investment_managers" />

                      <h2>Investments</h2>
                      <NumField name="mutual_funds" />
                      <NumField name="commingled_funds" />
                      <NumField name="hedge_funds" />
                      <NumField name="private_equity" />

                      <NumField name="common_trust_funds" />
                      <NumField name="common_and_preferred_stocks" />
                      <NumField name="private_debt" />
                      <NumField name="subtotal_investment" />
                      <NumField name="others" />

                      <h3>Loan Funds</h3>

                      <NumField name="us_treasuries" />
                      <NumField name="us_agencies" />
                      <NumField name="subtotal_loan_fund" />

                      <h2>Investment totals</h2>
                      <NumField name="investments" />
                      <h2>Capital Assets, Net:</h2>
                      <h3>Assets</h3>
                      <NumField name="buildings" />
                      <NumField name="leasehold_improvements" />
                      <NumField name="furniture_and_equipment" />

                      <NumField name="less_accumulated_depreciation" />
                      <NumField name="net_fixed_assets" />

                      <h3>Land:</h3>

                      <NumField name="landA" />
                      <NumField name="landB" />
                      <NumField name="construction_in_progress" />
                      <NumField name="subtotal_capital_assets" />

                      <h3>Limited liability Company B&apos;s assets</h3>
                      <NumField name="companyB_buildings" />
                      <NumField name="companyB_leasehold_improvements" />
                      <NumField name="companyB_furniture_and_equipment" />

                      <NumField name="companyB_vehicles" />
                      <NumField name="companyB_less_accumulated_depreciation" />
                      <NumField name="companyB_net_fixed_assets" />

                      <h3>Liability for Company B </h3>
                      <NumField name="land" />
                      <NumField name="subtotal_limited_liability_companyB_assets" disabled />
                      <NumField name="capital_assets_net" />

                      <h2>Restricted Cash and Total Other Assets</h2>

                      <NumField name="restricted_cash" />
                      <NumField name="total_other_assets" disabled />

                      <h2>Total Liabilities and Deferred Outflows of Resources</h2>
                      <NumField name="deferred_outflows_of_resources_related_to_pension" />
                      <NumField name="deferred_outflows_of_resources_related_to_ompeb" />
                      <NumField name="total_assets_and_deferred_outflows_of_resources" disabled />

                      <h1>Liabilities</h1>
                      <NumField name="accounts_payable_and_accrued_expenses" />
                      <NumField name="due_to_funds" />
                      <NumField name="due_to_other_funds" />

                      <h2>Long Term Liabilities - Due Within 1 Year </h2>
                      <NumField name="accrued_vacation" />
                      <NumField name="workers_compensation" />
                      <NumField name="capital_lease_obligations" />
                      <NumField name="net_pension_liability" />
                      <NumField name="notes_payable_buildingA_acquisition" />
                      <NumField name="line_of_credit_buildingA" />

                      <h2>Long Term Liabilities - Due After 1 Year </h2>
                      <NumField name="accrued_vacation_after_1_year" />
                      <NumField name="workers_compensation_after_1_year" />
                      <NumField name="capital_lease_obligations_after_1_year" />
                      <NumField name="notes_payable_buildingA_acquisition_after_1_year" />
                      <NumField name="line_of_credit_buildingA_after_1_year" />
                      <NumField name="total_net_assets_or_fund_balances" disabled />

                      <h2>Commitments and Contingencies Net Position</h2>

                      <NumField name="unrestricted" />
                      <NumField name="temporarily_restricted" />
                      <NumField name="permanently_restricted" />

                      <h2>Investments</h2>

                      <NumField name="land_buildings_and_equipment" />
                      <NumField name="investments_publicly_traded_securities" />
                      <NumField name="investments_other_securities" />

                      <NumField name="investments_program_related" />
                      <NumField name="intangible_assets" />
                      <NumField name="other_assets" />

                      <SubmitField value={docId ? 'Update' : 'Submit'} />
                      <ErrorsField />
                    </Col>
                  </Card.Body>
                </Card>
              </AutoForm>
            </Col>
            <Col>
              <AutoForm
                ref={ref => { fRef = ref; }}
                schema={bridge}
                model={formData} // Use formData here to pre-fill the form
                onSubmit={data => submit(data, fRef)}
              >
                <Card>
                  <Card.Body>
                    <Col>
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
                      <h1>Cash and Cash Equivalents</h1>
                      <NumField name="petty_cash" />
                      <NumField name="cash" />
                      <NumField name="cash_in_banks" />
                      <NumField name="cash_total" disabled />

                      <h2>Other Assets</h2>

                      <NumField name="accounts_receivable" />
                      <NumField name="due_from_other_funds" />
                      <NumField name="interest_and_dividends_receivable" />

                      <NumField name="inventory_prepaid_items_and_other_assets" />
                      <NumField name="notes_receivable_due_within_1_year" />
                      <NumField name="notes_receivable_due_after_1_year" />

                      <NumField name="security_deposits" />
                      <NumField name="cash_held_by_investment_managers" />

                      <h2>Investments</h2>
                      <NumField name="mutual_funds" />
                      <NumField name="commingled_funds" />
                      <NumField name="hedge_funds" />
                      <NumField name="private_equity" />

                      <NumField name="common_trust_funds" />
                      <NumField name="common_and_preferred_stocks" />
                      <NumField name="private_debt" />
                      <NumField name="subtotal_investment" />
                      <NumField name="others" />

                      <h3>Loan Funds</h3>

                      <NumField name="us_treasuries" />
                      <NumField name="us_agencies" />
                      <NumField name="subtotal_loan_fund" />

                      <h2>Investment totals</h2>
                      <NumField name="investments" />
                      <h2>Capital Assets, Net:</h2>
                      <h3>Assets</h3>
                      <NumField name="buildings" />
                      <NumField name="leasehold_improvements" />
                      <NumField name="furniture_and_equipment" />

                      <NumField name="less_accumulated_depreciation" />
                      <NumField name="net_fixed_assets" />

                      <h3>Land:</h3>

                      <NumField name="landA" />
                      <NumField name="landB" />
                      <NumField name="construction_in_progress" />
                      <NumField name="subtotal_capital_assets" />

                      <h3>Limited liability Company B&apos;s assets</h3>
                      <NumField name="companyB_buildings" />
                      <NumField name="companyB_leasehold_improvements" />
                      <NumField name="companyB_furniture_and_equipment" />

                      <NumField name="companyB_vehicles" />
                      <NumField name="companyB_less_accumulated_depreciation" />
                      <NumField name="companyB_net_fixed_assets" />

                      <h3>Liability for Company B </h3>
                      <NumField name="land" />
                      <NumField name="subtotal_limited_liability_companyB_assets" disabled />
                      <NumField name="capital_assets_net" />

                      <h2>Restricted Cash and Total Other Assets</h2>

                      <NumField name="restricted_cash" />
                      <NumField name="total_other_assets" disabled />

                      <h2>Total Liabilities and Deferred Outflows of Resources</h2>
                      <NumField name="deferred_outflows_of_resources_related_to_pension" />
                      <NumField name="deferred_outflows_of_resources_related_to_ompeb" />
                      <NumField name="total_assets_and_deferred_outflows_of_resources" disabled />

                      <h1>Liabilities</h1>
                      <NumField name="accounts_payable_and_accrued_expenses" />
                      <NumField name="due_to_funds" />
                      <NumField name="due_to_other_funds" />

                      <h2>Long Term Liabilities - Due Within 1 Year </h2>
                      <NumField name="accrued_vacation" />
                      <NumField name="workers_compensation" />
                      <NumField name="capital_lease_obligations" />
                      <NumField name="net_pension_liability" />
                      <NumField name="notes_payable_buildingA_acquisition" />
                      <NumField name="line_of_credit_buildingA" />

                      <h2>Long Term Liabilities - Due After 1 Year </h2>
                      <NumField name="accrued_vacation_after_1_year" />
                      <NumField name="workers_compensation_after_1_year" />
                      <NumField name="capital_lease_obligations_after_1_year" />
                      <NumField name="notes_payable_buildingA_acquisition_after_1_year" />
                      <NumField name="line_of_credit_buildingA_after_1_year" />
                      <NumField name="total_net_assets_or_fund_balances" disabled />

                      <h2>Commitments and Contingencies Net Position</h2>

                      <NumField name="unrestricted" />
                      <NumField name="temporarily_restricted" />
                      <NumField name="permanently_restricted" />

                      <h2>Investments</h2>

                      <NumField name="land_buildings_and_equipment" />
                      <NumField name="investments_publicly_traded_securities" />
                      <NumField name="investments_other_securities" />

                      <NumField name="investments_program_related" />
                      <NumField name="intangible_assets" />
                      <NumField name="other_assets" />

                      <SubmitField value={docId ? 'Update' : 'Submit'} />
                      <ErrorsField />
                    </Col>
                  </Card.Body>
                </Card>
              </AutoForm>
            </Col>
            <Col>
              <AutoForm
                ref={ref => { fRef = ref; }}
                schema={bridge}
                model={formData} // Use formData here to pre-fill the form
                onSubmit={data => submit(data, fRef)}
              >
                <Card>
                  <Card.Body>
                    <Col>
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
                      <h1>Cash and Cash Equivalents</h1>
                      <NumField name="petty_cash" />
                      <NumField name="cash" />
                      <NumField name="cash_in_banks" />
                      <NumField name="cash_total" disabled />

                      <h2>Other Assets</h2>

                      <NumField name="accounts_receivable" />
                      <NumField name="due_from_other_funds" />
                      <NumField name="interest_and_dividends_receivable" />

                      <NumField name="inventory_prepaid_items_and_other_assets" />
                      <NumField name="notes_receivable_due_within_1_year" />
                      <NumField name="notes_receivable_due_after_1_year" />

                      <NumField name="security_deposits" />
                      <NumField name="cash_held_by_investment_managers" />

                      <h2>Investments</h2>
                      <NumField name="mutual_funds" />
                      <NumField name="commingled_funds" />
                      <NumField name="hedge_funds" />
                      <NumField name="private_equity" />

                      <NumField name="common_trust_funds" />
                      <NumField name="common_and_preferred_stocks" />
                      <NumField name="private_debt" />
                      <NumField name="subtotal_investment" />
                      <NumField name="others" />

                      <h3>Loan Funds</h3>

                      <NumField name="us_treasuries" />
                      <NumField name="us_agencies" />
                      <NumField name="subtotal_loan_fund" />

                      <h2>Investment totals</h2>
                      <Col><NumField name="investments" /></Col>
                      <h2>Capital Assets, Net:</h2>
                      <h3>Assets</h3>
                      <NumField name="buildings" />
                      <NumField name="leasehold_improvements" />
                      <NumField name="furniture_and_equipment" />

                      <NumField name="less_accumulated_depreciation" />
                      <NumField name="net_fixed_assets" />

                      <h3>Land:</h3>

                      <NumField name="landA" />
                      <NumField name="landB" />
                      <NumField name="construction_in_progress" />
                      <NumField name="subtotal_capital_assets" />

                      <h3>Limited liability Company B&apos;s assets</h3>
                      <NumField name="companyB_buildings" />
                      <NumField name="companyB_leasehold_improvements" />
                      <NumField name="companyB_furniture_and_equipment" />

                      <NumField name="companyB_vehicles" />
                      <NumField name="companyB_less_accumulated_depreciation" />
                      <NumField name="companyB_net_fixed_assets" />

                      <h3>Liability for Company B </h3>
                      <NumField name="land" />
                      <NumField name="subtotal_limited_liability_companyB_assets" disabled />
                      <NumField name="capital_assets_net" />

                      <h2>Restricted Cash and Total Other Assets</h2>

                      <NumField name="restricted_cash" />
                      <NumField name="total_other_assets" disabled />

                      <h2>Total Liabilities and Deferred Outflows of Resources</h2>
                      <NumField name="deferred_outflows_of_resources_related_to_pension" />
                      <NumField name="deferred_outflows_of_resources_related_to_ompeb" />
                      <NumField name="total_assets_and_deferred_outflows_of_resources" disabled />

                      <h1>Liabilities</h1>
                      <NumField name="accounts_payable_and_accrued_expenses" />
                      <NumField name="due_to_funds" />
                      <NumField name="due_to_other_funds" />

                      <h2>Long Term Liabilities - Due Within 1 Year </h2>
                      <NumField name="accrued_vacation" />
                      <NumField name="workers_compensation" />
                      <NumField name="capital_lease_obligations" />
                      <NumField name="net_pension_liability" />
                      <NumField name="notes_payable_buildingA_acquisition" />
                      <NumField name="line_of_credit_buildingA" />

                      <h2>Long Term Liabilities - Due After 1 Year </h2>
                      <NumField name="accrued_vacation_after_1_year" />
                      <NumField name="workers_compensation_after_1_year" />
                      <NumField name="capital_lease_obligations_after_1_year" />
                      <NumField name="notes_payable_buildingA_acquisition_after_1_year" />
                      <NumField name="line_of_credit_buildingA_after_1_year" />
                      <NumField name="total_net_assets_or_fund_balances" disabled />

                      <h2>Commitments and Contingencies Net Position</h2>

                      <NumField name="unrestricted" />
                      <NumField name="temporarily_restricted" />
                      <NumField name="permanently_restricted" />

                      <h2>Investments</h2>

                      <NumField name="land_buildings_and_equipment" />
                      <NumField name="investments_publicly_traded_securities" />
                      <NumField name="investments_other_securities" />

                      <NumField name="investments_program_related" />
                      <NumField name="intangible_assets" />
                      <NumField name="other_assets" />

                      <SubmitField value={docId ? 'Update' : 'Submit'} />
                      <ErrorsField />
                    </Col>
                  </Card.Body>
                </Card>
              </AutoForm>
            </Col>
          </Row>
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
