import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, NumField, SelectField, SubmitField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { BudgetPnLs } from '../../api/budgetPnL/BudgetPnL';

// Generate an array of years from 2000 to 2030
const years = Array.from({ length: 31 }, (_, i) => 2000 + i);

// Modify the schema to include the year field as a select
const modifiedSchema = new SimpleSchema(BudgetPnLs.schema);
modifiedSchema.extend({
  year: {
    type: SimpleSchema.Integer,
    allowedValues: years,
    defaultValue: new Date().getFullYear(),
  },
});

const bridge = new SimpleSchema2Bridge(modifiedSchema);

const BudgetPnLPage = () => {
  const { ready } = useTracker(() => {
    const subscription = Meteor.subscribe('AdminPublishBudgetPnLs');
    return {
      ready: subscription.ready(),
    };
  }, []);

  const submit = (data, formRef) => {
    const completeData = {
      ...data,
      createdAt: new Date(),
    };

    BudgetPnLs.collection.insert(completeData, (error) => {
      if (error) {
        swal('Error', error.reason, 'error');
      } else {
        swal('Success', 'Budget Panel added successfully', 'success');
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
          <Col xs={12}>
            <Col className="text-center"><h2>Budget Panel</h2></Col>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
              <Card>
                <Card.Body>
                  <Row>
                    <Row>
                      <SelectField name="year" />
                    </Row>
                    <h1>Revenue</h1>
                    <Row>
                      <Col><NumField name="five_percent_investment_portfolio" /></Col>
                      <Col><NumField name="revenues" /></Col>
                      <Col><NumField name="general_fund" /></Col>
                    </Row>
                    <Row>
                      <Col><NumField name="core_operating_budget_not_authorized" /></Col>
                      <Col />
                      <Col />

                    </Row>

                    <h1>Expenses</h1>
                    <Row>
                      <Col><NumField name="personnel" /></Col>
                      <Col><NumField name="salary" /></Col>
                      <Col><NumField name="program" /></Col>
                      <Col><NumField name="contract" /></Col>
                    </Row>
                    <Row>
                      <Col><NumField name="grants" /></Col>
                      <Col><NumField name="travel" /></Col>
                      <Col><NumField name="equipment" /></Col>
                      <Col><NumField name="overhead" /></Col>
                    </Row>
                    <Row>
                      <Col><NumField name="debt_service" /></Col>
                      <Col><NumField name="other" /></Col>
                      <Col />
                      <Col />
                    </Row>
                    <h1>Surplus (Deficit)</h1>
                    <Row>
                      <Col><NumField name="management" /></Col>
                      <Col><NumField name="support_services" /></Col>
                      <Col><NumField name="beneficiary_advocacy" /></Col>
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

export default BudgetPnLPage;
