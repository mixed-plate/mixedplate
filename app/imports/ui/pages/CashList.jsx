import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Cash } from '../../api/stuff/Cash';
import CashItem from '../components/CashItem';
import LoadingSpinner from '../components/LoadingSpinner';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const CashList = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, cash } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access totu Sff documents.
    const subscription = Meteor.subscribe(Cash.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const cashItems = Cash.collection.find({}).fetch();
    return {
      cash: cashItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
      <Container className="py-3">
        <Row className="justify-content-center">
          <Col md={7}>
            <Col className="text-center">
              <h2>Cash results</h2>
            </Col>
            <Table striped bordered hover>
              <thead>
              <tr>
                <th>Petty Cash</th>
                <th>Cash</th>
                <th>Cash in Banks</th>
                <td>Total </td>
              </tr>
              </thead>
              <tbody>
              {cash.map((cashItem) => (
                  <CashItem key={cashItem._id} cash={cashItem} /> // Correctly map through the cash array
              ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
  ) : <LoadingSpinner />);
};

export default CashList;
