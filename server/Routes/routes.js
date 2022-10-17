const router = require("express").Router()

// Controllers 
const { publicRoute, createUser, loginUser, privateRoute, authenticateUser, userInfo } = require("../Controller/UserController")
const { createPost, postDetails, likePost, updatePost, deletePost, showPosts } = require("../Controller/PostController")
const { createComment, updateComment, deleteComment } = require("../Controller/CommentController")

// Middlewares
const checkToken = require("../Middleware/checkToken")
const userImage = require("../Middleware/userImage")

// Public Route
router.get("/", publicRoute)

// Private Route
router.get("/user/:username", privateRoute)

// Register User
router.post("/auth/register", createUser)

// User Info
router.get("/userinfo/:username", userInfo)

// Login User
router.post("/auth/login", loginUser)

// Authenticate User
router.get("/auth", checkToken, authenticateUser)

// Show Posts
router.get("/posts", showPosts)

// Create Post
router.post("/createpost", checkToken, createPost)

// Post Route
router.get("/post/:id", postDetails)

// Like Post
router.get("/post/:id/like", checkToken, likePost)

// Update Post
router.put("/post/:id/update", checkToken, updatePost)

// Delete Post 
router.delete("/post/:id/delete", checkToken, deletePost)

// Create Comment 
router.post("/newcomment", checkToken, createComment)

// Update Comment
router.put("/commentupdate", checkToken, updateComment)

// Delete Comment
router.delete("/commentdelete", checkToken, deleteComment)

module.exports = router