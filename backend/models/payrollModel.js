
const mongoose = require("mongoose");

const PayrollSchema = new mongoose.Schema({
    possionAllowance: { type: Number, required: true },
    transportAllowance: { type: Number, required: true },
    otherCommission: { type: Number, required: true },
    
  });


module.exports = mongoose.model("Payroll", PayrollSchema);


