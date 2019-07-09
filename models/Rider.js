const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseUniqueValidator = require('mongoose-unique-validator');

// RIDER SCHEMA
const riderSchema = new Schema({
    name: {
      first_name: {
        type: String,
        required: true,
      },
      sur_name: {
        type: String,
        required: true,
      },
      last_name: {
        type: String,
        required: true,
      },
    },
    telephone_number: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    passport_photo: {
      type: Buffer,
      required: false,
    },
    license_number: {
      type: String,
      required: true,
      unique: true,
    },
    insurance: {
      number: {
        type: String,
        // required: true,
        unique: true,
      },
      issue_date: {
        type: Date,
        // required: false,
        default: Date.now,
      },
      exp_date: {
        type: Date,
        required: false,
        default: Date.now,
      },
    },
    // revisit
    passport_ID: {
      type: String,
      required: true,
      unique: true,
  
    },
    number_plate: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: text => text.indexOf('K') === 0,
        message: 'Invalid number plate',
      },
  
    },
    created: {
      type: Date,
      default: Date.now,
    },
    // react states
    isActive: {
      type: Boolean,
      default: true,
    },
    // TODO challenge on how to implement ratings on the riders
    ratings: [
      {
        numberOfStars: Number,
      },
    ],
    // THIS IS WHERE WE REFERENCE THE RIDER TO THEIR RESPECTIVE SACCOS
    sacco: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Sacco',
    },
  
  });

  riderSchema.plugin(mongooseUniqueValidator);

  module.exports = Rider = mongoose.model('rider', riderSchema);