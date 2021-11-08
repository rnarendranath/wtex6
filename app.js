const express = require("express");
const PORT = process.env.PORT || 5000;
require("dotenv").config();
const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({
  extended: true })
  ); 
const mongoose = require("mongoose");

const empModal = require(__dirname + "/emp.js");
var mongoDB = process.env.MONGODB_URI;

mongoose
  .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connection established"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/Login.html");
});

app.get("/success", (req, res) => {
  res.sendFile(__dirname + "/success.html");
});

app.get("/failure", (req, res) => {
  res.sendFile(__dirname + "/failure.html");
});
app.post("/", async (req, res) => {
  const name = req.body.fName;
  const password = req.body.password;
  if (
    (await empModal.findOne({ name: name })) &&
    (await empModal.findOne({ password: password }))
  ) {
    res.redirect("/success");
  } else {
    res.redirect("/failure");
  }
});

app.get("/signup", (req, res) => {
  res.sendFile(__dirname + "/new_emp.html");
});

app.post("/register", (req, res) => {
  empModal.create(req.body);

  res.sendFile(__dirname + "/register.html");
});



app.listen(PORT, function () {
  console.log("Server started on port 5000");
});
