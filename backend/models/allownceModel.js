const mongoose = require("mongoose");

const allowanceSchema = new mongoose.Schema({
    possionAllowance: { type: Number, required: true,default:5000 },
    transportAllowance: { type: Number, required: true,default:2200 },
    otherCommission: { type: Number, required: true,default:600 },

  });


module.exports = mongoose.model("Allowance", allowanceSchema);



// const allowanceSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   amount: { type: Number, required: true },
//   isTaxable: { type: Boolean, default: false }
// });

// export default mongoose.model('Allowance', allowanceSchema);




// function getWorkingDays(startDate, endDate) {
//   let count = 0;
//   const curDate = new Date(startDate);

//   while (curDate <= endDate) {
//     const day = curDate.getDay();
//     if (day !== 0 && day !== 6) { // 0 = Sunday, 6 = Saturday
//       count++;
//     }
//     curDate.setDate(curDate.getDate() + 1);
//   }

//   return count;
// }
// const start = new Date("2025-05-01");
// const end = new Date("2025-05-31");
// console.log("Working Days:", getWorkingDays(start, end)); // Excludes weekends