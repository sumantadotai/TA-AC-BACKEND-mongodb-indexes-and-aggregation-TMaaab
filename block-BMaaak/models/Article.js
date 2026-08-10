const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: String,
  description: String,
  tag: [String],
});

articleSchema.index({ tags: 1 });
// articleSchema.index({ title: "text" });
articleSchema.index({ title: "text", description: "text" });

module.exports = mongoose.model("User", articleSchema);
