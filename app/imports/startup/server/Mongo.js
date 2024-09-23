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
    console.log(`  Adding: ${data.petty_cash} (${data.owner})`);
    Cash.collection.insert(data);
    }
    if (Cash.collection.find().count() === 0) {
    if (Meteor.settings.defaultCashData) {
    console.log('Creating default data.');
    Meteor.settings.defaultCashData.forEach(data => addCashData(data));
    }
    }

