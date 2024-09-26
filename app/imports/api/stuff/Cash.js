import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The CashCollection. It encapsulates state and variable values for stuff.
 */
class CashCollection {
  constructor() {
    // The name of this collection.
    this.name = 'CashCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      petty_cash: Number,
      cash: Number,
      cash_in_banks_draw_on_line_credit: Number,
      year: {
        type: Number,
        allowedValues: Array.from({length: 21}, (v, k) => k + 2010), // years from 2010 to 2030
      },
      owner: String,
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the StuffsCollection.
 * @type {CashCollection}
 */
export const Cash = new CashCollection();
