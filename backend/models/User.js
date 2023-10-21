const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  metaMaskId: {
    type: String,
    requied: true,
  },
});

module.exports = model("User", userSchema);
