const mongoose = require("mongoose")

const User = mongoose.model("User", {
  name: String,
  username: String,
  email: String,
  password: String, 
  profilePicture: {type: String, default: "/userAvatar/default.png"},
})

module.exports = User