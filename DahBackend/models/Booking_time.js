const mongoose = require('mongoose');

const BookingTimeTemplate = new mongoose.Schema({

    doc_id: {
        type : String,
        required:true,
    },
    Time: {
        type: String,
        required:true,
    }
});

const BookingTime = mongoose.model("BookingTime ", BookingTimeTemplate)
module.exports = BookingTime ;