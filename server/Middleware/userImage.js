const multer = require("multer")
const path = require("path")

// Config of the image storage
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "UserAvatar")
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + path.extname(file.originalname))
  }
})

const userImage = multer({ storage: storage})
  
module.exports = userImage