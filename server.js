const express = require("express");
const connectDB = require("./config/db");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT;
app.use(express.json());

connectDB();

app.get("/", async (req, res) => {
  res.status(200).json({ msg: "Hello world" });
});

app.use("/users", require("./routes/users"));

app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});
