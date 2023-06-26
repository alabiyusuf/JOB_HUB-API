const User = require("../models/User");
const { BadRequestError, UnauthenticatedError } = require("../errors");

// Register a NEW USER

const registerUser = async (req, res) => {
  const user = await User.create({ ...req.body });

  const token = user.createJWT();

  res.status(200).json({ user: { name: user.getName() }, token });
};

// Login an EXISTING USER

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide an email and a password.");
  }

  const user = await User.findOne({ email });
  if (!user) {
    console.log(user);
    throw new UnauthenticatedError("Invalid Login Parameters...");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Login Parameters");
  }

  const token = user.createJWT();
  res.status(200).json({ user: { name: user.name }, token });
};
module.exports = { registerUser, loginUser };
