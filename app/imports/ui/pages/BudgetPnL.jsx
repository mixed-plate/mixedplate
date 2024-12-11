import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Card, Col, Container, Row, Tabs, Tab } from 'react-bootstrap';
import { AutoForm, ErrorsField, NumField, SelectField, SubmitField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillWave, faChartLine, faSpinner, faCoins, faFileInvoiceDollar, faBalanceScale } from '@fortawesome/free-solid-svg-icons';
import { BudgetPnLs } from '../../api/budgetPnL/BudgetPnL';

// Generate an array of years from 2000 to 2030
const years = Array.from({ length: 31 }, (_, i) => 2000 + i);

// Modify the schema to include the year field as a select
const modifiedSchema = new SimpleSchema(BudgetPnLs.schema);
modifiedSchema.extend({
  year: {
    type: Number,
    allowedValues: years,
    // defaultValue: new Date().getFullYear(),
  },
});

const bridge = new SimpleSchema2Bridge(modifiedSchema);

const BudgetPnLPage = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [formData, setFormData] = useState(null); // This holds the form data
  const [docId, setDocId] = useState(null);

  // Fetch the data from the database based on the selected year
  const { ready, budgetSheet } = useTracker(() => {
    const subscription = Meteor.subscribe('AdminPublishBudgetPnLs');
    const fetchedSheet = BudgetPnLs.collection.findOne({ year: selectedYear });
    return {
      ready: subscription.ready(),

      budgetSheet: fetchedSheet,

    };
  }, [selectedYear]);

  useEffect(() => {
    if (budgetSheet) {
      setFormData(budgetSheet);
      setDocId(budgetSheet._id);
    } else {
      setFormData({ year: selectedYear });
      setDocId(null);
    }
  }, [budgetSheet, selectedYear]);

  const submit = (data, formRef) => {
    const completeData = {
      ...data,
      createdAt: new Date(),
    };
    if (docId) {
      BudgetPnLs.collection.update(docId, { $set: completeData }, (error) => {
        if (error) {
          swal('Error', error.reason, 'error');
        } else {
          swal('Success', 'Budget Panel updated successfully', 'success');
          formRef.reset();
        }
      });
    } else {
      BudgetPnLs.collection.insert(completeData, (error) => {
        if (error) {
          swal('Error', error.reason, 'error');
        } else {
          swal('Success', 'Budget Panel added successfully', 'success');
          formRef.reset();
        }
      });
    }
  };

  let fRef = null;

  return (
    <Container className="py-4 budget-pnl-container">
      {ready ? (
        <Row className="justify-content-center mb-4">
          <h2 className="text-center mb-4 fade-in">
            <FontAwesomeIcon icon={faChartLine} className="me-2 gradient-text pulse" />
            Budget Panel
          </h2>
          <Col md={10} lg={8}>
            <Card className="modern-card">
              <Card.Header className="gradient-header">
                <FontAwesomeIcon icon={faMoneyBillWave} className="me-2" />
                Financial Data Entry
              </Card.Header>
              <Card.Body className="p-4">
                <AutoForm
                  ref={(ref) => { fRef = ref; }}
                  schema={bridge}
                  model={formData}
                  onSubmit={(submittedData) => submit(submittedData, fRef)}
                >
                  <SelectField
                    name="year"
                    className="mb-4"
                    value={selectedYear.toString()}
                    onChange={(value) => setSelectedYear(parseInt(value, 10))}
                  />

                  <Tabs defaultActiveKey="revenue" className="mb-3">
                    <Tab
                      eventKey="revenue"
                      title={(
                        <span>
                          <FontAwesomeIcon icon={faCoins} className="me-2 text-success" />
                          Revenue
                        </span>
                      )}
                    >
                      <Row>
                        <Col md={6}>
                          <div className="section-container">
                            <NumField name="five_percent_investment_portfolio" className="mb-2" />
                            <NumField name="revenues" className="mb-2" />
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="section-container">
                            <NumField name="general_fund" className="mb-2" />
                            <NumField name="core_operating_budget_not_authorized" className="mb-2" />
                            <NumField name="TotalRevenue" disabled className="mb-2" />
                          </div>
                        </Col>
                      </Row>
                    </Tab>

                    <Tab
                      eventKey="expenses"
                      title={(
                        <span>
                          <FontAwesomeIcon icon={faFileInvoiceDollar} className="me-2 text-danger" />
                          Expenses
                        </span>
                      )}
                    >
                      <Row>
                        <Col md={6}>
                          <div className="section-container">
                            <NumField name="personnel" className="mb-2" />
                            <NumField name="salary" className="mb-2" />
                            <NumField name="program" className="mb-2" />
                            <NumField name="contract" className="mb-2" />
                            <NumField name="grants" className="mb-2" />
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="section-container">
                            <NumField name="travel" className="mb-2" />
                            <NumField name="equipment" className="mb-2" />
                            <NumField name="overhead" className="mb-2" />
                            <NumField name="debt_service" className="mb-2" />
                            <NumField name="other" className="mb-2" />
                            <NumField name="totalExpenses" disabled className="mb-2" />
                          </div>
                        </Col>
                      </Row>
                    </Tab>

                    <Tab
                      eventKey="surplus"
                      title={(
                        <span>
                          <FontAwesomeIcon icon={faBalanceScale} className="me-2 text-primary" />
                          Surplus/Deficit
                        </span>
                      )}
                    >
                      <Row>
                        <Col md={6}>
                          <div className="section-container">
                            <NumField name="management" className="mb-2" />
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="section-container">
                            <NumField name="support_services" className="mb-2" />
                            <NumField name="beneficiary_advocacy" className="mb-2" />
                          </div>
                        </Col>
                      </Row>
                    </Tab>
                  </Tabs>

                  <SubmitField value="Submit" className="w-100 mt-3 btn-primary" />
                  <ErrorsField />
                </AutoForm>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <div className="text-center py-5 loading-container">
          <div className="spinner-ripple">
            <FontAwesomeIcon icon={faSpinner} spin size="2x" className="gradient-text" />
          </div>
          <p className="mt-3 text-muted">Loading...</p>
        </div>
      )}
    </Container>
  );
};

const styleTag = document.createElement('style');
styleTag.textContent = `
  .modern-card {
    border: none;
    border-radius: 15px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }

  .modern-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  }

  .gradient-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 15px 15px 0 0;
    padding: 1.5rem;
  }

  .gradient-text {
    background: linear-gradient(135deg, #4b6cb7 0%, #182848 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .section-container {
    position: relative;
    overflow: hidden;
    border-left: 3px solid #e4e9f2;
    padding: 20px;
    border-radius: 0 15px 15px 0;
    background: #f8f9fa;
    margin: 10px 0;
    transition: all 0.3s ease;
  }

  .section-container:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }

  .section-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.1) 100%);
    transition: all 0.3s ease;
  }

  .nav-tabs .nav-link {
    border: none;
    color: #495057;
    padding: 1rem 1.5rem;
    transition: all 0.3s ease;
  }

  .nav-tabs .nav-link.active {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 8px;
    transform: translateY(-2px);
  }

  .form-control {
    border-radius: 8px;
    border: 2px solid #e4e9f2;
    padding: 0.75rem;
    transition: all 0.3s ease;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(5px);
  }

  .form-control:focus {
    box-shadow: 0 0 0 3px rgba(75, 108, 183, 0.1);
    border-color: #4b6cb7;
  }

  .spinner-ripple {
    animation: ripple 1s linear infinite;
  }

  @keyframes ripple {
    0% { transform: scale(0.8); opacity: 1; }
    50% { transform: scale(1.2); opacity: 0.5; }
    100% { transform: scale(0.8); opacity: 1; }
  }

  .fade-in {
    animation: fadeIn 0.5s ease-in;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .pulse {
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
`;
document.head.appendChild(styleTag);

export default BudgetPnLPage;
