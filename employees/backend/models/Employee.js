const mongoose = require('mongoose');
const { Schema } = mongoose;

const EmployeeSchema = new Schema({
    
    id:{
        type:String,
        required:true
    },
    employee_name:{
        type: String,
        required: true
    },
    employee_salaryinMonth:{
        type: String,
        required: true, 
    },
  });

  module.exports = mongoose.model('Employee', EmployeeSchema);