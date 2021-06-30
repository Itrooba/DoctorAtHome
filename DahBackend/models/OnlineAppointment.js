const mongoose = require('mongoose');
const validator = require('validator');
const OnlineAppointmentTemplate = new mongoose.Schema({
    doc_id:{
        type : String,
        required:true
    },
    AppDate:{
    type:String,
    },
    OnlineTime:{
        type:String,
    },
    Service:{
     type:String,
    },
    OnlineFee:{
        type:String,
       },
     Name: {
        type: String,
        index: true
    },
    Status: {
        type: String,
        default: "Pending"
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
    },
    Accountant_Name: {
        type: String,
        required: true,
    },
    Transaction_id: {
        type: Number,
        required: true,
    },
            
});

const Appointment = mongoose.model("OnlineAppointment", OnlineAppointmentTemplate)
module.exports =Appointment;