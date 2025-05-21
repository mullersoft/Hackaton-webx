// const Position = require("../models/positionModel");
// const Allowance = require("../models/allowanceModel");

// exports.createEmployee = async (req, res) => {
//   try {
//     const {
//       employeeName,
//       gender,
//       empType,
//       positionId,
//       AllowanceId,
//       empDate,
//       basicSalary,
//       accountNumber,
//     } = req.body;

//     // Fetch related Position and Allowance
//     const position = await Position.findById(positionId);
//     const allowance = await Allowance.findById(AllowanceId);

//     if (!position || !allowance) {
//       return res.status(400).json({ message: "Invalid position or allowance" });
//     }
// if(position.)
//     if(allowance.possionAllowance){

//     }
//     // Calculate gross salary
//     const grossSalary = (basicSalary || position.baseSalary) + allowance.amount;

//     const newEmployee = new Employee({
//       employeeName,
//       gender,
//       empType,
//       positionId,
//       AllowanceId,
//       empDate,
//       basicSalary: basicSalary || position.baseSalary,
//       grossSalary,
//       accountNumber,
//     });

//     await newEmployee.save();
//     res.status(201).json({ status: "success", data: { newEmployee } });

//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };
