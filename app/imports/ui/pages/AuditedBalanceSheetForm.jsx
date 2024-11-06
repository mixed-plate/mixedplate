import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { AutoForm, ErrorsField, NumField, SubmitField } from 'uniforms-bootstrap5';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import Swal from 'sweetalert2';
import SimpleSchema from 'simpl-schema';
import { AuditedBalanceSheets } from '../../api/auditedBalanceSheet/AuditedBalanceSheet';

const auditedSchema = new SimpleSchema(AuditedBalanceSheets.schema);
const bridge = new SimpleSchema2Bridge(auditedSchema);

const AuditedBalanceSheetPage = () => {
  const { ready } = useTracker(() => {
    const subscription = Meteor.subscribe('AdminPublishAuditedBalanceSheets');
    return {
      ready: subscription.ready(),
    };
  }, []);

  const submit = (data, formRef) => {
    const completeData = {
      ...data,
      createdAt: new Date(),
    };

    AuditedBalanceSheets.collection.insert(completeData, (error) => {
      if (error) {
        Swal.fire('Error', error.reason, 'error');
      } else {
        Swal.fire('Success', 'Audited Balance Sheet added successfully', 'success');
        formRef.reset();
      }
    });
  };

  let formRef = null;
  return (
    <Container className="py-3">
      {ready ? (
        <Row className="justify-content-center">
          <Col xs={12}>
            <Col className="text-center"><h2>Audited Balance Sheet</h2></Col>
            <AutoForm ref={ref => { formRef = ref; }} schema={bridge} onSubmit={data => submit(data, formRef)}>
              <Card>
                <Card.Body>
                  <h4>Cash and Cash Equivalents</h4>
                  <Row>
                    <Col><NumField name="petty_cash" /></Col>
                    <Col><NumField name="cash" /></Col>
                    <Col><NumField name="cash_in_banks" /></Col>
                  </Row>

                  <h4>Other Assets</h4>
                  <Row>
                    <Col><NumField name="accounts_receivable" /></Col>
                    <Col><NumField name="due_from_other_funds" /></Col>
                    <Col><NumField name="interest_and_dividends_receivable" /></Col>
                    <Col><NumField name="inventory_prepaid_items_and_other_assets" /></Col>
                  </Row>
                  <Row>
                    <Col><NumField name="notes_receivable_due_within_1_year" /></Col>
                    <Col><NumField name="notes_receivable_due_after_1_year" /></Col>
                    <Col><NumField name="security_deposits" /></Col>
                    <Col><NumField name="cash_held_by_investment_managers" /></Col>
                  </Row>

                  <h4>Investments</h4>
                  <Row>
                    <Col><NumField name="mutual_funds" /></Col>
                    <Col><NumField name="commingled_funds" /></Col>
                    <Col><NumField name="hedge_funds" /></Col>
                    <Col><NumField name="private_equity" /></Col>
                  </Row>
                  <Row>
                    <Col><NumField name="common_trust_funds" /></Col>
                    <Col><NumField name="common_and_preferred_stocks" /></Col>
                    <Col><NumField name="private_debt" /></Col>
                    <Col><NumField name="others" /></Col>
                  </Row>

                  <SubmitField value="Submit" />
                  <ErrorsField />
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

