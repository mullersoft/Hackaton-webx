const mongoose = require("mongoose");

const taxAuthoritySchema = new mongoose.Schema({
  Name: {
    type: String,
    required:true
  },
  bankAccount:{
    type:String,
    required:true,
  },
  balance:{
    type:Number,
    required:true,
    default:0,
  },
   employeerId: {
    type:mongoose.Schema.Types.ObjectId,ref:"Employeer",
    required: true,
  },
   employeeId: {
    type:mongoose.Schema.Types.ObjectId,ref:"Employee",
    required: true,
  },

});

module.exports = mongoose.model("TaxAuthority", taxAuthoritySchema);











// onst taxAuthoritySchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   taxRate: { type: Number, required: true }, // e.g., 0.15 for 15%
//   region: String
// });

// export default mongoose.model('TaxAuthority', taxAuthoritySchema);


