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

// Like Post
router.get("/post/:postId/like", checkToken, checkUserLike, postController.likePost)

// Update Post
router.put("/post/:id/update", checkToken, postController.updatePost)

// Delete Post 
router.delete("/post/:id/delete", checkToken, postController.deletePost)

module.exports = router