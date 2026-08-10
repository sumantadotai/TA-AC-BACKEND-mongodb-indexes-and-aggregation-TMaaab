var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var questionSchema = new Schema(
  {
    title: { type: String, required: true },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    tags: [{ type: String }],
    views: [{ type: Number, default: 0 }],
    createdBy: { type: mongoose.Schema.types.ObjectId, ref: "User" },
    answers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Answer" }],
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reply" }],
  },
  { timestamps: true }
);

userSchema.index("title", "text");
userSchema.index("answers", "text");
userSchema.index("tags", 1);

module.exports = mongoose.model("Question", questionSchema);
