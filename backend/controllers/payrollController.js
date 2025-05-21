const Employee = require("../models/employeeModel");
const Allowance = require("../models/allownceModel");
const Employer = require("../models/employeerModel");
const Position = require("../models/positionModel");
const TaxAuthority = require("../models/taxAuthority");
const Employeer = require("../models/employeerModel");

exports.getPayroll = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate({
        path: "AllowanceId",
        select: "possionAllowance transportAllowance otherCommission",
        strictPopulate: false,
      })
      .populate({
        path: "positionId",
        select: "positionType",
        strictPopulate: false,
      });
    const employeerAccount = await Employeer.find();
    console.log(employeerAccount);

    const payrollData = employees.map((emp, index) => {
      const employeeName = emp.employeeName;
      const empDate = emp.empDate;
      let basicSalary = emp.basicSalary;
      let absentDays = emp.absentDays || 0;
      const workingDays = emp.workingDays || 30;
      let position = emp.positionId?.positionType;
      let posAllowance = emp.AllowanceId?.possionAllowance;
      let allowance = emp.AllowanceId?.transportAllowance;
      let otherAllowance = emp.AllowanceId?.otherCommission;
      let accEmployee = emp.accountNumber;
      // console.log(accEmployee);
      let PensEmployee = basicSalary * 0.7;
      let PenEmployeer = basicSalary * 0.11;
      let totalPensionContribution = PensEmployee + PenEmployeer;

      console.log(posAllowance);

      if (workingDays <= 30 && workingDays >= 1) {
        if (workingDays != 30) {
          absentDays = 30 - workingDays;
        } else {
          console.log(" date should be 1-30");
        }
      }
      // Earned Salary
      const earnedSalary = basicSalary - absentDays * (basicSalary / 30);

      // Position Allowance Logic
      let positionCommission = 0;
      let transportCommission = 0;
      let unTaxablePositionCommission = 0;
      let tenPercentSalary = 0;
      let noneTaxpos = 0;
      let taxPos = 0;
      if (position.toLowerCase() === "ceo") {
        tenPercentSalary = 0.1 * basicSalary;
        console.log("ten:", tenPercentSalary);
        console.log("pos:", posAllowance);
        if (tenPercentSalary > posAllowance) {
          unTaxablePositionCommission = tenPercentSalary - posAllowance;
          taxPos = unTaxablePositionCommission;
          if (basicSalary < 600) {
            unTaxablePositionCommission = unTaxablePositionCommission;
            positionCommission = unTaxablePositionCommission + posAllowance;
            noneTaxpos = posAllowance;
            // console.log(noneTaxpos);
          } else if (basicSalary >= 601 && basicSalary <= 1650) {
            unTaxablePositionCommission = unTaxablePositionCommission * 0.1;
            positionCommission = posAllowance + unTaxablePositionCommission;
            taxPos = unTaxablePositionCommission;
          } else if (basicSalary >= 1651 && basicSalary <= 3200) {
            unTaxablePositionCommission = unTaxablePositionCommission * 0.15;
            positionCommission = posAllowance + unTaxablePositionCommission;
            taxPos = unTaxablePositionCommission;
          } else if (basicSalary >= 3201 && basicSalary <= 5250) {
            unTaxablePositionCommission = unTaxablePositionCommission * 0.2;
            positionCommission = posAllowance + unTaxablePositionCommission;
            taxPos = unTaxablePositionCommission;
          } else if (basicSalary >= 5251 && basicSalary <= 7800) {
            unTaxablePositionCommission = unTaxablePositionCommission * 0.25;
            positionCommission = posAllowance + unTaxablePositionCommission;
            taxPos = unTaxablePositionCommission;
          } else if (basicSalary >= 7801 && basicSalary <= 10900) {
            unTaxablePositionCommission = unTaxablePositionCommission * 0.3;
            positionCommission = posAllowance + unTaxablePositionCommission;
            taxPos = unTaxablePositionCommission;
          } else if (basicSalary >= 10901) {
            unTaxablePositionCommission = unTaxablePositionCommission * 0.35;
            positionCommission = posAllowance + unTaxablePositionCommission;
            taxPos = unTaxablePositionCommission;
          }
        } else {
          noneTaxpos = posAllowance;
        }
        // positionCommission = 0.10 * basicSalary;
      } else {
        if (basicSalary < 600) {
          positionCommission = tenPercentSalary;
          taxPos = 0;
          noneTaxpos = tenPercentSalary;
        } else if (basicSalary >= 601 && basicSalary <= 1650) {
          positionCommission = basicSalary * 0.1;
        } else if (basicSalary >= 1651 && basicSalary <= 3200) {
          positionCommission = basicSalary * 0.15;
        } else if (basicSalary >= 3201 && basicSalary <= 5250) {
          positionCommission = basicSalary * 0.2;
        } else if (basicSalary >= 5251 && basicSalary <= 7800) {
          positionCommission = basicSalary * 0.25;
        } else if (basicSalary >= 7801 && basicSalary <= 10900) {
          positionCommission = basicSalary * 0.3;
        } else {
          positionCommission = basicSalary * 0.35;
        }
      }
      let extraTransportAllowance = 0;
      let unTaxableExtraTransport = 0;

      // const currentTransportAllowance = allowance
      if (position != "Normal-Employee") {
        if (allowance >= 2220) {
          unTaxableExtraTransport = allowance - 2220;
          if (basicSalary > 600 && basicSalary <= 1650) {
            extraTransportAllowance = unTaxableExtraTransport * 0.1;
            transportCommission = extraTransportAllowance + 2220;
          } else if (basicSalary > 1651 && basicSalary <= 3200) {
            extraTransportAllowance =
              extraTunTaxableExtraTransportransportAllowance * 0.15;
            transportCommission = extraTransportAllowance + 2220;
          } else if (basicSalary > 3201 && basicSalary <= 5250) {
            extraTransportAllowance = unTaxableExtraTransport * 0.2;
            transportCommission = extraTransportAllowance + 2220;
          } else if (basicSalary > 5251 && basicSalary <= 7800) {
            extraTransportAllowance = unTaxableExtraTransport * 0.25;
            transportCommission = extraTransportAllowance + 2220;
          } else if (basicSalary > 7801 && basicSalary <= 10900) {
            extraTransportAllowance = unTaxableExtraTransport * 0.3;
            transportCommission = extraTransportAllowance + 2220;
          } else {
            extraTransportAllowance = unTaxableExtraTransport * 0.33;
            transportCommission = extraTransportAllowance + 2220;
          }
        }
      } else {
        if (allowance >= 600) {
          unTaxableExtraTransport = allowance - 600;
          if (basicSalary > 600 && basicSalary <= 1650) {
            extraTransportAllowance = unTaxableExtraTransport * 0.1;
            transportCommission = extraTransportAllowance + 600;
          } else if (basicSalary > 1651 && basicSalary <= 3200) {
            extraTransportAllowance = unTaxableExtraTransport * 0.15;
            transportCommission = extraTransportAllowance + 600;
          } else if (basicSalary > 3201 && basicSalary <= 5250) {
            extraTransportAllowance = unTaxableExtraTransport * 0.2;
            transportCommission = extraTransportAllowance + 600;
          } else if (basicSalary > 5251 && basicSalary <= 7800) {
            extraTransportAllowance = unTaxableExtraTransport * 0.25;
            transportCommission = extraTransportAllowance + 600;
          } else if (basicSalary > 7801 && basicSalary <= 10900) {
            extraTransportAllowance = unTaxableExtraTransport * 0.3;
            transportCommission = extraTransportAllowance + 600;
          } else {
            extraTransportAllowance = unTaxableExtraTransport * 0.33;
            transportCommission = extraTransportAllowance + 600;
          }
        }
      }

      let NoneTaxAble = 0;
      let TaxAble = 0;
      let nonetaxablePosition = 0;
      let taxable = 0;

      if (allowance > 2220) {
        NoneTaxAble = 2220;
        TaxAble = unTaxableExtraTransport;
      } else if (allowance <= 600) {
        NoneTaxAble = 600;
        TaxAble = unTaxableExtraTransport;
      } else if (allowance >= 601 && allowance <= 2220) {
        NoneTaxAble = allowance;
      }
      //Grosspay calculation
      let grossPay =
        earnedSalary +
        positionCommission +
        transportCommission +
        otherAllowance;
      //taxable Income
      let taxableIncome = earnedSalary + taxPos + TaxAble + otherAllowance;
      //Income Tax
      let incomeTax = 0;
      //Deduction column
      let IncomeTax;
      let Pens_Employe;
      let Pens_Eployeer;
      let Total_pension;

      if (taxableIncome < 600) {
        incomeTax = taxableIncome;
      } else if (taxableIncome > 601 && taxableIncome <= 1650) {
        incomeTax = taxableIncome * 0.1 - 60;
      } else if (taxableIncome > 1651 && taxableIncome <= 3200) {
        incomeTax = taxableIncome * 0.15 - 142.5;
      } else if (taxableIncome > 3201 && taxableIncome <= 5250) {
        incomeTax = taxableIncome * 0.2 - 302.5;
      } else if (taxableIncome > 5251 && taxableIncome <= 7800) {
        incomeTax = taxableIncome * 0.25 - 565;
      } else if (taxableIncome > 7801 && taxableIncome <= 10900) {
        incomeTax = taxableIncome * 0.3 - 955;
      } else {
        incomeTax = taxableIncome * 0.35 - 1500;
      }
      //total deduction
      let totalDeduction = incomeTax + PensEmployee;
      // net payment
      let netPayment = grossPay - totalDeduction;

      return {
        No: index + 1,
        employeeName: emp.employeeName,
        empDate: emp.empDate,
        basicSalary: basicSalary.toFixed(2),
        workingDays,
        absentDays,
        earnedSalary: earnedSalary.toFixed(2),
        position,
        positionAllowance: [
          { nonetaxablePosition: noneTaxpos },
          { taxable: taxPos },
        ],
        transportAllowance: [
          { NoneTaxAble: NoneTaxAble },
          { TaxAble: TaxAble },
        ],
        otherAllowance,
        grossPay: grossPay,
        taxableIncome: taxableIncome,
        Deduction: [
          { IncomeTax: incomeTax },
          { Pens_Employe: PensEmployee },
          { Pens_Eployeer: PenEmployeer },
          { Total_pension: totalPensionContribution },
          { Loan: {} },
        ],
        TotalDeduction: totalDeduction,
        NetPayment: netPayment,
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
