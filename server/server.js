const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");
const express = require("express");

const cors = require("cors");

const bcrypt = require("bcryptjs");

const connectDB = require("./config/db");

const User = require("./models/User");

const app = express();

app.use(cors());

app.use(express.json());

const PORT = 5000;

connectDB();

app.get("/", (req, res) => {
  res.send("Backend Server Running");
});

app.get("/api/message", (req, res) => {
  res.json({
    message: "Backend Connected Successfully",
  });
});

app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.json({
      message: "User Registered Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Registration Failed",
      error: error.message,
    });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User Not Found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    res.json({
      message: "Login Successful",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Login Failed",
      error: error.message,
    });
  }
});
app.get("/api/dashboard", async (req, res) => {
  try {
    const totalStudents = await User.countDocuments();

    res.json({
      totalStudents,
      presentToday: 95,
      absentToday: 25,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Dashboard Data Failed",
    });
  }
});
app.get("/api/attendance", (req, res) => {
  const results = [];

  const attendancePath = path.join(
    __dirname,
    "..",
    "ai",
    "attendance.csv"
  );

  fs.createReadStream(attendancePath)
    .pipe(csv())
    .on("data", (data) => {
      results.push(data);
    })
    .on("end", () => {
      res.json(results);
    })
    .on("error", (error) => {
      console.log(error);

      res.status(500).json({
        message: "Error reading attendance file",
      });
    });
});
app.get("/api/students", async (req, res) => {

  try {

    const students = await User.find();

    res.json(students);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to fetch students",
    });
  }
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});