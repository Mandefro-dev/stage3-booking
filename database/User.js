const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: "String",
    required: true,
  },
  email: {
    type: "String",
    required: true,
  },
  password: {
    type: "String",
    required: true,
  },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
  role: { type: String, enum: ["Admin", "Student"], required: true },
  preferences: {
    genres: [String],
    authors: [String],
  },
});

module.exports = mongoose.model("User", UserSchema);
