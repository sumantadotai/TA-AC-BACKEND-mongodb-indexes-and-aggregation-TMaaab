var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var replySchema = new Schema(
  {
    title: { type: String, required: true },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    createdBy: { type: mongoose.Schema.types.ObjectId, ref: "User" },
    repliedOn: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Answer",
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.index("title", "text");

module.exports = mongoose.model("Reply", replySchema);
