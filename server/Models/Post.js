const mongoose = require("mongoose")

const Post = mongoose.model("Post", {
  title: String,
  postText: String,
  createdAt: Date,
  likes: {type: Number, default: 0},
  creatorName: String,
  userId: String
})

module.exports = Post