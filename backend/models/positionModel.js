const mongoose = require("mongoose");

const positionSchema = new mongoose.Schema({
  positionType: {
    type: String,
    enum:["CEO","COO","CTO","CISO","Director","Dept-Lead","Normal-Employee"],
    default:"Normal-Employee"
  },

});

module.exports = mongoose.model("Position", positionSchema);






// import mongoose from 'mongoose';

// const positionSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   level: { type: String },
//   department: { type: String },
//   baseSalary: { type: Number, required: true }
// });

// export default mongoose.model('Position', positionSchema);