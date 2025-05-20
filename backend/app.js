const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
dotenv.config({ path: "./config.env" });
// console.log(process.env.PORT);

//Database connection
mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("DB connection successful");
  })
  .catch((err) => {
    console.log("DB connection failed", err);
  });

//Middlewares
app.use((req, res, next) => {
  console.log(" this is middleware ✔");
  next();
});
console.log(process.env);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.post("/", (req, res) => {
  console.log(req.body);
  res.send("Hello World!");
});

app.patch("/apiPatch", (req, res) => {
  res.json({ message: "patch api!" });
});
app.delete("/apiDelete", (req, res) => {
  res.json({ message: "delete api!" });
});
port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
