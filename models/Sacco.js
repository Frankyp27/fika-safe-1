const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// UNIQUE PROPERTY VALIDATOR
const mongooseUniqueValidator = require('mongoose-unique-validator');

// SCHEMA BLUEPRINTS
const saccoSchema = new Schema({

  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    // required: false
  },
  registration_number: {
    type: String,
    required: true,
    unique: true,
  },
  contacts: {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    telephone_number: {
      type: String,
      required: true,
      unique: true,
    },
  },
  about: {
    description: String,
    website: {
      type: String,
      validate: {
        validator: link => link.indexOf('https://') === 0,
        message: 'Webpage URL must start with https://',
      },
    },

  },
  // ....

});

saccoSchema.plugin(mongooseUniqueValidator);
module.exports = Sacco = mongoose.model('sacco', saccoSchema);