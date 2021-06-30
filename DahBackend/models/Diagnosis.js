const mongoose = require('mongoose');

const diagnosis = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true
    },
    doctor: {
      type: String,
      required: true,
      trim: true
    },
    date:{
      type: Date,
      default: Date.now
    },
    file_path: {
      type: String,
      required: true
    },
    file_mimetype: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Diagnosis = mongoose.model('Diagnosis', diagnosis);

module.exports = Diagnosis;
