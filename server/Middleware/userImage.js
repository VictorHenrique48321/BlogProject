const multer = require("multer")
const path = require("path")
const jwt = require("jsonwebtoken")
const fs = require("fs")

// Models
const User = require("../Models/User")

// Config of the image storage
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "UserAvatar")
  },
  filename: async (req, file, callback) => {

    // User id
    const secret = process.env.SECRET
    const accessToken = req.cookies["access-token"]
    const userID = jwt.verify(accessToken, secret)

    // Find username
    const user = await User.findById(userID.id, "username")

    callback(null, user.username+".png")
  }
})

const userImage = multer({ storage: storage})
  
module.exports = userImage