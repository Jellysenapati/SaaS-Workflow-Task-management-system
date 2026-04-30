const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    settings: {
      theme: { type: String, enum: ["dark", "light"], default: "dark" },
      remindersEnabled: { type: Boolean, default: true },
      reminderBeforeHours: { type: Number, default: 24, min: 1, max: 168 }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
