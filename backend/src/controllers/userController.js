const bcrypt = require("bcryptjs");
const User = require("../models/User");

const updateProfile = async (req, res) => {
  try {
    const { name, password, settings } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found." });

    if (name) user.name = name;
    if (password) user.password = await bcrypt.hash(password, 10);

    if (settings) {
      user.settings = {
        ...user.settings,
        ...settings
      };
    }

    await user.save();
    return res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      settings: user.settings
    });
  } catch (error) {
    return res.status(500).json({ message: "Unable to update profile.", error: error.message });
  }
};

module.exports = { updateProfile };
