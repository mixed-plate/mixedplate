import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Card, Col, Container, Row, Badge, Tabs, Tab } from 'react-bootstrap';
import { AutoForm, ErrorsField, NumField, SubmitField, SelectField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBalanceScale, faDollarSign, faSpinner, faPiggyBank, faLandmark, faFileInvoice, faCoins } from '@fortawesome/free-solid-svg-icons';
import { AuditedBalanceSheets } from '../../api/auditedBalanceSheet/AuditedBalanceSheet';

// Generate an array of years from 2000 to 2030
const years = Array.from({ length: 31 }, (_, i) => 2000 + i);

// Modify the schema to include the year field as a select
const modifiedSchema = new SimpleSchema(AuditedBalanceSheets.schema);
modifiedSchema.extend({
  year: {
    type: Number,
    allowedValues: years,
    // defaultValue: new Date().getFullYear().toString(), // Default year as string
  },
});

const bridge = new SimpleSchema2Bridge(modifiedSchema);

const AuditedBalanceSheetPage = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [formData, setFormData] = useState(null); // This holds the form data
  const [docId, setDocId] = useState(null);

  // Fetch the data from the database based on the selected year
  const { ready, balanceSheet } = useTracker(() => {
    const subscription = Meteor.subscribe('AdminPublishAuditedBalanceSheets');
    const fetchedSheet = AuditedBalanceSheets.collection.findOne({ year: selectedYear });
    return {
      ready: subscription.ready(),
      balanceSheet: fetchedSheet, // Renamed to 'balanceSheet' for clarity
    };
  }, [selectedYear]);

  useEffect(() => {
    if (balanceSheet) {
      setFormData(balanceSheet);
      setDocId(balanceSheet._id);
    } else {
      setFormData({ year: selectedYear });
      setDocId(null);
    }
  }, [balanceSheet, selectedYear]);

  const submit = (data, formRef) => {
    // Add createdAt field to the data
    const completeData = {
      ...data,
      createdAt: new Date(),
    };

    // If the document exists, update it
    if (docId) {
      AuditedBalanceSheets.collection.update(docId, { $set: completeData }, (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Audited Balance Sheet updated successfully', 'success');
        }
      });
    } else {
      // Otherwise, insert a new document
      AuditedBalanceSheets.collection.insert(completeData, (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Audited Balance Sheet added successfully', 'success');
          formRef.reset();
        }
      });
    }
  };

  let fRef = null;

  return (
    <Container fluid className="py-4 balance-sheet-container">
      {ready ? (
        <>
          <h2 className="text-center mb-4 fade-in">
            <FontAwesomeIcon icon={faBalanceScale} className="me-2 gradient-text" />
            Audited Balance Sheet
          </h2>
          <Row className="justify-content-center g-4">
            <Col lg={10} xl={8}>
              <Card className="modern-card">
                <Card.Header className="gradient-header d-flex align-items-center">
                  <FontAwesomeIcon icon={faDollarSign} className="me-2" />
                  Financial Statement
                  <Badge bg="light" text="dark" className="ms-auto modern-badge">
                    {selectedYear}
                  </Badge>
                </Card.Header>
                <Card.Body>
                  <AutoForm
                    ref={ref => { fRef = ref; }}
                    schema={bridge}
                    model={formData} // Use formData here to pre-fill the form
                    onSubmit={data => submit(data, fRef)}
                  >
                    <SelectField name="year" className="mb-3" value={selectedYear.toString()} onChange={(value) => setSelectedYear(parseInt(value, 10))} />

                    <Tabs defaultActiveKey="assets" className="mb-3">
                      <Tab
                        eventKey="assets"
                        title={(
                          <span>
                            <FontAwesomeIcon icon={faPiggyBank} className="me-2 text-success" />
                            Assets
                          </span>
                        )}
                      >
                        <Row>
                          <Col md={6}>
                            <div className="financial-section">
                              <h4 className="section-header">Cash and Equivalents</h4>
                              <NumField name="petty_cash" className="mb-2" />
                              <NumField name="cash" className="mb-2" />
                              <NumField name="cash_in_banks" className="mb-2" />
                              <NumField name="cash_total" disabled className="mb-2" />
                            </div>
                          </Col>
                          <Col md={6}>
                            <div className="financial-section">
                              <h4 className="section-header">Other Assets</h4>
                              <NumField name="accounts_receivable" className="mb-2" />
                              <NumField name="due_from_other_funds" className="mb-2" />
                              <NumField name="interest_and_dividends_receivable" className="mb-2" />
                            </div>
                          </Col>
                        </Row>
                      </Tab>
                      <Tab
                        eventKey="capital"
                        title={(
                          <span>
                            <FontAwesomeIcon icon={faLandmark} className="me-2 text-primary" />
                            Capital Assets
                          </span>
                        )}
                      >
                        <Row>
                          <Col md={6}>
                            <div className="financial-section">
                              <h4 className="section-header">Capital Assets, Net</h4>
                              <h5 className="subsection-title">Assets</h5>
                              <NumField name="buildings" className="mb-2" />
                              <NumField name="leasehold_improvements" className="mb-2" />
                              <NumField name="furniture_and_equipment" className="mb-2" />
                              <NumField name="less_accumulated_depreciation" className="mb-2" />
                              <NumField name="net_fixed_assets" className="mb-2" />
                              <h5 className="subsection-title">Land</h5>
                              <NumField name="landA" className="mb-2" />
                              <NumField name="landB" className="mb-2" />
                              <NumField name="construction_in_progress" className="mb-2" />
                              <NumField name="subtotal_capital_assets" className="mb-2" />
                            </div>
                          </Col>
                          <Col md={6}>
                            <div className="financial-section">
                              {/* eslint-disable-next-line react/no-unescaped-entities */}
                              <h4 className="section-header">Company B's Assets</h4>
                              <NumField name="companyB_buildings" className="mb-2" />
                              <NumField name="companyB_leasehold_improvements" className="mb-2" />
                              <NumField name="companyB_furniture_and_equipment" className="mb-2" />
                              <NumField name="companyB_vehicles" className="mb-2" />
                              <NumField name="companyB_less_accumulated_depreciation" className="mb-2" />
                              <NumField name="companyB_net_fixed_assets" className="mb-2" />
                              <NumField name="land" className="mb-2" />
                              <NumField name="subtotal_limited_liability_companyB_assets" disabled className="mb-2" />
                              <NumField name="capital_assets_net" className="mb-2" />
                            </div>
                          </Col>
                        </Row>
                      </Tab>

                      <Tab
                        eventKey="liabilities"
                        title={(
                          <span>
                            <FontAwesomeIcon icon={faFileInvoice} className="me-2 text-danger" />
                            Liabilities
                          </span>
                        )}
                      >
                        <Row>
                          <Col md={6}>
                            <div className="financial-section">
                              <h4 className="section-header">Current Liabilities</h4>
                              <NumField name="accounts_payable_and_accrued_expenses" className="mb-2" />
                              <NumField name="due_to_funds" className="mb-2" />
                              <NumField name="due_to_other_funds" className="mb-2" />
                              <h5 className="subsection-title">Due Within 1 Year</h5>
                              <NumField name="accrued_vacation" className="mb-2" />
                              <NumField name="workers_compensation" className="mb-2" />
                              <NumField name="capital_lease_obligations" className="mb-2" />
                              <NumField name="net_pension_liability" className="mb-2" />
                              <NumField name="notes_payable_buildingA_acquisition" className="mb-2" />
                              <NumField name="line_of_credit_buildingA" className="mb-2" />
                            </div>
                          </Col>
                          <Col md={6}>
                            <div className="financial-section">
                              <h4 className="section-header">Due After 1 Year</h4>
                              <NumField name="accrued_vacation_after_1_year" className="mb-2" />
                              <NumField name="workers_compensation_after_1_year" className="mb-2" />
                              <NumField name="capital_lease_obligations_after_1_year" className="mb-2" />
                              <NumField name="notes_payable_buildingA_acquisition_after_1_year" className="mb-2" />
                              <NumField name="line_of_credit_buildingA_after_1_year" className="mb-2" />
                              <NumField name="total_net_assets_or_fund_balances" disabled className="mb-2" />
                            </div>
                          </Col>
                        </Row>
                      </Tab>

                      <Tab
                        eventKey="other"
                        title={(
                          <span>
                            <FontAwesomeIcon icon={faCoins} className="me-2 text-warning" />
                            Other
                          </span>
                        )}
                      >
                        <Row>
                          <Col md={6}>
                            <div className="financial-section">
                              <h4 className="section-header">Cash & Resources</h4>
                              <NumField name="restricted_cash" className="mb-2" />
                              <NumField name="total_other_assets" disabled className="mb-2" />
                              <NumField name="deferred_outflows_of_resources_related_to_pension" className="mb-2" />
                              <NumField name="deferred_outflows_of_resources_related_to_ompeb" className="mb-2" />
                              <NumField name="total_assets_and_deferred_outflows_of_resources" disabled className="mb-2" />
                            </div>
                          </Col>
                          <Col md={6}>
                            <div className="financial-section">
                              <h4 className="section-header">Investments & Positions</h4>
                              <NumField name="unrestricted" className="mb-2" />
                              <NumField name="temporarily_restricted" className="mb-2" />
                              <NumField name="permanently_restricted" className="mb-2" />
                              <NumField name="land_buildings_and_equipment" className="mb-2" />
                              <NumField name="investments_publicly_traded_securities" className="mb-2" />
                              <NumField name="investments_other_securities" className="mb-2" />
                              <NumField name="investments_program_related" className="mb-2" />
                              <NumField name="intangible_assets" className="mb-2" />
                              <NumField name="other_assets" className="mb-2" />
                            </div>
                          </Col>
                        </Row>
                      </Tab>
                    </Tabs>

                    <SubmitField value={docId ? 'Update' : 'Submit'} className="w-100 mt-4 btn-primary" />
                    <ErrorsField />
                  </AutoForm>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      ) : (
        <div className="text-center py-5 loading-container">
          <div className="spinner-ripple">
            <FontAwesomeIcon icon={faSpinner} spin size="2x" className="gradient-text" />
          </div>
          <p className="mt-3 text-muted">Loading data...</p>
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
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }

  .modern-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  }

  .financial-section {
    background: rgba(255, 255, 255, 0.8);
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    border: 1px solid rgba(228, 233, 242, 0.5);
    backdrop-filter: blur(5px);
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
  }

  .financial-section:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }

  .section-header {
    color: #182848;
    font-weight: 600;
    margin-bottom: 1.5rem;
    padding-bottom: 0.75rem;
    border-bottom: 2px solid rgba(75, 108, 183, 0.2);
    position: relative;
    padding-left: 2rem;
  }

  .section-header::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 1rem;
    height: 2px;
    background: linear-gradient(90deg, #6a11cb, #2575fc);
    transform: translateY(-50%);
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

export default AuditedBalanceSheetPage;
