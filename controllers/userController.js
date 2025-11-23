const User = require("../models/userModal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res) => {
  const { username, password, email } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  if (hashedPassword) {
    await User.create({ username, email, password: hashedPassword });
    return res.status(201).json({
      message: "User Created Successfully!",
    });
  }
  return res.status(400).json({
    message: "Big error",
  });
};

module.exports.login = async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).json({
      message: "User not found",
    });
  }

  const compare = await bcrypt.compare(password, user.password);

  if (compare) {
    let token = jwt.sign(
      { email: user.email, username: user.username },
      process.env.JWT_SECRET
    );
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      message: "Welcome back!",
      token,
    });
  }

  res.status(400).json({
    message: "Invalid email or password",
  });
};
