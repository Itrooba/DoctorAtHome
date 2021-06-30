const mongoose = require('mongoose');

const OnlineConsultationSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        roomId: {
            type: String,
            required: true,
        },
        doctor: {
            type: String,
            required: true,
        },
        modifiedWhen:{
            type: Date,
            default: Date.now,
        }
    },
);

const OnlineConsultation = mongoose.model('OnlineConsultation', OnlineConsultationSchema);

module.exports = OnlineConsultation;
