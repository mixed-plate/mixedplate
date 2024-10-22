import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, NumField, SubmitField, SelectField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { AuditedBalanceSheets } from '../../api/auditedBalanceSheet/AuditedBalanceSheet';
import StuffItem from '../components/StuffItem';

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
          <Col xs={11}>
            <Col className="text-center"><h2>Audited Balance Sheet</h2></Col>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
              <Card>
                <Card.Body>
                  <Row>
                    <Row>
                      <SelectField name="year" />
                    </Row>
                    <Row>
                      <h2>Cash and Cash Equivalents</h2>
                      <Col><NumField name="petty_cash" /></Col>
                      <Col><NumField name="cash" /></Col>
                      <Col><NumField name="cash_in_banks" /></Col>
                      <Col><NumField name="cash_total" /></Col>
                    </Row>
                    <h2> other assets test</h2>
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
                      <Col><NumField name="mutual_funds" /></Col>
                    </Row>
                    <Row>
                      <Col><NumField name="commingled_funds" /></Col>
                      <Col><NumField name="hedge_funds" /></Col>
                      <Col><NumField name="private_equity" /></Col>
                    </Row>
                    <Row>
                      <Col><NumField name="common_trust_funds" /></Col>
                      <Col><NumField name="common_and_preferred_stocks" /></Col>
                      <Col><NumField name="private_debt" /></Col>
                    </Row>
                    <Row>
                      <Col><NumField name="others" /></Col>
                      <Col><NumField name="subtotal_investment" /></Col>
                    </Row>
                    <h2>Loan Fund</h2>
                    <Row>
                      <Col><NumField name="us_treasuries" /></Col>
                      <Col><NumField name="us_agencies" /></Col>
                      <Col><NumField name="subtotal_loan_fund" /></Col>
                    </Row>
                    <h2>Investment totals</h2>
                    <Row>
                      <Col><NumField name="investments" /></Col>
                    </Row>

                    <h2>Net</h2>
                    <Row>
                      <Col><NumField name="buildings" /></Col>
                      <Col><NumField name="leasehold_improvements" /></Col>
                      <Col><NumField name="furniture_and_equipment" /></Col>
                      <Col><NumField name="less_accumulated_depreciation" /></Col>
                      <Col><NumField name="net_fixed_assets" /></Col>
                    </Row>
                    <h2>Capital Assets</h2>
                    <Row>
                      <Col><NumField name="landA" /></Col>
                      <Col><NumField name="landB" /></Col>
                      <Col><NumField name="construction_in_progress" /></Col>
                      <Col><NumField name="subtotal_capital_assets" /></Col>
                    </Row>
                    <h2>Company B</h2>
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
                      <Col><NumField name="subtotal_limited_liability_companyB_assets" /></Col>
                      <Col><NumField name="capital_assets_net" /></Col>
                    </Row>
                    <h2>Restricted Cash and total other assets</h2>
                    <Row>
                      <Col><NumField name="restricted_cash" /></Col>
                      <Col><NumField name="total_other_assets" /></Col>

                    </Row>
                    <h2>Total liabilities and deferred inflows of resources</h2>
                    <Row>
                      <Col><NumField name="deferred_outflows_of_resources_related_to_pension" /></Col>
                      <Col><NumField name="deferred_outflows_of_resources_related_to_ompeb" /></Col>
                      <Col><NumField name="total_assets_and_deferred_outflows_of_resources" /></Col>
                    </Row>

                    <h2>Other Assets old</h2>
                    <Row>
                      <Col><NumField name="pledges_receivable" /></Col>
                      <Col><NumField name="grants_receivable" /></Col>
                    </Row>
                    <Row>
                      <Col><NumField name="allowance_for_doubtful_accounts" /></Col>
                      <Col><NumField name="prepaid_expenses" /></Col>
                      <Col><NumField name="inventories_for_sale_or_use" /></Col>
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
                    <h2>Liabilities</h2>
                    <Row>
                      <Col><NumField name="accounts_payable_and_accrued_expenses" /></Col>
                      <Col><NumField name="grants_payable" /></Col>
                      <Col><NumField name="deferred_revenue" /></Col>
                    </Row>
                    <Row>
                      <Col><NumField name="tax_exempt_bond_liabilities" /></Col>
                      <Col><NumField name="escrow_or_custodial_account_liability" /></Col>
                      <Col><NumField name="loans_and_other_payables_to_current_and_former_officers" /></Col>
                    </Row>
                    <Row>
                      <Col><NumField name="secured_mortgages_and_notes_payable_to_unrelated_third_parties" /></Col>
                      <Col><NumField name="unsecured_notes_and_loans_payable_to_unrelated_third_parties" /></Col>
                      <Col><NumField name="other_liabilities" /></Col>
                    </Row>
                    <Row>
                      <Col><NumField name="unrestricted_net_assets" /></Col>
                      <Col><NumField name="temporarily_restricted_net_assets" /></Col>
                      <Col><NumField name="permanently_restricted_net_assets" /></Col>
                    </Row>
                    <Row>
                      <Col><NumField name="capital_stock_or_trust_principal" /></Col>
                      <Col><NumField name="paid_in_or_capital_surplus" /></Col>
                      <Col><NumField name="retained_earnings" /></Col>
                    </Row>
                    <Row>
                      <Col><NumField name="total_net_assets_or_fund_balances" /></Col>
                      <Col><NumField name="total_liabilities_and_net_assets_fund_balances" /></Col>
                    </Row>
                    <h2>Commitments and Contingencies Net Position</h2>
                    <Row>
                      <Col><NumField name="unrestricted" /></Col>
                      <Col><NumField name="temporarily_restricted" /></Col>
                      <Col><NumField name="permanently_restricted" /></Col>
                    </Row>
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

