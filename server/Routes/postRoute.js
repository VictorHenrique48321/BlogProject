const router = require("express").Router()

// Controller
const postController = require("../Controller/PostController")

// Middleware
const checkToken = require("../Middleware/checkToken")
const checkUserLike = require("../Middleware/checkUserLike")

// Show Posts
router.get("/posts", postController.showPosts)

// Create Post
router.post("/createpost", checkToken, postController.createPost)

// Post Route
router.get("/post/:id", postController.postDetails)

// Show post on comment
router.get("/post/comment/:id", postController.postOnComment)

// Post Details User
router.get("/post/user/:id", postController.postDetailsUser)

// Like Post
router.post("/post/:postId/like", checkToken, checkUserLike, postController.likePost)

// Check User Like
router.get("/post/:postId/like", checkToken, postController.checkUserLike)

// Update Post
router.put("/post/:id/update", checkToken, postController.updatePost)

// Delete Post 
router.delete("/post/:id/delete", checkToken, postController.deletePost)

module.exports = router