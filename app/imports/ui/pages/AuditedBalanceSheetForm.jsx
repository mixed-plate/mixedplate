import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, NumField, SubmitField, TextField, SelectField } from 'uniforms-bootstrap5';
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
    type: SimpleSchema.Integer,
    allowedValues: years,
    defaultValue: new Date().getFullYear(),
  },
});

const bridge = new SimpleSchema2Bridge(modifiedSchema);

const AuditedBalanceSheetPage = () => {
  const { ready } = useTracker(() => {
    const subscription = Meteor.subscribe('AdminPublishAuditedBalanceSheets');
    return {
      ready: subscription.ready(),
    };
  }, []);

  const submit = (data, formRef) => {
    // Add createdAt field to the data
    const completeData = {
      ...data,
      createdAt: new Date(),
    };

    AuditedBalanceSheets.collection.insert(completeData, (error) => {
      if (error) {
        swal('Error', error.reason, 'error');
      } else {
        swal('Success', 'Audited Balance Sheet added successfully', 'success');
        console.log(completeData);
        formRef.reset();
      }
    });
  };

  let fRef = null;
  return (
    <Container className="py-3">
      {ready ? (
        <Row className="justify-content-center">
          <Col xs={8}>
            <Col className="text-center"><h2>Audited Balance Sheet</h2></Col>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
              <Card>
                <Card.Body>
                  <Row>
                    <Row style={{ height: '20px' }} />
                    <Row>
                      <SelectField name="year" />
                    </Row>
                    <Row>
											<h2>Cash and Cash Equivalents</h2>
											<Col style={{ width: '20px'}}><TextField name="petty_cash" /></Col>
											<Col><TextField name="cash" /></Col>
                    </Row>
                    <Row>
											<Col></Col>
										</Row>
										<Row>
											<Col></Col>
										</Row>
                    <TextField name="accounts_receivable" />
                    <TextField name="allowance_for_doubtful_accounts" />
                    <TextField name="pledges_receivable" />
                    <TextField name="grants_receivable" />
                    <TextField name="prepaid_expenses" />
                    <TextField name="inventories_for_sale_or_use" />
                    <TextField name="land_buildings_and_equipment" />
                    <TextField name="investments_publicly_traded_securities" />
                    <TextField name="investments_other_securities" />
                    <TextField name="investments_program_related" />
                    <TextField name="intangible_assets" />
                    <TextField name="other_assets" />
                    <TextField name="accounts_payable_and_accrued_expenses" />
                    <TextField name="grants_payable" />
                    <TextField name="deferred_revenue" />
                    <TextField name="tax_exempt_bond_liabilities" />
                    <TextField name="escrow_or_custodial_account_liability" />
                    <TextField name="loans_and_other_payables_to_current_and_former_officers" />
                    <TextField name="secured_mortgages_and_notes_payable_to_unrelated_third_parties" />
                    <TextField name="unsecured_notes_and_loans_payable_to_unrelated_third_parties" />
                    <TextField name="other_liabilities" />
                    <TextField name="unrestricted_net_assets" />
                    <TextField name="temporarily_restricted_net_assets" />
                    <TextField name="permanently_restricted_net_assets" />
                    <TextField name="capital_stock_or_trust_principal" />
                    <TextField name="paid_in_or_capital_surplus" />
                    <TextField name="retained_earnings" />
                    <TextField name="total_net_assets_or_fund_balances" />
                    <TextField name="total_liabilities_and_net_assets_fund_balances" />
                    <Col>
                      <TextField name="unrestricted" />
                      <TextField name="temporarily_restricted" />
                      <TextField name="permanently_restricted" />
                    </Col>

                    <SubmitField value="Submit" />
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
