const express = require("express");
const connectDB = require("./config/db");
const app = express();

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
app.use(express.json({ extended: false }));

app.use("/api/users", require("./routes/users"));
app.use("/api/contacts", require("./routes/contacts"));
app.use("/api/auth", require("./routes/auth"));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Contact Keeper API" });
});
