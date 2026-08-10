var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var answerSchema = new Schema(
  {
    title: { type: String, required: true },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    createdBy: { type: mongoose.Schema.types.ObjectId, ref: "User" },
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Answer",
      required: true,
    },
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reply" }],
  },
  { timestamps: true }
);

userSchema.index("title", "text");
userSchema.index("replies", "text");

module.exports = mongoose.model("Answer", answerSchema);
