var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: /@/ },
    password: { type: String, required: true },
    reputation: { type: Number, default: 0 },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
    answers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Answer" }],
  },
  { timestamps: true }
);

userSchema.index("questions", "text");

module.exports = mongoose.model("User", userSchema);
