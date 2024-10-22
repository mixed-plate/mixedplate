import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The AuditedBalanceSheetCollection. It encapsulates state and variable values for audited balance sheets.
 */
class AuditedBalanceSheetCollection {
  constructor() {
    // The name of this collection.
    this.name = 'AuditedBalanceSheetCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      year: {
        type: Number,
        label: 'Year',
        min: 2000,
        max: 2030,
      },
      petty_cash: { type: Number, label: 'Petty Cash' },
      cash: { type: Number, label: 'Cash' },
      cash_in_banks: { type: Number, label: 'Cash In Banks' },
      cash_total: {
        type: Number,
        optional: true,
        autoValue: function () {
          if (
            this.field('petty_cash').isSet &&
            this.field('cash').isSet &&
            this.field('cash_in_banks').isSet
          ) {
            return (
              this.field('petty_cash').value +
              this.field('cash').value +
              this.field('cash_in_banks').value
            );
          }
          return this.value || undefined; // Ensure consistent return.
        },
      },
      accounts_receivable: { type: Number, label: 'Accounts Receivable' },
      allowance_for_doubtful_accounts: {
        type: Number,
        label: 'Allowance For Doubtful Accounts',
      },
      pledges_receivable: { type: Number, label: 'Pledges Receivable' },
      grants_receivable: { type: Number, label: 'Grants Receivable' },
      prepaid_expenses: { type: Number, label: 'Prepaid Expenses' },
      inventories_for_sale_or_use: {
        type: Number,
        label: 'Inventories For Sale Or Use',
      },
      land_buildings_and_equipment: {
        type: Number,
        label: 'Land Buildings And Equipment',
      },
      investments_publicly_traded_securities: {
        type: Number,
        label: 'Investments Publicly Traded Securities',
      },
      investments_other_securities: {
        type: Number,
        label: 'Investments Other Securities',
      },
      investments_program_related: {
        type: Number,
        label: 'Investments Program Related',
      },
      intangible_assets: { type: Number, label: 'Intangible Assets' },
      other_assets: { type: Number, label: 'Other Assets' },
      accounts_payable_and_accrued_expenses: {
        type: Number,
        label: 'Accounts Payable And Accrued Expenses',
      },
      grants_payable: { type: Number, label: 'Grants Payable' },
      deferred_revenue: { type: Number, label: 'Deferred Revenue' },
      tax_exempt_bond_liabilities: {
        type: Number,
        label: 'Tax Exempt Bond Liabilities',
      },
      escrow_or_custodial_account_liability: {
        type: Number,
        label: 'Escrow Or Custodial Account Liability',
      },
      loans_and_other_payables_to_current_and_former_officers: {
        type: Number,
        label: 'Loans And Other Payables To Current And Former Officers',
      },
      secured_mortgages_and_notes_payable_to_unrelated_third_parties: {
        type: Number,
        label:
          'Secured Mortgages And Notes Payable To Unrelated Third Parties',
      },
      unsecured_notes_and_loans_payable_to_unrelated_third_parties: {
        type: Number,
        label: 'Unsecured Notes And Loans Payable To Unrelated Third Parties',
      },
      other_liabilities: { type: Number, label: 'Other Liabilities' },
      unrestricted_net_assets: { type: Number, label: 'Unrestricted Net Assets' },
      temporarily_restricted_net_assets: {
        type: Number,
        label: 'Temporarily Restricted Net Assets',
      },
      permanently_restricted_net_assets: {
        type: Number,
        label: 'Permanently Restricted Net Assets',
      },
      capital_stock_or_trust_principal: {
        type: Number,
        label: 'Capital Stock Or Trust Principal',
      },
      paid_in_or_capital_surplus: {
        type: Number,
        label: 'Paid In Or Capital Surplus',
      },
      retained_earnings: { type: Number, label: 'Retained Earnings' },
      total_net_assets_or_fund_balances: {
        type: Number,
        label: 'Total Net Assets Or Fund Balances',
      },
      total_liabilities_and_net_assets_fund_balances: {
        type: Number,
        label: 'Total Liabilities And Net Assets Fund Balances',
      },
      unrestricted: { type: Number, label: 'Unrestricted' },
      temporarily_restricted: { type: Number, label: 'Temporarily Restricted' },
      permanently_restricted: { type: Number, label: 'Permanently Restricted' },
      createdAt: {
        type: Date,
        label: 'Created At',
        defaultValue: new Date(),
      },
    });
    // Attach the schema to the collection.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions.
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the AuditedBalanceSheetCollection.
 * @type {AuditedBalanceSheetCollection}
 */
export const AuditedBalanceSheets = new AuditedBalanceSheetCollection();
