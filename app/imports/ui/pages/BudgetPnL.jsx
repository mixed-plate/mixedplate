import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Card, Col, Container, Row, Table } from 'react-bootstrap';
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
  const { ready, budgetPnL } = useTracker(() => {
    const subscription = Meteor.subscribe('AdminPublishBudgetPnLs');
    return {
      ready: subscription.ready(),
      budgetPnLs: BudgetPnLs.collection.find().fetch(),
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
        <Row className="justify-content-center mb-4">
          <h2 className="text-center">Budget Panel</h2>
          <Col>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
              <Card>
                <Card.Body>
                  <Col>
                    <Row className="mb-3">
                      <SelectField name="year" />
                    </Row>
                    <Row className="mb-3">
                      <h4>Revenue</h4>
                      <NumField name="five_percent_investment_portfolio" />
                      <NumField name="revenues" />
                      <NumField name="general_fund" />
                      <NumField name="core_operating_budget_not_authorized" />
                    </Row>
                    <Row className="mb-3">
                      <h4>Expenses</h4>
                      <NumField name="personnel" />
                      <NumField name="salary" />
                      <NumField name="program" />
                      <NumField name="contract" />
                      <NumField name="grants" />
                      <NumField name="travel" />
                      <NumField name="equipment" />
                      <NumField name="overhead" />
                      <NumField name="debt_service" />
                      <NumField name="other" />
                    </Row>
                    <Row className="mb-3">
                      <h4>Surplus (Deficit)</h4>
                      <NumField name="management" />
                      <NumField name="support_services" />
                      <NumField name="beneficiary_advocacy" />
                    </Row>
                    <SubmitField value="Submit" />
                    <ErrorsField />
                  </Col>
                </Card.Body>
              </Card>
            </AutoForm>
          </Col>
          <Col>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
              <Card>
                <Card.Body>
                  <Col>
                    <Row className="mb-3">
                      <SelectField name="year" />
                    </Row>
                    <Row className="mb-3">
                      <h4>Revenue</h4>
                      <NumField name="five_percent_investment_portfolio" />
                      <NumField name="revenues" />
                      <NumField name="general_fund" />
                      <NumField name="core_operating_budget_not_authorized" />
                    </Row>
                    <Row className="mb-3">
                      <h4>Expenses</h4>
                      <NumField name="personnel" />
                      <NumField name="salary" />
                      <NumField name="program" />
                      <NumField name="contract" />
                      <NumField name="grants" />
                      <NumField name="travel" />
                      <NumField name="equipment" />
                      <NumField name="overhead" />
                      <NumField name="debt_service" />
                      <NumField name="other" />
                    </Row>
                    <Row className="mb-3">
                      <h4>Surplus (Deficit)</h4>
                      <NumField name="management" />
                      <NumField name="support_services" />
                      <NumField name="beneficiary_advocacy" />
                    </Row>
                    <SubmitField value="Submit" />
                    <ErrorsField />
                  </Col>
                </Card.Body>
              </Card>
            </AutoForm>
          </Col>
          <Col>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
              <Card>
                <Card.Body>
                  <Col>
                    <Row className="mb-3">
                      <SelectField name="year" />
                    </Row>
                    <Row className="mb-3">
                      <h4>Revenue</h4>
                      <NumField name="five_percent_investment_portfolio" />
                      <NumField name="revenues" />
                      <NumField name="general_fund" />
                      <NumField name="core_operating_budget_not_authorized" />
                    </Row>
                    <Row className="mb-3">
                      <h4>Expenses</h4>
                      <NumField name="personnel" />
                      <NumField name="salary" />
                      <NumField name="program" />
                      <NumField name="contract" />
                      <NumField name="grants" />
                      <NumField name="travel" />
                      <NumField name="equipment" />
                      <NumField name="overhead" />
                      <NumField name="debt_service" />
                      <NumField name="other" />
                    </Row>
                    <Row className="mb-3">
                      <h4>Surplus (Deficit)</h4>
                      <NumField name="management" />
                      <NumField name="support_services" />
                      <NumField name="beneficiary_advocacy" />
                    </Row>
                    <SubmitField value="Submit" />
                    <ErrorsField />
                  </Col>
                </Card.Body>
              </Card>
            </AutoForm>
          </Col>
          <Col>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
              <Card>
                <Card.Body>
                  <Col>
                    <Row className="mb-3">
                      <SelectField name="year" />
                    </Row>
                    <Row className="mb-3">
                      <h4>Revenue</h4>
                      <NumField name="five_percent_investment_portfolio" />
                      <NumField name="revenues" />
                      <NumField name="general_fund" />
                      <NumField name="core_operating_budget_not_authorized" />
                    </Row>
                    <Row className="mb-3">
                      <h4>Expenses</h4>
                      <NumField name="personnel" />
                      <NumField name="salary" />
                      <NumField name="program" />
                      <NumField name="contract" />
                      <NumField name="grants" />
                      <NumField name="travel" />
                      <NumField name="equipment" />
                      <NumField name="overhead" />
                      <NumField name="debt_service" />
                      <NumField name="other" />
                    </Row>
                    <Row className="mb-3">
                      <h4>Surplus (Deficit)</h4>
                      <NumField name="management" />
                      <NumField name="support_services" />
                      <NumField name="beneficiary_advocacy" />
                    </Row>
                    <SubmitField value="Submit" />
                    <ErrorsField />
                  </Col>
                </Card.Body>
              </Card>
            </AutoForm>
          </Col>
          <Col>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
              <Card>
                <Card.Body>
                  <Col>
                    <Row className="mb-3">
                      <SelectField name="year" />
                    </Row>
                    <Row className="mb-3">
                      <h4>Revenue</h4>
                      <NumField name="five_percent_investment_portfolio" />
                      <NumField name="revenues" />
                      <NumField name="general_fund" />
                      <NumField name="core_operating_budget_not_authorized" />
                    </Row>
                    <Row className="mb-3">
                      <h4>Expenses</h4>
                      <NumField name="personnel" />
                      <NumField name="salary" />
                      <NumField name="program" />
                      <NumField name="contract" />
                      <NumField name="grants" />
                      <NumField name="travel" />
                      <NumField name="equipment" />
                      <NumField name="overhead" />
                      <NumField name="debt_service" />
                      <NumField name="other" />
                    </Row>
                    <Row className="mb-3">
                      <h4>Surplus (Deficit)</h4>
                      <NumField name="management" />
                      <NumField name="support_services" />
                      <NumField name="beneficiary_advocacy" />
                    </Row>
                    <SubmitField value="Submit" />
                    <ErrorsField />
                  </Col>
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
