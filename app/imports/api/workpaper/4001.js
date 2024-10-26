import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class RefinancingScenariosCollection {
  constructor() {
    this.name = 'RefinancingScenariosCollection';
    this.collection = new Mongo.Collection(this.name);
    this.schema = new SimpleSchema({
      Description: { type: String, label: 'Description', optional: true },
      year6: {
        type: Object,
        label: 'Year 6',
        blackbox: false,
        optional: true,
      },
      year7: {
        type: Object,
        label: 'Year 7',
        blackbox: false,
        optional: true,
      },
      year8: {
        type: Object,
        label: 'Year 8',
        blackbox: false,
        optional: true,
      },
      year9: {
        type: Object,
        label: 'Year 9',
        blackbox: false,
        optional: true,
      },
      year1: {
        type: Object,
        label: 'Year 1',
        blackbox: false,
        optional: true,
      },
      year2: {
        type: Object,
        label: 'Year 2',
        blackbox: false,
        optional: true,
      },
      year3: {
        type: Object,
        label: 'Year 3',
        blackbox: false,
        optional: true,
      },
      year4: {
        type: Object,
        label: 'Year 4',
        blackbox: false,
        optional: true,
      },
      year5: {
        type: Object,
        label: 'Year 5',
        blackbox: false,
        optional: true,
      },
    });

    // Extend the schema to include fields for each year
    const years = ['year6', 'year7', 'year8', 'year9', 'year1', 'year2', 'year3', 'year4', 'year5'];
    years.forEach(year => {
      this.schema.extend({
        [`${year}.interest`]: { type: Number, optional: true, label: 'Interest' },
        [`${year}.principal`]: { type: Number, optional: true, label: 'Principal' },
        [`${year}.coreOpBudgetProjected`]: { type: Number, optional: true, label: 'Core Op. Budget (Projected)' },
        [`${year}.coreOpBudgetPercent`]: { type: Number, optional: true, label: '% of Core Op Budget' },
      });
    });

    this.collection.attachSchema(this.schema);

    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const RefinancingScenarios = new RefinancingScenariosCollection();
