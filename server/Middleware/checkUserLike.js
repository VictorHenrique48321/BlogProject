// Models
const jwt = require("jsonwebtoken")
const Like = require("../Models/Likes")

const checkUserLike = async (req, res, next)  => {

  const postId = req.params.postId

  const accessToken = req.cookies["access-token"]
  const secret = process.env.SECRET

  const userToken = jwt.verify(accessToken, secret)

  const user = await Like.find({'userId': userToken.id, 'postId': postId})

  if(user.length === 0) {
    next()
    return
  }

  return res.status(422).json({msg: "User already liked the post"})
}

module.exports = checkUserLike