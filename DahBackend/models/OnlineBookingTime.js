const mongoose = require('mongoose');

const OnlineBookingTimeTemplate = new mongoose.Schema({

    doc_id: {
        type : String,
        required:true,
    },
    OnlineTime: {
        type: String,
        required:true,
    }
});

const BookingTime = mongoose.model("OnlineBookingTime ", OnlineBookingTimeTemplate)
module.exports = BookingTime ;