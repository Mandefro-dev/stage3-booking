const express = require("express");
const dotenv = require("dotenv");
const app = express();
const dbconnect = require("./db/db");
const { authPage, authenticateToken } = require("./middleware/middleware");
const PORT = process.env.PORT || 3000;
const authRoutes = require("./auth/auth");
const bookRoutes = require("./routes/bookRoutes");
dotenv.config();

dbconnect();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/api", authenticateToken, bookRoutes);
app.get("/", async (req, res) => {
  res.send("<h1>This stage3 booking web backend challange</h1>");
});

app.listen(PORT, () => {
  console.log(`The server is running in port ${PORT}`);
});
