const Employee = require("../models/employeeModel");
const Allowance = require("../models/allownceModel");
const Employeer = require("../models/employeerModel");
const possion = require("../models/positionModel");
const Employee = require("../models/employeeModel");
const TaxAuthority = require("../models/taxAuthorityModel");





// Get all users
exports.getPayroll = async (req, res) => {
  try {
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

}
}
*/

// 

    const employee = await Employee.find();
    res.json({
      status: "success",
      result: employee.length,
      data: { employee },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};