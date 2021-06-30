var mongoose = require("mongoose");
const feedbackrecordTemp = new mongoose.Schema({
    feedback:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    name:{
        type: String,
    },
   
}) 

module.exports = mongoose.model("FeedbackRecord", feedbackrecordTemp);