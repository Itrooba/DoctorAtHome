const mongoose = require('mongoose');
const validator = require('validator');
const AppointmentTemplate = new mongoose.Schema({

    doc_id:{
        type : String,
        required:true
    },
    AppDate:{
    type:String,
    required:true
    },
    Time:{
        type:String,
        required:true
    },
    Service:{
     type:String,
     required:true
    },
    ClinicFee:{
        type:String,
        required:true
       },
    Status: {
        type: String,
        default: "Pending"
    },
    Name: {
        type: String,
        index: true,
        required:true
    },
    Email: {
        type: String,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid")
            }
        }
    },   
    mobile_no: {
        type: Number,
        required: true
    }
            
});

const Appointment = mongoose.model("Appointment", AppointmentTemplate)
module.exports =Appointment;