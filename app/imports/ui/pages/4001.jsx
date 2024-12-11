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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalendarAlt, 
  faPercent, 
  faMoneyBillWave, 
  faChartLine,
  faBuilding
} from '@fortawesome/free-solid-svg-icons';

// Add custom styles
const styles = {
  container: {
    padding: '2rem',
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
  },
  pageTitle: {
    color: '#2c3e50',
    fontWeight: '600',
    marginBottom: '2rem',
    fontSize: '2.5rem',
  },
  modernCard: {
    borderRadius: '15px',
    border: 'none',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
      transform: 'translateY(-5px)',
    },
  },
  modernButton: {
    backgroundColor: '#4834d4',
    border: 'none',
    borderRadius: '8px',
    padding: '0.8rem 2rem',
    fontWeight: '500',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      backgroundColor: '#686de0',
      transform: 'translateY(-2px)',
    },
  },
  modernSelect: {
    borderRadius: '8px',
    border: '2px solid #e0e0e0',
    padding: '0.8rem',
    marginBottom: '2rem',
    transition: 'border-color 0.2s ease-in-out',
    '&:focus': {
      borderColor: '#4834d4',
      boxShadow: 'none',
    },
  },
  cardTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#2c3e50',
    fontSize: '1.25rem',
    fontWeight: '600',
  },
  icon: {
    color: '#4834d4',
  },
};

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
    <Container fluid style={styles.container}>
      {ready ? (
        <Row className="justify-content-center">
          <Col xs={12}>
            <h2 style={styles.pageTitle} className="text-center">Refinancing Scenarios</h2>
            
            <Form className="mb-4">
              <Form.Group controlId="formBasicSelect">
                <Form.Label className="h5 mb-3">Select Refinancing Duration</Form.Label>
                <Form.Control 
                  as="select" 
                  style={styles.modernSelect}
                  onChange={handleScenarioChange} 
                  value={selectedScenario ? selectedScenario.Description : ''}
                >
                  {scenarios.map(scenario => (
                    <option key={scenario.Description} value={scenario.Description}>{scenario.Description}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form>

            <Row className="mt-5">
              {['Interest', 'Principal', 'Core Operating Budget Percentage'].map((title, index) => (
                <Col xs={12} md={4} className="mb-4" key={index}>
                  <Card style={styles.modernCard}>
                    <Card.Body>
                      <h4 className="mb-4" style={styles.cardTitle}>
                        <FontAwesomeIcon 
                          icon={[faMoneyBillWave, faChartLine, faPercent][index]} 
                          style={styles.icon}
                        />
                        {title}
                      </h4>
                      <Bar 
                        data={[interestData, principalData, coreOpBudgetData][index]} 
                        options={{ 
                          responsive: true,
                          plugins: {
                            legend: {
                              position: 'bottom',
                            },
                          },
                          scales: {
                            y: {
                              beginAtZero: true,
                            },
                          },
                        }} 
                      />
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            {isEditing ? (
              <AutoForm
                ref={ref => { fRef = ref; }}
                schema={schema}
                onSubmit={data => submit(data, fRef)}
                model={selectedScenario}
              >
                <Card style={styles.modernCard} className="mb-4">
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
                    <Card style={styles.modernCard}>
                      <Card.Body className="p-4">
                        <h3 className="mb-4" style={styles.cardTitle}>
                          <FontAwesomeIcon icon={faCalendarAlt} style={styles.icon} />
                          {`Year ${year.slice(-1)}`}
                        </h3>
                        <div className="d-flex flex-column gap-3">
                          <p className="mb-2">
                            <FontAwesomeIcon icon={faMoneyBillWave} style={styles.icon} className="me-2" />
                            <strong>Interest:</strong> {selectedScenario ? selectedScenario[year]?.interest || 'N/A' : 'N/A'}
                          </p>
                          <p className="mb-2">
                            <FontAwesomeIcon icon={faChartLine} style={styles.icon} className="me-2" />
                            <strong>Principal:</strong> {selectedScenario ? selectedScenario[year]?.principal || 'N/A' : 'N/A'}
                          </p>
                          <p className="mb-2">
                            <FontAwesomeIcon icon={faBuilding} style={styles.icon} className="me-2" />
                            <strong>% of Core Op Budget:</strong> {selectedScenario ? selectedScenario[year]?.coreOpBudgetPercent || 'N/A' : 'N/A'}
                          </p>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
                <Col xs={12} className="text-center mt-4">
                  <Button 
                    onClick={() => setIsEditing(true)} 
                    style={styles.modernButton}
                  >
                    Edit Scenarios
                  </Button>
                </Col>
              </Row>
            )}
          </Col>
        </Row>
      ) : (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </Container>
  );
};

export default RefinancingInputSheet;
