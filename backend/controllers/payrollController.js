// const Employee = require("../models/employeeModel");
// const Allowance = require("../models/allownceModel");
// const Employeer = require("../models/employeerModel");
// const possion = require("../models/positionModel");
// const Employee = require("../models/employeeModel");
// const TaxAuthority = require("../models/taxAuthorityModel");





// // Get all users
// exports.getPayroll = async (req, res) => {
//   try {
//     const employee = await Employee.find().populate('Allowance').populate('Position').
    
    
    // the following are the sammrys from tables
    // No.
// Employee Name(from employee table)
// employment date(from employee table)
// Basic salary(from the employee)
// w/days(from the employee)
// earnned salary= basic salary-(abcent*(basic salary/30);
// possition allowance(employee-->position table)==
/*
if(empPosition=CEO){
PositionComision=10% of basic salary
}
else{
if(basicSaalary<600){
postionComision=basicSalary
}
else if(basicSalary>601 && basicSalary<1650){
position commition=(basicSalary*10/100)-60
}
else if (basicSalary>1651 && basicSalary<3200){
position comition = (basicSalary*15/100)-142.5
}
else if(basicSalary>3201 && basicSalary<5250){
positionCommission=(basicSalary*20/100)-302.5
}
else if (basic salary>5251 && basicSalary<7800){
postionCommition=(basicSalary*25/100)-565
}
else if(basicSalary>7801 && basicSalary<10900){
positionComition=(basicSalary*30/100)-955
}
else {
positionCommition=(basicSalary*35/100)-1500
}
*/

// 
    
    
//     res.json({
//       status: "success",
//       result: employee.length,
//       data: { employee },
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

















const Employee = require("../models/employeeModel");
const Allowance = require("../models/allownceModel");
const Employer = require("../models/employeerModel");
const Position = require("../models/positionModel");
const TaxAuthority = require("../models/taxAuthority");

exports.getPayroll = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate({
      path: 'Allowance',
      select:'possionAllowance transportAllowance otherCommission',strictPopulate:false
    })
      .populate("Position");
allowance
    const payrollData = employees.map((emp, index) => {
      const basicSalary = emp.basicSalary;
      const absentDays = emp.absentDays || 0;
      const workingDays = emp.workingDays || 30;
      const employmentDate = emp.employmentDate;
      const position = emp.position?.name || "Unknown";

      // Earned Salary
      const earnedSalary = basicSalary - (absentDays * (basicSalary / 30));

      // Position Allowance Logic
      let positionCommission = 0;
      if (position.toLowerCase() === "ceo") {
        positionCommission = 0.10 * basicSalary;
      } else {
        if (basicSalary < 600) {
          positionCommission = basicSalary;
        } else if (basicSalary >= 601 && basicSalary <= 1650) {
          positionCommission = (basicSalary * 0.10) - 60;
        } else if (basicSalary >= 1651 && basicSalary <= 3200) {
          positionCommission = (basicSalary * 0.15) - 142.5;
        } else if (basicSalary >= 3201 && basicSalary <= 5250) {
          positionCommission = (basicSalary * 0.20) - 302.5;
        } else if (basicSalary >= 5251 && basicSalary <= 7800) {
          positionCommission = (basicSalary * 0.25) - 565;
        } else if (basicSalary >= 7801 && basicSalary <= 10900) {
          positionCommission = (basicSalary * 0.30) - 955;
        } else {
          positionCommission = (basicSalary * 0.35) - 1500;
        }
      }

      return {
        No: index + 1,
        employeeName: emp.name,
        employmentDate,
        basicSalary: basicSalary.toFixed(2),
        workingDays,
        absentDays,
        earnedSalary: earnedSalary.toFixed(2),
        position,
        positionAllowance: positionCommission.toFixed(2),
      };
    });

    res.status(200).json({
      status: "success",
      result: payrollData.length,
      data: payrollData,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};