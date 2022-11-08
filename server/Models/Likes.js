const mongoose = require("mongoose")

const Likes = mongoose.model("Like", {
  userId: String,
  postId: String,
  createdAt: Date
})

module.exports = Likes