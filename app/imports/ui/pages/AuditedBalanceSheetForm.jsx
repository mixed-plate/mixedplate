import React from 'react';
import { AutoForm, ErrorsField, NumField, SubmitField } from 'uniforms-bootstrap5';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
import axios from 'axios';
import { Card, Col, Container, Row } from 'react-bootstrap';

// Define all the field names
const fields = [
  'pretty_cash',
  'cash',
  'cash_in_bank',
  'accounts_receivable',
  'due_from_other_fund',
  'interest_and_dividends_receivable',
  'inventory',
  'notes_receivable_within',
  'notes_receivable_after',
  'security_deposits',
  'cash_held_by_investment_manager',
  'mutual_funds',
  'commingled_funds',
  'hedge_funds',
  'private_equity',
  'common_trust_funds',
  'common_preferred_stock',
  'private_debt',
  'other_investments',
  'us_treasuries',
  'us_agencies',
  'buildings',
  'leasehold_improvements',
  'furniture_fixtures_equipment',
  'less_accumulated_depreciation',
  'land_a',
  'land_b',
  'construction_in_progress',
  'buildings_b',
  'leasehold_improvements_b',
  'furniture_fixtures_equipment_b',
  'less_accumulated_depreciation_b',
  'land_a_b',
  'restricted_cash',
  'deferred_outflows_pension',
  'deferred_outflows_OPEB',
  'accounts_payable_and_accrued_liabilities',
  'due_to_fund',
  'due_to_other_fund',
  'accrued_vacation_within',
  'workers_compensation_within',
  'accrued_management_retirement_within',
  'accrued_lease_guaranty_obligation_within',
  'capital_lease_obligation_within',
  'notes_payable_building_a_within',
  'net_pension_liability_within',
  'net_OPEB_liability_within',
  'line_of_credit_building_a_within',
  'line_of_credit_building_b_within',
  'debt_service_within',
  'accrued_vacation_after',
  'workers_compensation_after',
  'accrued_management_retirement_after',
  'accrued_lease_guaranty_obligation_after',
  'capital_lease_obligation_after',
  'notes_payable_building_a_after',
  'net_pension_liability_after',
  'net_OPEB_liability_after',
  'line_of_credit_building_a_after',
  'line_of_credit_building_b_after',
  'debt_service_after',
  'deferred_inflows_pension',
  'deferred_inflows_OPEB',
  'invested_in_capital_assets',
  'restricted_federal_funds',
  'unrestricted',
];

// Generate the schema definition with labels
const schemaDefinition = fields.reduce((acc, field) => {
  acc[field] = {
    type: Number,
    label: field.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    optional: true, // Make fields optional if needed
  };
  return acc;
}, {});

const formSchema = new SimpleSchema(schemaDefinition);
const bridge = new SimpleSchema2Bridge(formSchema);

const AuditedBalanceSheetForm = () => {
  // Submit function to handle form submission
  const submit = async (data, formRef) => {
    try {
      const response = await axios.post('/api/audited_balance_sheet', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Response data:', response.data);
      swal('Success', 'Data submitted successfully', 'success');
      formRef.reset();
    } catch (error) {
      console.error('Error:', error);
      swal('Error', error.message, 'error');
    }
  };

  let fRef = null;

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={8}>
          <Col className="text-center"><h2>Audited Balance Sheet</h2></Col>
          <AutoForm
            ref={(ref) => { fRef = ref; }}
            schema={bridge}
            onSubmit={(data) => submit(data, fRef)}
          >
            <Card>
              <Card.Body>
                {fields.map((field) => (
                  <NumField key={field} name={field} decimal />
                ))}
                <SubmitField value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default AuditedBalanceSheetForm;
