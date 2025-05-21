const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  employeeName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  gender: {
    type:String,
     eunm:['Male','Female'],
    required: true,
    default:'Male',    
  },
  empType: {
    type: String,
     eunm:['Full-time','Part-time'],
     default:'Full-time',
    required: true,
  },
 workingDay: {
    type: Number,
    required: true,
    
  },
 AllowanceId: {
    type:mongoose.Schema.Types.ObjectId,ref:"Allowance",
    required: true,
  },
  
  positionId: {
    type:mongoose.Schema.Types.ObjectId,ref:"Position",
    required: true,
  },
  empDate: {
    type:Date,
    required: true,
  },
  basicSalary:{
    type:Number,
    require:true,
  },
  accountNumber:{
    type:String,
    require:true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Employee", employeeSchema);



// const employeeSchema = new mongoose.Schema({
//   fullName: { type: String, required: true },
//   email: { type: String, unique: true },
//   phone: String,
//   address: String,
//   hireDate: { type: Date, default: Date.now },
//   position: { type: mongoose.Schema.Types.ObjectId, ref: 'Position' },
//   employer: { type: mongoose.Schema.Types.ObjectId, ref: 'Employer' },
//   allowances: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Allowance' }],
//   deductions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Deduction' }]
// });

// export default mongoose.model('Employee', employeeSchema);