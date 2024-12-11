import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class BudgetPnLCollection {
  constructor() {
    this.name = 'BudgetPnLCollection';
    this.collection = new Mongo.Collection(this.name);

    this.schema = new SimpleSchema({
      year: {
        type: Number,
        label: 'Year',
        min: 2000,
        max: 2030,
      },
      five_percent_investment_portfolio: { type: Number, label: 'Five Percent Investment Portfolio', defaultValue: 0 },
      revenues: { type: Number, label: 'Revenues', defaultValue: 0 },
      general_fund: { type: Number, label: 'General Fund', defaultValue: 0 },
      core_operating_budget_not_authorized: { type: Number, label: 'Core Operating Budget Not Authorized', defaultValue: 0 },
      TotalRevenue: { type: Number, optional: true, label: 'Total Revenue',
        autoValue: function () {
          if (
            this.field('five_percent_investment_portfolio').isSet &&
              this.field('revenues').isSet &&
              this.field('general_fund').isSet &&
              this.field('core_operating_budget_not_authorized').isSet
          ) {
            return this.field('five_percent_investment_portfolio').value +
                this.field('revenues').value +
                this.field('general_fund').value +
                this.field('core_operating_budget_not_authorized').value;
          }
          return null;
        },
      },
      personnel: { type: Number, label: 'Personnel', defaultValue: 0 },
      salary: { type: Number, label: 'Salary', defaultValue: 0 },
      program: { type: Number, label: 'Program', defaultValue: 0 },
      contract: { type: Number, label: 'Contract', defaultValue: 0 },
      grants: { type: Number, label: 'Grants', defaultValue: 0 },
      travel: { type: Number, label: 'Travel', defaultValue: 0 },
      equipment: { type: Number, label: 'Equipment', defaultValue: 0 },
      overhead: { type: Number, label: 'Overhead', defaultValue: 0 },
      debt_service: { type: Number, label: 'Debt Service', defaultValue: 0 },
      other: { type: Number, label: 'Other', defaultValue: 0 },
      totalExpenses: { type: Number, optional: true, label: 'Total Expenses',
        autoValue: function () {
          if (
            this.field('program').isSet &&
              this.field('contract').isSet &&
              this.field('grants').isSet &&
              this.field('travel').isSet &&
              this.field('equipment').isSet &&
              this.field('overhead').isSet &&
              this.field('debt_service').isSet &&
              this.field('other').isSet
          ) {
            return this.field('program').value +
                this.field('contract').value +
                this.field('grants').value +
                this.field('travel').value +
                this.field('equipment').value +
                this.field('overhead').value +
                this.field('debt_service').value +
                this.field('other').value;
          }
          return null;
        },
      },
      management: { type: Number, label: 'Management', defaultValue: 0 },
      support_services: { type: Number, label: 'Support Services', defaultValue: 0 },
      beneficiary_advocacy: { type: Number, label: 'Beneficiary Advocacy', defaultValue: 0 },
      createdAt: { type: Date, label: 'Created At', defaultValue: new Date() },
    });

    this.collection.attachSchema(this.schema);

    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const BudgetPnLs = new BudgetPnLCollection();
