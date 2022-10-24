const router = require("express").Router()

// Controller
const userController = require("../Controller/UserController")

// Middleware
const checkToken = require("../Middleware/checkToken")
const userImage = require("../Middleware/userImage")

// Register User
router.post("/auth/register", userController.createUser)

// User Account Info 
router.get("/user/:username", userController.userAccounteInfo)

// User Info
router.get("/userinfo/:username", userController.userInfo)

// Login User
router.post("/auth/login", userController.loginUser)

// Authenticate User
router.get("/auth", checkToken, userController.authenticateUser)

// Change user profile picture
router.post("/change/profilePicture", checkToken, userImage.single("avatar"), userController.updateProfilePicture)

module.exports = router