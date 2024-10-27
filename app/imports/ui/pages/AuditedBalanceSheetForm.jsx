import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import Swal from 'sweetalert2'; // Ensure you have sweetalert2 installed
import { AuditedBalanceSheets } from '../../api/auditedBalanceSheet/AuditedBalanceSheet';

const AuditedBalanceSheetPage = () => {
  // State for company name
  const [companyName, setCompanyName] = useState('');

  // Fetch all balance sheets
  const { ready, balanceSheets } = useTracker(() => {
    const subscription = Meteor.subscribe('AdminPublishAuditedBalanceSheets');
    const fetchedSheets = AuditedBalanceSheets.collection.find({}, { sort: { year: 1 } }).fetch();
    return {
      ready: subscription.ready(),
      balanceSheets: fetchedSheets,
    };
  }, []);

  // Extract unique years from balance sheets, or set default years if none
  const defaultYears = [6, 7, 8, 9]; // Replace with your desired default years
  const years =
    balanceSheets.length > 0
      ? [...new Set(balanceSheets.map((sheet) => sheet.year))].sort()
      : defaultYears;

  // Initialize data state
  const initialData = years.reduce((acc, year) => {
    acc[year] = { year };
    return acc;
  }, {});
  const [data, setData] = useState(initialData);

  // Update data state when balanceSheets or years change
  useEffect(() => {
    const newData = {};
    years.forEach((year) => {
      newData[year] = balanceSheets.find((sheet) => sheet.year === year) || { year };
    });
    setData(newData);
  }, [balanceSheets, years]);

  // Sections and items with labels and keys
  const sections = [
    {
      label: 'CASH AND CASH EQUIVALENTS',
      items: [
        { label: 'Petty Cash', key: 'petty_cash' },
        { label: 'Cash', key: 'cash' },
        { label: 'Cash in Banks/Draw on Line of Credit', key: 'cash_in_banks' },
        {
          label: 'Total Cash and Cash Equivalents',
          key: 'cash_total',
          computed: (yearData) =>
            parseFloat(yearData.petty_cash || 0) +
            parseFloat(yearData.cash || 0) +
            parseFloat(yearData.cash_in_banks || 0),
        },
      ],
    },
    {
      label: 'OTHER ASSETS',
      items: [
        { label: 'Accounts Receivable', key: 'accounts_receivable' },
        { label: 'Due from Other Funds', key: 'due_from_other_funds' },
        { label: 'Interest and Dividends Receivable', key: 'interest_and_dividends_receivable' },
        {
          label: 'Inventory, Prepaid Items and Other Assets',
          key: 'inventory_prepaid_items_and_other_assets',
        },
        { label: 'Notes Receivable - Due Within One Year', key: 'notes_receivable_due_within_1_year' },
        { label: 'Notes Receivable - Due After One Year', key: 'notes_receivable_due_after_1_year' },
        { label: 'Security Deposits', key: 'security_deposits' },
        { label: 'Cash Held by Investment Managers', key: 'cash_held_by_investment_managers' },
      ],
    },
    {
      label: 'INVESTMENTS',
      items: [
        { label: 'Mutual Funds', key: 'mutual_funds' },
        { label: 'Commingled Funds', key: 'commingled_funds' },
        { label: 'Hedge Funds', key: 'hedge_funds' },
        { label: 'Private Equity', key: 'private_equity' },
        { label: 'Common Trust Funds', key: 'common_trust_funds' },
        { label: 'Common & Preferred Stocks', key: 'common_and_preferred_stocks' },
        { label: 'Private Debt', key: 'private_debt' },
        { label: 'Others', key: 'others' },
        {
          label: 'Subtotal - Investment',
          key: 'subtotal_investment',
          computed: (yearData) =>
            parseFloat(yearData.mutual_funds || 0) +
            parseFloat(yearData.commingled_funds || 0) +
            parseFloat(yearData.hedge_funds || 0) +
            parseFloat(yearData.private_equity || 0) +
            parseFloat(yearData.common_trust_funds || 0) +
            parseFloat(yearData.common_and_preferred_stocks || 0) +
            parseFloat(yearData.private_debt || 0) +
            parseFloat(yearData.others || 0),
        },
      ],
    },
    {
      label: 'LOAN FUNDS',
      items: [
        { label: 'U.S. Treasuries', key: 'us_treasuries' },
        { label: 'U.S. Agencies', key: 'us_agencies' },
        {
          label: 'Subtotal - Loan Fund',
          key: 'subtotal_loan_fund',
          computed: (yearData) =>
            parseFloat(yearData.us_treasuries || 0) + parseFloat(yearData.us_agencies || 0),
        },
      ],
    },
    {
      label: 'INVESTMENTS TOTAL',
      items: [
        {
          label: 'Investments',
          key: 'investments',
          computed: (yearData) =>
            parseFloat(yearData.subtotal_investment || 0) +
            parseFloat(yearData.subtotal_loan_fund || 0),
        },
      ],
    },
    {
      label: 'CAPITAL ASSETS, NET',
      items: [
        { label: 'Buildings', key: 'buildings' },
        { label: 'Leasehold Improvements', key: 'leasehold_improvements' },
        { label: 'Furniture and Equipment', key: 'furniture_and_equipment' },
        { label: 'Less Accumulated Depreciation', key: 'less_accumulated_depreciation' },
        {
          label: 'Net Fixed Assets',
          key: 'net_fixed_assets',
          computed: (yearData) =>
            parseFloat(yearData.buildings || 0) +
            parseFloat(yearData.leasehold_improvements || 0) +
            parseFloat(yearData.furniture_and_equipment || 0) -
            parseFloat(yearData.less_accumulated_depreciation || 0),
        },
      ],
    },
    {
      label: 'LAND',
      items: [
        { label: 'Land A', key: 'landA' },
        { label: 'Land B', key: 'landB' },
        { label: 'Construction in Progress', key: 'construction_in_progress' },
        {
          label: 'Subtotal - Capital Assets',
          key: 'subtotal_capital_assets',
          computed: (yearData) =>
            parseFloat(yearData.landA || 0) +
            parseFloat(yearData.landB || 0) +
            parseFloat(yearData.construction_in_progress || 0) +
            parseFloat(yearData.net_fixed_assets || 0),
        },
      ],
    },
    {
      label: "LIMITED LIABILITY COMPANY B's ASSETS",
      items: [
        { label: 'Company B Buildings', key: 'companyB_buildings' },
        { label: 'Company B Leasehold Improvements', key: 'companyB_leasehold_improvements' },
        { label: 'Company B Furniture and Equipment', key: 'companyB_furniture_and_equipment' },
        { label: 'Company B Vehicles', key: 'companyB_vehicles' },
        { label: 'Company B Less Accumulated Depreciation', key: 'companyB_less_accumulated_depreciation' },
        {
          label: 'Company B Net Fixed Assets',
          key: 'companyB_net_fixed_assets',
          computed: (yearData) =>
            parseFloat(yearData.companyB_buildings || 0) +
            parseFloat(yearData.companyB_leasehold_improvements || 0) +
            parseFloat(yearData.companyB_furniture_and_equipment || 0) +
            parseFloat(yearData.companyB_vehicles || 0) -
            parseFloat(yearData.companyB_less_accumulated_depreciation || 0),
        },
      ],
    },
    {
      label: 'LIABILITIES',
      items: [
        { label: 'Accounts Payable and Accrued Expenses', key: 'accounts_payable_and_accrued_expenses' },
        { label: 'Due to Funds', key: 'due_to_funds' },
        { label: 'Due to Other Funds', key: 'due_to_other_funds' },
      ],
    },
    {
      label: 'LONG-TERM LIABILITIES - DUE WITHIN ONE YEAR',
      items: [
        { label: 'Accrued Vacation', key: 'accrued_vacation' },
        { label: 'Workers Compensation', key: 'workers_compensation' },
        { label: 'Capital Lease Obligations', key: 'capital_lease_obligations' },
        { label: 'Notes Payable - Building A Acquisition', key: 'notes_payable_buildingA_acquisition' },
        { label: 'Line of Credit - Building A', key: 'line_of_credit_buildingA' },
        {
          label: 'Long Term Liabilities Due Within 1 Year',
          key: 'long_term_liabilities_due_within_1_year',
          computed: (yearData) =>
            parseFloat(yearData.accrued_vacation || 0) +
            parseFloat(yearData.workers_compensation || 0) +
            parseFloat(yearData.capital_lease_obligations || 0) +
            parseFloat(yearData.notes_payable_buildingA_acquisition || 0) +
            parseFloat(yearData.line_of_credit_buildingA || 0),
        },
      ],
    },
    {
      label: 'LONG-TERM LIABILITIES - DUE AFTER ONE YEAR',
      items: [
        { label: 'Accrued Vacation After 1 Year', key: 'accrued_vacation_after_1_year' },
        { label: 'Workers Compensation After 1 Year', key: 'workers_compensation_after_1_year' },
        { label: 'Capital Lease Obligations After 1 Year', key: 'capital_lease_obligations_after_1_year' },
        { label: 'Notes Payable - Building A Acquisition After 1 Year', key: 'notes_payable_buildingA_acquisition_after_1_year' },
        { label: 'Net Pension Liability', key: 'net_pension_liability' },
        { label: 'Line of Credit - Building A After 1 Year', key: 'line_of_credit_buildingA_after_1_year' },
        {
          label: 'Long Term Liabilities Due After 1 Year',
          key: 'long_term_liabilities_due_after_1_year',
          computed: (yearData) =>
            parseFloat(yearData.accrued_vacation_after_1_year || 0) +
            parseFloat(yearData.workers_compensation_after_1_year || 0) +
            parseFloat(yearData.capital_lease_obligations_after_1_year || 0) +
            parseFloat(yearData.notes_payable_buildingA_acquisition_after_1_year || 0) +
            parseFloat(yearData.net_pension_liability || 0) +
            parseFloat(yearData.line_of_credit_buildingA_after_1_year || 0),
        },
      ],
    },
    // Add more sections and items as per your requirements
  ];

  // Handle form submission
  const handleSubmit = () => {
    years.forEach((year) => {
      const yearData = { ...data[year], companyName };
      const docId = balanceSheets.find((sheet) => sheet.year === year)?._id;

      if (docId) {
        AuditedBalanceSheets.collection.update(docId, { $set: yearData }, (error) => {
          if (error) {
            Swal.fire('Error', `Error updating year ${year}: ${error.message}`, 'error');
          }
        });
      } else {
        AuditedBalanceSheets.collection.insert(yearData, (error) => {
          if (error) {
            Swal.fire('Error', `Error inserting year ${year}: ${error.message}`, 'error');
          }
        });
      }
    });
    Swal.fire('Success', 'Data saved successfully', 'success');
  };

  // Check if data is ready
  if (!ready || Object.keys(data).length === 0) {
    return (
      <Container fluid className="py-3">
        <Row className="justify-content-center">
          <Col xs={8} className="text-center">
            <p>Loading...</p>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container fluid className="py-3">
      {/* Company Name Input */}
      <Row className="mb-3">
        <Col xs={12}>
          <input
            type="text"
            placeholder="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            style={{ fontSize: '24px', width: '100%', textAlign: 'center' }}
          />
        </Col>
      </Row>

      {/* Fiscal Sustainability Model Header */}
      <Row className="mb-3">
        <Col xs={12} className="text-center">
          <h3>Fiscal Sustainability Model</h3>
        </Col>
      </Row>

      {/* Fiscal Year Headers */}
      <Row>
        <Col xs={12}>
          <Table bordered size="sm">
            <thead>
            <tr>
              <th style={{ width: '300px' }}></th>
              {years.map((year) => (
                <th key={`actual-${year}`} style={{ textAlign: 'center' }}>
                  Actual
                </th>
              ))}
            </tr>
            <tr>
              <th>Fiscal Year</th>
              {years.map((year) => (
                <th key={year} style={{ textAlign: 'center' }}>
                  YEAR {year}
                </th>
              ))}
            </tr>
            </thead>
            <tbody>
            {sections.map((section) => (
              <React.Fragment key={section.label}>
                {/* Section Label */}
                <tr>
                  <td
                    colSpan={years.length + 1}
                    style={{
                      fontWeight: 'bold',
                      backgroundColor: '#f0f0f0',
                      textAlign: 'left',
                      paddingLeft: '10px',
                    }}
                  >
                    {section.label}
                  </td>
                </tr>
                {/* Items */}
                {section.items.map((item) => (
                  <tr key={item.key}>
                    <td style={{ paddingLeft: '20px' }}>{item.label}</td>
                    {years.map((year) => {
                      const yearData = data[year] || {};
                      return (
                        <td key={year} style={{ textAlign: 'center' }}>
                          {item.computed ? (
                            <input
                              type="number"
                              value={
                                yearData
                                  ? item.computed(yearData)?.toFixed(2) || ''
                                  : ''
                              }
                              readOnly
                              style={{
                                width: '100px',
                                padding: '2px',
                                fontSize: '12px',
                                border: 'none',
                                backgroundColor: '#e9ecef',
                                textAlign: 'right',
                              }}
                            />
                          ) : (
                            <input
                              type="number"
                              value={yearData[item.key]?.toString() || ''}
                              onChange={(e) => {
                                const newValue = e.target.value;
                                setData((prevData) => ({
                                  ...prevData,
                                  [year]: {
                                    ...prevData[year],
                                    [item.key]: newValue,
                                  },
                                }));
                              }}
                              style={{
                                width: '100px',
                                padding: '2px',
                                fontSize: '12px',
                                textAlign: 'right',
                              }}
                            />
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </React.Fragment>
            ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Submit Button */}
      <Row className="mt-4">
        <Col xs={12} className="text-center">
          <Button onClick={handleSubmit} variant="primary">
            Submit
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default AuditedBalanceSheetPage;
