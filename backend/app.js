const express = require("express");
const app = express();
app.use(express.json());

//Middlewares
app.use((req, res, next) => {
  console.log(" this is middleware ✔");
  next();
});

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
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
