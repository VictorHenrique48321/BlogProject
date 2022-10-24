const router = require("express").Router()

// Controller
const commentController = require("../Controller/CommentController")

// Middleware
const checkToken = require("../Middleware/checkToken")

// Create Comment 
router.post("/newcomment", checkToken, commentController.createComment)

// Update Comment
router.put("/commentupdate", checkToken, commentController.updateComment)

// Delete Comment
router.delete("/commentdelete", checkToken, commentController.deleteComment)

module.exports = router