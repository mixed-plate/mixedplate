import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Card, Col, Container, Row, Form, Button } from 'react-bootstrap';
import { AutoForm, ErrorsField, NumField, SubmitField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Bar } from 'react-chartjs-2'; // Import Bar chart component
import { RefinancingScenarios } from '../../api/workpaper/4001';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

const RefinancingInputSheet = () => {
  // eslint-disable-next-line no-unused-vars
  const [years, setYears] = useState(5);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState(null);
  const { ready, scenarios } = useTracker(() => {
    const subscription = Meteor.subscribe('AdminPublishRefinancingScenarios');
    return {
      ready: subscription.ready(),
      scenarios: RefinancingScenarios.collection.find().fetch(),
    };
  }, []);

  const schema = new SimpleSchema2Bridge(RefinancingScenarios.schema);

  const submit = (data, formRef) => {
    const completeData = {
      ...data,
      createdAt: new Date(),
    };
    RefinancingScenarios.collection.update({ _id: selectedScenario._id }, { $set: completeData }, (error) => {
      if (error) {
        swal('Error', error.reason, 'error');
      } else {
        swal('Success', 'Refinancing scenario updated successfully', 'success');
        formRef.reset();
        setIsEditing(false);
      }
    });
  };

  let fRef = null;

  const handleScenarioChange = (e) => {
    const selectedDescription = e.target.value;
    const scenario = scenarios.find(s => s.Description === selectedDescription);
    setSelectedScenario(scenario);
    setYears(5);
  };

  const yearOrder = ['year6', 'year7', 'year8', 'year9', 'year1', 'year2', 'year3', 'year4', 'year5'];

  const interestData = {
    labels: yearOrder.map(year => `Year ${year.slice(-1)}`),
    datasets: [{
      label: 'Interest',
      data: yearOrder.map(year => (selectedScenario ? selectedScenario[year]?.interest || 0 : 0)),
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    }],
  };

  const principalData = {
    labels: yearOrder.map(year => `Year ${year.slice(-1)}`),
    datasets: [{
      label: 'Principal',
      data: yearOrder.map(year => (selectedScenario ? selectedScenario[year]?.principal || 0 : 0)),
      backgroundColor: 'rgba(153, 102, 255, 0.6)',
    }],
  };

  const coreOpBudgetData = {
    labels: yearOrder.map(year => `Year ${year.slice(-1)}`),
    datasets: [{
      label: '% of Core Op Budget',
      data: yearOrder.map(year => (selectedScenario ? selectedScenario[year]?.coreOpBudgetPercent || 0 : 0)),
      backgroundColor: 'rgba(255, 159, 64, 0.6)',
    }],
  };

  useEffect(() => {
    if (scenarios.length > 0) {
      const firstScenario = scenarios[0];
      setSelectedScenario(firstScenario);
    }
  }, [scenarios]);

  return (
    <Container className="py-3">
      {ready ? (
        <Row className="justify-content-center">
          <Col xs={12}>
            <Col className="text-center mb-4"><h2>4001</h2></Col>
            <Form>
              <Form.Group controlId="formBasicSelect">
                <Form.Label>Select Refinancing Duration</Form.Label>
                <Form.Control as="select" className="modern-select" onChange={handleScenarioChange} value={selectedScenario ? selectedScenario.Description : ''}>
                  {scenarios.map(scenario => (
                    <option key={scenario.Description} value={scenario.Description}>{scenario.Description}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form>
            {/* Bar graphs moved to the top */}
            <Row className="mt-4">
              <Col xs={12} md={4} className="mb-4">
                <Card className="modern-card">
                  <Card.Body>
                    <h4>Interest</h4>
                    <Bar data={interestData} options={{ responsive: true }} />
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} md={4} className="mb-4">
                <Card className="modern-card">
                  <Card.Body>
                    <h4>Principal</h4>
                    <Bar data={principalData} options={{ responsive: true }} />
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} md={4} className="mb-4">
                <Card className="modern-card">
                  <Card.Body>
                    <h4>Core Operating Budget Percentage</h4>
                    <Bar data={coreOpBudgetData} options={{ responsive: true }} />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            {isEditing ? (
              <AutoForm
                ref={ref => { fRef = ref; }}
                schema={schema}
                onSubmit={data => submit(data, fRef)}
                model={selectedScenario}
              >
                <Card className="mb-4 modern-card">
                  <Card.Body>
                    <Row>
                      {yearOrder.map((year) => (
                        <Col key={year} xs={12} md={4} className="mb-3">
                          <h3>{`Year ${year.slice(-1)}`}</h3>
                          <NumField name={`${year}.interest`} placeholder="Interest" className="modern-input" />
                          <NumField name={`${year}.principal`} placeholder="Principal" className="modern-input" />
                          <NumField name={`${year}.coreOpBudgetPercent`} placeholder="% of Core Op Budget" className="modern-input" />
                        </Col>
                      ))}
                      <Col xs={12}>
                        <div className="d-flex justify-content-center">
                          <SubmitField value="Update" className="modern-button" />
                        </div>
                        <ErrorsField />
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </AutoForm>
            ) : (
              <Row className="mb-4">
                {yearOrder.map((year) => (
                  <Col key={year} xs={12} md={4} className="mb-3">
                    <Card className="modern-card">
                      <Card.Body>
                        <h3>{`Year ${year.slice(-1)}`}</h3>
                        <p>Interest: {selectedScenario ? selectedScenario[year]?.interest || 'N/A' : 'N/A'}</p>
                        <p>Principal: {selectedScenario ? selectedScenario[year]?.principal || 'N/A' : 'N/A'}</p>
                        <p>% of Core Op Budget: {selectedScenario ? selectedScenario[year]?.coreOpBudgetPercent || 'N/A' : 'N/A'}</p>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
                <Col xs={12} className="text-center">
                  <Button onClick={() => setIsEditing(true)} className="modern-button">Edit</Button>
                </Col>
              </Row>
            )}
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

export default RefinancingInputSheet;
