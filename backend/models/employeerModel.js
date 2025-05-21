const mongoose = require("mongoose");

const employeerSchema = new mongoose.Schema({
  employeerName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  accountNumber:{
    type:String,
    require:true,
  },
  balance:{
    type:Number,
    default:100000,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Employeer", employeerSchema);


// onst employerSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   organizationType: String,
//   industry: String,
//   contactEmail: String
// });

// export default mongoose.model('Employer', employerSchema);