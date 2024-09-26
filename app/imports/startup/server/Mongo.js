    import { Meteor } from 'meteor/meteor';
    import { Stuffs } from '../../api/stuff/Stuff.js';
    import { Cash } from '../../api/stuff/Cash.js';

    /* eslint-disable no-console */

    // Initialize the database with a default data document.
    const addData = (data) => {
    console.log(`  Adding: ${data.name} (${data.owner})`);
    Stuffs.collection.insert(data);
    };

    // Initialize the StuffsCollection if empty.
    if (Stuffs.collection.find().count() === 0) {
    if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.forEach(data => addData(data));
    }
    }
    const addCashData = (data) => {
      const existingRecord = Cash.collection.findOne({ year: data });
      if (existingRecord) {
        console.log(`  Found existing data for update ${data.year}. Skipping.`);
        Cash.collection.update(existingRecord._id, {
          $set: {
            petty_cash: data.petty_cash,
            cash: data.cash,
            cash_in_banks_draw_on_line_credit: data.cash_in_banks_draw_on_line_credit,
          }
        });
      } else {
        // If no entry exists for this year, insert new data
        console.log(`  Adding: ${data.year}`);
        Cash.collection.insert(data);
      }
      if (Cash.collection.find().count() === 0) {
        if (Meteor.settings.defaultCashData) {
          console.log('Creating default data.');
          Meteor.settings.defaultCashData.forEach(data => addCashData(data));
        }
      }
    }

