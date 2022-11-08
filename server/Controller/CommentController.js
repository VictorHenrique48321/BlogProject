// Imports
const jwt = require("jsonwebtoken")

// Middleware
const userInfo = require("../Middleware/userInfo")

// Models
const Comment = require("../Models/Comment")
const Post = require("../Models/Post")

class CommentController {

  static async createComment (req, res) {

    // User info 
    const secret = process.env.SECRET

    const accessToken = req.cookies["access-token"]
    const userId = jwt.verify(accessToken, secret)
    const user = await userInfo(accessToken)

    // Post id and comment
    const { postId, comment } = req.body

    // Validations
    if(!postId) return res.status(422).json({ msg: "Missing post id"})
    if(!comment) return res.status(422).json({ msg: "Missing comment"})

    // Incrementing post comment column
    const post = await Post.findByIdAndUpdate(postId, { $inc: {"comment": 1 }})

    if(!post) return res.status(404).json({ msg: "Post not found"})

    const Newcomment = new Comment ({
      comment: comment,
      createdAt: new Date(),
      creatorName: user.username,
      userId: userId.id,
      postId: postId
    })

    try {

      Newcomment.save()

      return res.status(201).json()

    } catch(error) {

      console.log(error)

      return res.status(500).json({ msg: "Server internal error"})
    }
  }

  static async updateComment (req, res) {

    const { commentId, newComment} = req.body

    // Check if comment exists
    const comment = await Comment.findById(commentId).catch((error) => console.log(error))

    if(!comment) return res.status(404).json({ msg: "comment not found"})   

    // Check if comment is from user
    const accessToken = req.cookies["access-token"]
    const user = await userInfo(accessToken)

    if(comment.userId !== user.id) return res.status(401).json({ msg: "User unathorized"})

    try {

      await Comment.findByIdAndUpdate(commentId, { comment: newComment})

      return res.status(204).json()

    } catch(error) {
      
      console.log(error)

      return res.status(500).json({ msg: "Internal server error"})
    }
  }

  static async deleteComment (req, res) {

    const { commentId } = req.body

    // Check if comment exists
    const comment = await Comment.findById(commentId).catch((error) => console.log(error))

    if(!comment) return res.status(404).json({ msg: "comment not found"})   

    // Check if comment is from user
    const accessToken = req.cookies["access-token"]
    const user = await userInfo(accessToken)

    if(comment.userId !== user.id) return res.status(401).json({ msg: "User unathorized"})

    try {

      await Comment.findByIdAndDelete(commentId)

      return res.status(204).json()

    } catch(error) {
      
      console.log(error)

      return res.status(500).json({ msg: "Internal server error"})
    }

  }
}

module.exports = CommentController