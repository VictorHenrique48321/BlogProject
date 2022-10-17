const mongoose = require("mongoose")

const Likes = mongoose.model("Like", {
  userId: String,
  postId: String
})

module.exports = Likes