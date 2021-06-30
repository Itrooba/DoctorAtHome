const mongoose = require('mongoose');

const dispensary = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    days: {
      type: Number,
      required: true,
      trim: true
    },
    date: {
        type: Date,
        default: Date.now,
    },
    address: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    status: {
      type: String,
      required: true,
      default: "Pending",
      trim: true
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

const Dispensary = mongoose.model('Dispensary', dispensary);

module.exports = Dispensary;
