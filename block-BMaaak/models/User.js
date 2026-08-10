const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  address: {
    city: String,
    state: String,
    country: String,
    pin: Number,
  },
});

userSchema.index(
  { "address.country": 1, "address.state": 1 },
  { unique: true }
);

module.exports = mongoose.model("User", userSchema);
