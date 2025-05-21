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
            } catch {
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
                        "Position Allowance",
                        "Transport Allowance (Non-Taxable)",
                        "Transport Allowance (Taxable)",
                        "Other Allowance",
                        "Gross Pay"
                    ];
                    const rows = payroll.map(row => [
                        row.No,
                        row.employeeName,
                        row.empDate ? new Date(row.empDate).toLocaleDateString() : "",
                        row.basicSalary,
                        row.workingDays,
                        row.absentDays,
                        row.earnedSalary,
                        row.position,
                        row.positionAllowance,
                        row.transportAllowance?.[0]?.NoneTaxAble ?? 0,
                        row.transportAllowance?.[1]?.TaxAble ?? 0,
                        row.otherAllowance,
                        row.grossPay
                    ]);
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
                        <th>Position Allowance</th>
                        <th>Transport Allowance (Non-Taxable)</th>
                        <th>Transport Allowance (Taxable)</th>
                        <th>Other Allowance</th>
                        <th>Gross Pay</th>
                    </tr>
                </thead>
                <tbody>
                    {payroll.map((row) => (
                        <tr key={row.No}>
                            <td>{row.No}</td>
                            <td>{row.employeeName}</td>
                            <td>{row.empDate ? new Date(row.empDate).toLocaleDateString() : ""}</td>
                            <td>{row.basicSalary}</td>
                            <td>{row.workingDays}</td>
                            <td>{row.absentDays}</td>
                            <td>{row.earnedSalary}</td>
                            <td>{row.position}</td>
                            <td>{row.positionAllowance}</td>
                            <td>{row.transportAllowance?.[0]?.NoneTaxAble ?? 0}</td>
                            <td>{row.transportAllowance?.[1]?.TaxAble ?? 0}</td>
                            <td>{row.otherAllowance}</td>
                            <td>{row.grossPay}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Payroll;