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
      petty_cash: { type: Number, label: 'Petty Cash', defaultValue: 0 },
      cash: { type: Number, label: 'Cash', defaultValue: 0 },
      accounts_receivable: { type: Number, label: 'Accounts Receivable', defaultValue: 0 },
      allowance_for_doubtful_accounts: { type: Number, label: 'Allowance For Doubtful Accounts', defaultValue: 0 },
      pledges_receivable: { type: Number, label: 'Pledges Receivable', defaultValue: 0 },
      grants_receivable: { type: Number, label: 'Grants Receivable', defaultValue: 0 },
      prepaid_expenses: { type: Number, label: 'Prepaid Expenses', defaultValue: 0 },
      inventories_for_sale_or_use: { type: Number, label: 'Inventories For Sale Or Use', defaultValue: 0 },
      land_buildings_and_equipment: { type: Number, label: 'Land Buildings And Equipment', defaultValue: 0 },
      investments_publicly_traded_securities: { type: Number, label: 'Investments Publicly Traded Securities', defaultValue: 0 },
      investments_other_securities: { type: Number, label: 'Investments Other Securities', defaultValue: 0 },
      investments_program_related: { type: Number, label: 'Investments Program Related', defaultValue: 0 },
      intangible_assets: { type: Number, label: 'Intangible Assets', defaultValue: 0 },
      other_assets: { type: Number, label: 'Other Assets', defaultValue: 0 },
      accounts_payable_and_accrued_expenses: { type: Number, label: 'Accounts Payable And Accrued Expenses', defaultValue: 0 },
      grants_payable: { type: Number, label: 'Grants Payable', defaultValue: 0 },
      deferred_revenue: { type: Number, label: 'Deferred Revenue', defaultValue: 0 },
      tax_exempt_bond_liabilities: { type: Number, label: 'Tax Exempt Bond Liabilities', defaultValue: 0 },
      escrow_or_custodial_account_liability: { type: Number, label: 'Escrow Or Custodial Account Liability', defaultValue: 0 },
      loans_and_other_payables_to_current_and_former_officers: { type: Number, label: 'Loans And Other Payables To Current And Former Officers', defaultValue: 0 },
      secured_mortgages_and_notes_payable_to_unrelated_third_parties: { type: Number, label: 'Secured Mortgages And Notes Payable To Unrelated Third Parties', defaultValue: 0 },
      unsecured_notes_and_loans_payable_to_unrelated_third_parties: { type: Number, label: 'Unsecured Notes And Loans Payable To Unrelated Third Parties', defaultValue: 0 },
      other_liabilities: { type: Number, label: 'Other Liabilities', defaultValue: 0 },
      unrestricted_net_assets: { type: Number, label: 'Unrestricted Net Assets', defaultValue: 0 },
      temporarily_restricted_net_assets: { type: Number, label: 'Temporarily Restricted Net Assets', defaultValue: 0 },
      permanently_restricted_net_assets: { type: Number, label: 'Permanently Restricted Net Assets', defaultValue: 0 },
      capital_stock_or_trust_principal: { type: Number, label: 'Capital Stock Or Trust Principal', defaultValue: 0 },
      paid_in_or_capital_surplus: { type: Number, label: 'Paid In Or Capital Surplus', defaultValue: 0 },
      retained_earnings: { type: Number, label: 'Retained Earnings', defaultValue: 0 },
      total_net_assets_or_fund_balances: { type: Number, label: 'Total Net Assets Or Fund Balances', defaultValue: 0 },
      total_liabilities_and_net_assets_fund_balances: { type: Number, label: 'Total Liabilities And Net Assets Fund Balances', defaultValue: 0 },
      unrestricted: { type: Number, label: 'Unrestricted', defaultValue: 0 },
      temporarily_restricted: { type: Number, label: 'Temporarily Restricted', defaultValue: 0 },
      permanently_restricted: { type: Number, label: 'Permanently Restricted', defaultValue: 0 },
      createdAt: { type: Date, label: 'Created At', defaultValue: new Date() },
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the AuditedBalanceSheetCollection.
 * @type {AuditedBalanceSheetCollection}
 */
export const AuditedBalanceSheets = new AuditedBalanceSheetCollection();
