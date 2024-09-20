import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, NumField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Cash } from '../../api/stuff/Cash';


// Create a schema to specify the structure of the cash input data to appear in the form.
const formSchema = new SimpleSchema({
  petty_cash: Number,
  cash: Number,
  cash_in_banks_draw_on_line_credit: Number
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddStuff page for adding a document. */
const CashAndCashEquivalents = () => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { petty_cash, cash, cash_in_banks_draw_on_line_credit } = data;
    const owner = Meteor.user().username;
    Cash.collection.insert(
        { petty_cash, cash, cash_in_banks_draw_on_line_credit, owner },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Item added successfully', 'success');
            formRef.reset();
          }
        },
    );
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
      <Container className="py-3">
        <Row className="justify-content-center">
          <Col xs={5}>
            <Col className="text-center"><h2>Cash and Cash equivalents</h2></Col>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
              <Card>
                <Card.Body>
                  <NumField name="petty_cash" />
                  <NumField name="cash" />
                  <NumField name="cash_in_banks_draw_on_line_credit" />
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

export default CashAndCashEquivalents;
