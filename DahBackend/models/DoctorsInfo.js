const mongoose = require('mongoose');
const DoctorsInfoTemplate = new mongoose.Schema({

    Name: {
        type: String,
        index: true,
        unique: true,
    },
    Speciality: {
        type: String,
        required:true,
       // unique:true,
    },   
    ClinicFee: {
        type: Number,
        default: 0,
    },
    OnlineFee: {
        type: Number,
        default: 0,
    },
    SetOnline: {
        type: Number,
        default: 0,
    },
    modifiedWhen:{
        type: Date,
        default: Date.now,
    },
});

const DoctorsInfo = mongoose.model("DoctorsInfo", DoctorsInfoTemplate)
module.exports = DoctorsInfo;