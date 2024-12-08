const User = require("../database/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).jsonp("YOU SHOULD FILL ALL FIELDS");
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json("User already exits");
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = new User({
        name,
        email,
        password: hashedPassword,
        role,
      });
      await user.save();
      return res.status(200).json(user);
    }
  } catch (error) {
    return res.status(400).json("User regustration failed", error.message);
  }
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json("User does not exist");
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json("Invalid Password");
    }

    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    return res.status(200).json(accessToken);
  } catch (error) {
    return res.status(500).json("User login field");
  }
});

module.exports = router;
