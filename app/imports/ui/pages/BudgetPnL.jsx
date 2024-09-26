import React from 'react';
import { AutoForm, ErrorsField, NumField, SubmitField } from 'uniforms-bootstrap5';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
import axios from 'axios';
import { Card, Col, Container, Row } from 'react-bootstrap';

// Define all the field names
const fields = [
  'five_percent_investment_portfolio',
  'revenues',
  'general_fund',
  'core_operating_budget_not_authorized',
  'personnel',
  'salary',
  'program',
  'contract',
  'grants',
  'travel',
  'equipment',
  'overhead',
  'debt_service',
  'other',
  'management',
  'support_services',
  'beneficiary_advocacy',
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

const BudgetPnL = () => {
  // Submit function to handle form submission
  const submit = async (data, formRef) => {
    try {
      const response = await axios.post('/api/budget_pnl', data, {
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
          <Col className="text-center"><h2>Budget PnL</h2></Col>
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

export default BudgetPnL;
