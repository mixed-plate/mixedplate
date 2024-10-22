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
      cash_in_banks: { type: Number, label: 'Cash In Banks', optional: true },
      cash_total: {
        type: Number,
        optional: true,
        autoValue: function () {
          if (this.field('petty_cash').isSet && this.field('cash').isSet && this.field('cash_in_banks').isSet) {
            return this.field('petty_cash').value + this.field('cash').value + this.field('cash_in_banks').value;
          }
        }
      },
      accounts_receivable: { type: Number, label: 'Accounts Receivable'},
      due_from_other_funds: { type: Number, label: 'Due From Other Funds' },
      interest_and_dividends_receivable: { type: Number, label: 'Interest And Dividends Receivable' },
      inventory_prepaid_items_and_other_assets: { type: Number, label: 'Inventory Prepaid Items And Other Assets' },
      notes_receivable_due_within_1_year: { type: Number, label: 'Notes Receivable Due Within 1 Year' },
      notes_receivable_due_after_1_year: { type: Number, label: 'Notes Receivable Due After 1 Year' },
      security_deposits: { type: Number, label: 'Security Deposits' },
      cash_held_by_investment_managers: { type: Number, label: 'Cash Held By Investment Managers' },
      mutual_funds: { type: Number, label: 'Mutual Funds' },
      commingled_funds: { type: Number, label: 'Commingled Funds' },
      hedge_funds: { type: Number, label: 'Hedge Funds' },
      private_equity: { type: Number, label: 'Private Equity' },
      common_trust_funds: { type: Number, label: 'Common Trust Funds' },
      common_and_preferred_stocks: { type: Number, label: 'Common And Preferred Stocks' },
      private_debt: { type: Number, label: 'Private Debt' },
      others: { type: Number, label: 'Others' },
// subtotal investment only take in account 8 values check spread sheet
      subtotal_investment: { type: Number, label: 'Subtotal Investment',
        optional: true,
        autoValue: function () {
          if (this.field('mutual_funds').isSet && this.field('commingled_funds').isSet && this.field('hedge_funds').isSet && this.field('private_equity').isSet
              && this.field('common_trust_funds').isSet && this.field('common_and_preferred_stocks').isSet && this.field('private_debt').isSet && this.field('others')) {
            return this.field('mutual_funds').value + this.field('commingled_funds').value + this.field('hedge_funds').value + this.field('private_equity').value +
                this.field('common_trust_funds').value + this.field('common_and_preferred_stocks').value + this.field('private_debt').value + this.field('others').value;}
        },
      },
      us_treasuries: { type: Number, label: 'US Treasuries' },
      us_agencies: { type: Number, label: 'US Agencies' },
      subtotal_loan_fund: { type: Number, label: 'Subtotal Loan Fund',
        optional: true,
        autoValue: function () {
          if (this.field('us_treasuries').isSet && this.field('us_agencies').isSet) {
            return this.field('us_treasuries').value + this.field('us_agencies').value;
          }
        },
      },
      investments: {
        type: Number,
        label: 'Investments',
        optional: true,
        autoValue: function () {
          // Ensure both 'subtotal_investment' and 'subtotal_loan_fund' are set before calculating
          if (this.field('subtotal_investment').isSet && this.field('subtotal_loan_fund').isSet) {
            return this.field('subtotal_investment').value + this.field('subtotal_loan_fund').value;
          }
        }
      },
      buildings: { type: Number, label: 'Buildings' },
      leasehold_improvements: { type: Number, label: 'Leasehold Improvements' },
      furniture_and_equipment: { type: Number, label: 'Furniture And Equipment' },
      less_accumulated_depreciation: { type: Number, label: 'Less Accumulated Depreciation' },
      // double check on this formula and make sure is doing the correct math operation.
      net_fixed_assets: {
        type: Number,
        label: 'Net Fixed Assets',
        optional: true,
        autoValue: function () {
          if (this.field('buildings').isSet && this.field('leasehold_improvements').isSet && this.field('furniture_and_equipment').isSet && this.field('less_accumulated_depreciation').isSet) {
            return this.field('buildings').value + this.field('leasehold_improvements').value + this.field('furniture_and_equipment').value - this.field('less_accumulated_depreciation').value;
          }
        }
      },
      landA: { type: Number, label: 'LandA' },
      landB: { type: Number, label: 'LandB' },
      construction_in_progress: { type: Number, label: 'Construction In Progress' },
      subtotal_capital_assets: { type: Number, label: 'Subtotal Capital Assets',
        optional: true,
        autoValue: function () {
          if (this.field('landA').isSet && this.field('landB').isSet && this.field('construction_in_progress').isSet) {
            return this.field('landA').value + this.field('landB').value + this.field('construction_in_progress').value;
          }
        }
      },
      companyB_buildings: { type: Number, label: 'Company B Buildings' },
      companyB_leasehold_improvements: { type: Number, label: 'Company B Leasehold Improvements' },
      companyB_furniture_and_equipment: { type: Number, label: 'Company B Furniture And Equipment' },
      companyB_vehicles: { type: Number, label: 'Company B Vehicles' },
      companyB_less_accumulated_depreciation: { type: Number, label: 'Company B Less Accumulated Depreciation' },
      companyB_net_fixed_assets: {type: Number, label: 'Company B Net Fixed Assets',
        optional: true,
        autoValue: function () {
          if (this.field('companyB_buildings').isSet && this.field('companyB_leasehold_improvements').isSet && this.field('companyB_furniture_and_equipment').isSet && this.field('companyB_vehicles').isSet && this.field('companyB_less_accumulated_depreciation').isSet) {
            return this.field('companyB_buildings').value + this.field('companyB_leasehold_improvements').value + this.field('companyB_furniture_and_equipment').value + this.field('companyB_vehicles').value - this.field('companyB_less_accumulated_depreciation').value;
          }
        }
      },
      land: { type: Number, label: 'Land', optional: true },
      subtotal_limited_liability_companyB_assets: { type: Number, label: 'Subtotal Limited Liability Company B Assets',
        optional: true,
        autoValue: function () {
          if (this.field('land').isSet && this.field('companyB_net_fixed_assets').isSet) {
            return this.field('land').value + this.field('companyB_net_fixed_assets').value;
          }
        }
      },
      capital_assets_net: { type: Number, label: 'Capital Assets Net',
        optional: true,
        autoValue: function () {
          if (this.field('net_fixed_assets').isSet && this.field('subtotal_capital_assets').isSet && this.field('subtotal_limited_liability_companyB_assets').isSet) {
            return this.field('net_fixed_assets').value + this.field('subtotal_capital_assets').value + this.field('subtotal_limited_liability_companyB_assets').value;
          }
        }
      },
      restricted_cash: { type: Number, label: 'Restricted Cash' },
      total_other_assets: { type: Number, label: 'Total Other Assets',
        optional: true,
        autoValue: function () {
          if(this.field('accounts_receivable').isSet && this.field('due_from_other_funds').isSet && this.field('interest_and_dividends_receivable').isSet &&
              this.field('inventory_prepaid_items_and_other_assets').isSet && this.field('notes_receivable_due_within_1_year').isSet
              && this.field('notes_receivable_due_after_1_year').isSet && this.field('security_deposits').isSet && this.field('cash_held_by_investment_managers').isSet
              && this.field('investments').isSet && this.field('capital_assets_net').isSet && this.field('restricted_cash').isSet &&
              this.field('investments').isSet && this.field('capital_assets_net').isSet && this.field('restricted_cash').isSet) {
            return this.field('accounts_receivable').value + this.field('due_from_other_funds').value + this.field('interest_and_dividends_receivable').value +
                this.field('inventory_prepaid_items_and_other_assets').value + this.field('notes_receivable_due_within_1_year').value +
                this.field('notes_receivable_due_after_1_year').value + this.field('security_deposits').value + this.field('cash_held_by_investment_managers').value +
                this.field('investments').value + this.field('capital_assets_net').value + this.field('restricted_cash').value;
          }
        }
      },
      deferred_outflows_of_resources_related_to_pension: { type: Number, label: 'Deferred Outflows Of Resources related to pensions' },
      deferred_outflows_of_resources_related_to_ompeb: { type: Number, label: 'Deferred Outflows Of Resources related to OMPEB' },
      total_assets_and_deferred_outflows_of_resources: { type: Number, label: 'Total Assets And Deferred Outflows Of Resources',
        optional: true,
        autoValue: function () {
          if (this.field('total_other_assets').isSet && this.field('deferred_outflows_of_resources_related_to_pension').isSet && this.field('deferred_outflows_of_resources_related_to_ompeb').isSet && this.field('cash_total').isSet) {
            return this.field('total_other_assets').value + this.field('deferred_outflows_of_resources_related_to_pension').value + this.field('deferred_outflows_of_resources_related_to_ompeb').value + this.field('cash_total').value;
          }
        }
      },
      land_buildings_and_equipment: { type: Number, label: 'Land Buildings And Equipment' },
      investments_publicly_traded_securities: { type: Number, label: 'Investments Publicly Traded Securities' },
      investments_other_securities: { type: Number, label: 'Investments Other Securities' },
      investments_program_related: { type: Number, label: 'Investments Program Related' },
      intangible_assets: { type: Number, label: 'Intangible Assets' },
      other_assets: { type: Number, label: 'Other Assets'},

      due_to_funds: { type: Number, label: 'Due To Funds' },
      due_to_other_funds: { type: Number, label: 'Due To Other Funds' },
      accrued_vacation: { type: Number, label: 'Accrued Vacation' },
      workers_compensation: { type: Number, label: 'Workers Compensation' },
      capital_lease_obligations: { type: Number, label: 'Capital Lease Obligations' },
      notes_payable_buildingA_acquisition: { type: Number, label: 'Notes Payable Building A Acquisition' },
      line_of_credit_buildingA: { type: Number, label: 'Line Of Credit Building A' },
      long_term_liabilities_due_within_1_year: { type: Number, label: 'Long Term Liabilities Due Within 1 Year',
      optional: true,
        autoValue: function () {
        if (this.field('accrued_vacation').isSet && this.field('workers_compensation').isSet && this.field('capital_lease_obligations').isSet &&
            this.field('notes_payable_buildingA_acquisition').isSet && this.field('line_of_credit_buildingA').isSet) {
          return this.field('accrued_vacation').value + this.field('workers_compensation').value + this.field('capital_lease_obligations').value +
              this.field('notes_payable_buildingA_acquisition').value + this.field('line_of_credit_buildingA').value;
        }

        }
      },
      accrued_vacation_after_1_year: { type: Number, label: 'Accrued Vacation After 1 Year' },
      workers_compensation_after_1_year: { type: Number, label: 'Workers Compensation After 1 Year' },
      capital_lease_obligations_after_1_year: { type: Number, label: 'Capital Lease Obligations After 1 Year' },
      notes_payable_buildingA_acquisition_after_1_year: { type: Number, label: 'Notes Payable Building A Acquisition After 1 Year' },
      net_pension_liability: { type: Number, label: 'Net Pension Liability' },
      line_of_credit_buildingA_after_1_year: { type: Number, label: 'Line Of Credit Building A After 1 Year' },
      long_term_liabilities_due_after_1_year: { type: Number, label: 'Long Term Liabilities Due After 1 Year',
        optional: true,
        autoValue: function () {
          if (this.field('accrued_vacation_after_1_year').isSet && this.field('workers_compensation_after_1_year').isSet && this.field('capital_lease_obligations_after_1_year').isSet &&
              this.field('notes_payable_buildingA_acquisition_after_1_year').isSet && this.field('net_pension_liability').isSet && this.field('line_of_credit_buildingA_after_1_year').isSet) {
            return this.field('accrued_vacation_after_1_year').value + this.field('workers_compensation_after_1_year').value + this.field('capital_lease_obligations_after_1_year').value +
                this.field('notes_payable_buildingA_acquisition_after_1_year').value + this.field('net_pension_liability').value + this.field('line_of_credit_buildingA_after_1_year').value;
          }
        }
      },

      accounts_payable_and_accrued_expenses: { type: Number, label: 'Accounts Payable And Accrued Expenses'},


      total_net_assets_or_fund_balances: { type: Number, label: 'Total Net Assets Or Fund Balances'},

      unrestricted: { type: Number, label: 'Unrestricted'},
      temporarily_restricted: { type: Number, label: 'Temporarily Restricted'},
      permanently_restricted: { type: Number, label: 'Permanently Restricted'},
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