import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { array } from 'prop-types';

/**
 * The AuditedBalanceSheetCollection. It encapsulates state and variable values for audited balance sheets.
 */
class AuditedBalanceSheetCollection {
  constructor() {
    // The name of this collection.
    this.name = 'AuditedBalanceSheetColl';
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
          petty_cash: { type: Number },
          cash: { type: Number},
          cash_in_banks: { type: Number },
          cash_total: {
            type: Number,
            optional: true,
            autoValue: function () {
              if (this.field('petty_cash').isSet && this.field('cash').isSet && this.field('cash_in_banks').isSet) {
                return this.field('petty_cash').value + this.field('cash').value + this.field('cash_in_banks').value;
              }
            }
          }
        });
      }
    }
