var mongoose = require("mongoose");
const validator=require("validator")
const complainrecordTemp = new mongoose.Schema({
    
    complain:{
        type: String,
        required: true
    },

    date:{
        type: Date,
        default: Date.now
    },
    email:{
        type: String,
        required: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid")
                
            }
        }
    },
   
}) 

module.exports = mongoose.model("ComplainRecord", complainrecordTemp);