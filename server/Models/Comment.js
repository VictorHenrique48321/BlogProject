const mongoose = require("mongoose")

const Comment = mongoose.model("Comment", {
  comment: String,
  createdAt: Date,
  creatorName: String,
  userId: String,
  postId: String
})

module.exports = Comment