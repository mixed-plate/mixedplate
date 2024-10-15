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
      five_percent_investment_portfolio: { type: Number, label: 'Five Percent Investment Portfolio'},
      revenues: { type: Number, label: 'Revenues' },
      general_fund: { type: Number, label: 'General Fund'},
      core_operating_budget_not_authorized: { type: Number, label: 'Core Operating Budget Not Authorized' },
      personnel: { type: Number, label: 'Personnel'},
      salary: { type: Number, label: 'Salary'},
      program: { type: Number, label: 'Program'},
      contract: { type: Number, label: 'Contract'},
      grants: { type: Number, label: 'Grants'},
      travel: { type: Number, label: 'Travel'},
      equipment: { type: Number, label: 'Equipment'},
      overhead: { type: Number, label: 'Overhead' },
      debt_service: { type: Number, label: 'Debt Service'},
      other: { type: Number, label: 'Other'},
      management: { type: Number, label: 'Management'},
      support_services: { type: Number, label: 'Support Services'},
      beneficiary_advocacy: { type: Number, label: 'Beneficiary Advocacy'},
      createdAt: { type: Date, label: 'Created At', defaultValue: new Date() },
    });

    this.collection.attachSchema(this.schema);

    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const BudgetPnLs = new BudgetPnLCollection();
