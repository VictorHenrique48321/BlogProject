const jwt = require("jsonwebtoken")

// Models
const Like = require("../Models/Likes")
const Post = require("../Models/Post")

const checkUserLike = async (req, res, next)  => {

  const postId = req.params.postId

  const accessToken = req.cookies["access-token"]
  const secret = process.env.SECRET

  const userToken = jwt.verify(accessToken, secret)

  const user = await Like.deleteOne({'userId': userToken.id, 'postId': postId})

  if(user.deletedCount === 0) {
    next()
    return
  }

  await Post.findByIdAndUpdate(postId, {$inc: {"likes": -1}})

  return res.status(200).json({ response: false })
}

module.exports = checkUserLike