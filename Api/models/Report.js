const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Report schema
const reportSchema = new Schema({
    Engineer: {
        type: String,
        required: true
    },
    FacilityName:{
        type: String,
        required: false,
        unique:false
    },
    EquipmentName: {
        type: String,
        required: true
    },
    SerialNumber:{
        type: String,
        default:"anyone"
    },
    modelNumber:{
        type: String,
        default:"anyone"
    },
    status:{
        type:String,
        default:"Pending"
    },
    ProblemDesc:{
       type:String,
    },
    WorkDone:{
        type:String,
    },
    FurtherWorks:{
      type:String,
      default:"false"
    },
    FurtherWorkDesc:{
        type:String,
    },
    type:{
        type: String,
        enum:["CMReport","PMReport","PPMReport","regular"]
    },
    requestId:{
        type: String,
        required: true
    },
    sent:{
        type: Boolean,
        default: false
    },
    sendTo:{
        type: String,
        default: "admin"
    }
    
},{timestamps: true}
);

// Create the Report model
const Report = mongoose.model('realreports', reportSchema);

module.exports = Report;
