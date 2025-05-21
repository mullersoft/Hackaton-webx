const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const positionRoutes = require("./routes/postionRoutes");
const employeeRoute = require("./routes/employeeRoutes");
const employerRoute = require("./routes/employerRoutes");
const allowanceRoutes = require("./routes/allowanceRoutes");
const payrollRoutes = require("./routes/payrollRoutes");

const cors = require("cors");

const app = express();
app.use(express.json());
dotenv.config({ path: "./config.env" });

//Database connection
mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("DB connection successful");
  })
  .catch((err) => {
    console.log("DB connection failed", err);
  });
//cors
app.use(cors());
//Routes
app.use("/api", positionRoutes);
app.use("/api", employeeRoute);
app.use("/api", employerRoute);
app.use("/api", allowanceRoutes);
app.use("/api", payrollRoutes);

port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
