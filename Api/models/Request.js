const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    title:{
        type: String,
        required: false,
        unique:false
    },
    desc: {
        type: String,
        required: true
    },
    AssignTo:{
        type: String,
        default:"anyone",
        required: false
    },
    status:{
        type:String,
        default:"Pending",
        required: false
    },
    type:{
        type: String,
        enum:["CMReport","PMReport","PPMReport","regular"]
    }
},{timestamps: true}
);

const Request = mongoose.model("newreport", reportSchema);
module.exports = Request;