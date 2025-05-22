import React, { useEffect, useState } from "react";
import axios from "axios";

const Payroll = () => {
    const [payroll, setPayroll] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPayroll = async () => {
            try {
                const res = await axios.get("/payroll");
                setPayroll(res.data?.data ?? []);
            } catch (e) {
                setError("Failed to fetch payroll data.");
            } finally {
                setLoading(false);
            }
        };
        fetchPayroll();
    }, []);

    if (loading) return <div>Loading payroll...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div style={{ padding: "2rem" }}>
            <h2>Payroll Data</h2>
            <button
                style={{ marginBottom: "1rem" }}
                onClick={() => {
                    const headers = [
                        "No",
                        "Name",
                        "Emp Date",
                        "Basic Salary",
                        "Working Days",
                        "Absent Days",
                        "Earned Salary",
                        "Position",
                        "Position Allowance (Non-Taxable)",
                        "Position Allowance (Taxable)",
                        "Transport Allowance (Non-Taxable)",
                        "Transport Allowance (Taxable)",
                        "Other Allowance",
                        "Gross Pay",
                        "Income Tax",
                        "Pension (Employee)",
                        "Pension (Employer)",
                        "Total Pension",
                        "Net Payment"
                    ];

                    const rows = payroll.map(row => {
                        const positionNonTaxable = row.positionAllowance?.[0]?.nonetaxablePosition ?? 0;
                        const positionTaxable = row.positionAllowance?.[1]?.taxable ?? 0;

                        const transportNonTaxable = row.transportAllowance?.[0]?.NoneTaxAble ?? 0;
                        const transportTaxable = row.transportAllowance?.[1]?.TaxAble ?? 0;

                        const incomeTax = row.Deduction?.[0]?.IncomeTax ?? 0;
                        const pensEmployee = row.Deduction?.[1]?.Pens_Employe ?? 0;
                        const pensEmployer = row.Deduction?.[2]?.Pens_Eployeer ?? 0;
                        const totalPension = row.Deduction?.[3]?.Total_pension ?? 0;

                        return [
                            row.No,
                            row.employeeName,
                            row.empDate ? new Date(row.empDate).toLocaleDateString() : "",
                            row.basicSalary,
                            row.workingDays,
                            row.absentDays,
                            row.earnedSalary,
                            row.position,
                            positionNonTaxable,
                            positionTaxable,
                            transportNonTaxable,
                            transportTaxable,
                            row.otherAllowance,
                            row.grossPay,
                            incomeTax,
                            pensEmployee,
                            pensEmployer,
                            totalPension,
                            row.NetPayment
                        ];
                    });

                    const csvContent =
                        [headers, ...rows]
                            .map(e => e.map(v => `"${String(v).replace(/"/g, '""')}"`).join(","))
                            .join("\n");

                    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    link.href = url;
                    link.setAttribute("download", "payroll.csv");
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(url);
                }}
            >
                Download as Excel (CSV)
            </button>

            <table border="1" cellPadding="8" cellSpacing="0" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Emp Date</th>
                        <th>Basic Salary</th>
                        <th>Working Days</th>
                        <th>Absent Days</th>
                        <th>Earned Salary</th>
                        <th>Position</th>
                        <th>Position Allowance (Non-Taxable)</th>
                        <th>Position Allowance (Taxable)</th>
                        <th>Transport Allowance (Non-Taxable)</th>
                        <th>Transport Allowance (Taxable)</th>
                        <th>Other Allowance</th>
                        <th>Gross Pay</th>
                        <th>Income Tax</th>
                        <th>Pension (Employee)</th>
                        <th>Pension (Employer)</th>
                        <th>Total Pension</th>
                        <th>Net Payment</th>
                    </tr>
                </thead>
                <tbody>
                    {payroll.map((row) => {
                        const positionNonTaxable = row.positionAllowance?.[0]?.nonetaxablePosition ?? 0;
                        const positionTaxable = row.positionAllowance?.[1]?.taxable ?? 0;

                        const transportNonTaxable = row.transportAllowance?.[0]?.NoneTaxAble ?? 0;
                        const transportTaxable = row.transportAllowance?.[1]?.TaxAble ?? 0;

                        const incomeTax = row.Deduction?.[0]?.IncomeTax ?? 0;
                        const pensEmployee = row.Deduction?.[1]?.Pens_Employe ?? 0;
                        const pensEmployer = row.Deduction?.[2]?.Pens_Eployeer ?? 0;
                        const totalPension = row.Deduction?.[3]?.Total_pension ?? 0;

                        return (
                            <tr key={row.No}>
                                <td>{row.No}</td>
                                <td>{row.employeeName}</td>
                                <td>{row.empDate ? new Date(row.empDate).toLocaleDateString() : ""}</td>
                                <td>{row.basicSalary}</td>
                                <td>{row.workingDays}</td>
                                <td>{row.absentDays}</td>
                                <td>{row.earnedSalary}</td>
                                <td>{row.position}</td>
                                <td>{positionNonTaxable}</td>
                                <td>{positionTaxable}</td>
                                <td>{transportNonTaxable}</td>
                                <td>{transportTaxable}</td>
                                <td>{row.otherAllowance}</td>
                                <td>{row.grossPay}</td>
                                <td>{incomeTax}</td>
                                <td>{pensEmployee}</td>
                                <td>{pensEmployer}</td>
                                <td>{totalPension}</td>
                                <td>{row.NetPayment}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Payroll;
