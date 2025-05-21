const Employee = require("../models/employeeModel");
const Allowance = require("../models/allownceModel");
const Employer = require("../models/employeerModel");
const Position = require("../models/positionModel");
const TaxAuthority = require("../models/taxAuthority");

exports.getPayroll = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate(
       {
      path: 'AllowanceId',
      select:'possionAllowance transportAllowance otherCommission',strictPopulate:false
    }
  )
      .populate({path:"positionId",
        select:'positionType',
        strictPopulate:false
      });
    const payrollData = employees.map((emp, index) => {
      const employeeName = emp.employeeName;
      const empDate = emp.empDate;
      let basicSalary = emp.basicSalary;
      let absentDays = emp.absentDays || 0;
      const workingDays = emp.workingDays || 30;
      let position = emp.positionId?.positionType;
      let allowance = emp.AllowanceId?.transportAllowance;
      let otherAllowance=emp.AllowanceId?.otherCommission;
      
      console.log(otherAllowance);
      

if(workingDays<=30 && workingDays>=1 ){
  if(workingDays!=30)
{
   absentDays=  30-workingDays;

}
else {
console.log(" date should be 1-30");
}
}
      // Earned Salary
      const earnedSalary = basicSalary - (absentDays * (basicSalary / 30));

      // Position Allowance Logic
      let positionCommission = 0;
      let transportCommission = 0;
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
      let extraTransportAllowance = 0;
      let unTaxableExtraTransport=0;
      // const currentTransportAllowance = allowance
      if(position!="Normal-Employee"){
        if(allowance>=2220){
          unTaxableExtraTransport = allowance-2220;
          if(basicSalary>600 && basicSalary<=1650){
            extraTransportAllowance=(unTaxableExtraTransport*0.1)-60;
            transportCommission = extraTransportAllowance + 2220;
          }
           else if (basicSalary>1651 && basicSalary<=3200){
            extraTransportAllowance=(extraTunTaxableExtraTransportransportAllowance*0.15)-142.5;
            transportCommission = extraTransportAllowance + 2220;
          }
          else if (basicSalary>3201 && basicSalary<=5250){
            extraTransportAllowance=(unTaxableExtraTransport*0.2)-302.5;
            transportCommission = extraTransportAllowance + 2220;
          }
         else if (basicSalary>5251 && basicSalary<=7800){
            extraTransportAllowance=(unTaxableExtraTransport*0.25)-565;
            transportCommission = extraTransportAllowance + 2220;
          }
          else if (basicSalary>7801 && basicSalary<=10900){
            extraTransportAllowance=(unTaxableExtraTransport*0.3)-955;
            transportCommission = extraTransportAllowance + 2220;
          }
          else {
          extraTransportAllowance=(unTaxableExtraTransport*0.33)-1500;
          transportCommission = extraTransportAllowance + 2220;
        }
      }
    }
    else {
      if(allowance>=600){
        unTaxableExtraTransport = allowance-600;
          if(basicSalary>600 && basicSalary<=1650){
            extraTransportAllowance=(unTaxableExtraTransport*0.1)-60;
            transportCommission = extraTransportAllowance +600;
          }
          else if (basicSalary>1651 && basicSalary<=3200){
            extraTransportAllowance=(unTaxableExtraTransport*0.15)-142.5;
            transportCommission = extraTransportAllowance + 600;
          }
       else if (basicSalary>3201 && basicSalary<=5250){
            extraTransportAllowance=(unTaxableExtraTransport*0.2)-302.5;
            transportCommission = extraTransportAllowance + 600;
          }
           else if (basicSalary>5251 && basicSalary<=7800){
            extraTransportAllowance=(unTaxableExtraTransport*0.25)-565;
            transportCommission = extraTransportAllowance + 600;
          }
            else if (basicSalary>7801 && basicSalary<=10900){
            extraTransportAllowance=(unTaxableExtraTransport*0.3)-955;
            transportCommission = extraTransportAllowance + 600;
          }
          else {
          extraTransportAllowance=(unTaxableExtraTransport*0.33)-1500;
          transportCommission = extraTransportAllowance + 600;
        }
       
      }
    }
      let NoneTaxAble = 0;
      let TaxAble = 0;


    if(allowance>2220){
       NoneTaxAble = 2220;
      TaxAble =unTaxableExtraTransport;
    }
    else if (allowance<=600){
       NoneTaxAble = 600;
       TaxAble = unTaxableExtraTransport;
    }
    else if(allowance >=601 && allowance <=2220){
     NoneTaxAble = allowance;
    }
    //Grosspay calculation
    let grossPay=earnedSalary+positionCommission+transportCommission+otherAllowance;
      return {
        No: index + 1,
        employeeName: emp.employeeName,
        empDate:emp.empDate,
        basicSalary: basicSalary.toFixed(2),
        workingDays,
        absentDays,
        earnedSalary: earnedSalary.toFixed(2),
        position,
        positionAllowance: positionCommission.toFixed(2),
        transportAllowance:[{NoneTaxAble:NoneTaxAble},{TaxAble:TaxAble}],
        otherAllowance,
        grossPay:grossPay


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