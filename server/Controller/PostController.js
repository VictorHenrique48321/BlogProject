// Imports
const moment = require("moment")
const jwt = require("jsonwebtoken")

// Middlewares
const userInfo = require("../Middleware/userInfo")

// Models
const Post = require("../Models/Post")
const Comment = require("../Models/Comment")
const Likes = require("../Models/Likes")
const User = require("../Models/User")
const SearchUser = require("../helper/searchUser")

class PostController {

  static async showPosts (req, res) {

    // Get most recent posts
    const posts = await Post.find({}, "-userId -__v").sort({ "createdAt": -1}).limit(3)

    try {

      return res.status(200).json({ posts })

    } catch(error) {

      console.log(error)

      return res.status(500).json({ msg: "Internal server error"})

    }
  }

  static async createPost (req, res) {

    const { title, postText } = req.body

    // Validations
    if(!title) return res.status(422).json({ msg: "No title"})
    if(!postText) return res.status(422).json({ msg: "No postText"})

    // Get user info
    const secret = process.env.SECRET

    const tokenAcess = req.cookies["access-token"]
    const user = await userInfo(tokenAcess)
    const userId = jwt.verify(tokenAcess, secret)

    // Create post
    const post = new Post({
      title: title,
      postText: postText,
      createdAt: new Date(),
      creatorName: user.username,
      userId: userId.id
    })  

    try {

      await post.save()

      res.status(201).json(post)

    } catch(err) {

      console.log(err)

      res.status(500).json({ msg: "Error on server"})
    }

  }

  static async postDetails (req, res) {

    const id = req.params.id

    // Check if post exists
    const post = await Post.findById(id, "-userId").catch((error) => console.log(error))

    if(!post) return res.status(404).json({ msg: "Post not found"})

    // Check post creator
    const user = await User.findOne({ username: post.creatorName}, "name username profilePicture")

    // Check if post has comments
    const comments = await Comment.find({postId: id}, "comment creatorName")

    try {

      const postDetails = {
        post: post,
        comments: comments,
        user: user
      }

      return res.status(200).json({ postDetails })

    } catch(err) {

      console.log(err)

      return res.status(500).json({ msg: "Internal server error"})

    }

  }

  static async postOnComment (req, res) {

    const postID = req.params.id

    // Check if post exists
    const post = await Post.findById(postID, "-_id -userId -__v -comment -createdAt -likes -creatorName")

    if(!post) return res.status(200).json("post not found")

    // Get user info
    const secret = process.env.SECRET
    const accessToken = req.cookies["access-token"]
    const userId = jwt.verify(accessToken, secret).id

    const user = await User.findById(userId, "-password -__v -_id -email")

    const postDetails = {
      name: user.name,
      username: user.username,
      profilePicture: user.profilePicture,
      title: post.title,
      postText: post.postText,

    }

    return res.status(200).json(postDetails)

  }

  static async postDetailsUser (req, res) {

    const postID = req.params.id

    // Check if post exists
    const post = await Post.findById(postID, "-__v -_id -creatorName -createdAt")

    if(!post) return res.status(404).json("post not found")

    // Search post comments
    const comments = await Comment.find({"postId": postID}, "-postId -__v -_id -creatorName")
    // user info from comments
    const userInfo = await SearchUser(comments)

    // merge comments and users
    const postComments = []
    
    comments.map((value, index) => {
      if(value.userId === userInfo[index].id) {
        postComments.push({
          username: userInfo[index].username,
          name: userInfo[index].name,
          picture: userInfo[index].profilePicture,
          ...value.toJSON()
        })
      }
    })

    // merge post and user
    const userPost = await User.findById(post.userId, "-_id -email -password -__v")
    
    const postDetails = {
      ...post.toJSON(),
      ...userPost.toJSON()
    }

    try {

      return res.status(200).json({postComments, postDetails})
    
    } catch(err) {

      console.log(err)

      return res.status(500).json("server error")

    }
  }

  static async likePost (req, res) {

    const postId = req.params.postId

    //Get user info
    const secret = process.env.SECRET
    const accessToken = req.cookies["access-token"]
    const userId = jwt.verify(accessToken, secret)

    // If post exists increment like by 1
    const post = await Post.findByIdAndUpdate(postId, { $inc: {"likes": 1 }})

    if(!post) return res.status(404).json({ msg: "Post not found"})

    const likes = new Likes({
      userId: userId.id,
      postId: postId,
      createdAt: new Date()
    })

    try {

      await likes.save()

      return res.status(200).json({ response: true })

    } catch(error) {

      console.log(error)

      return res.status(500).json({ msg: "Server internal error"})

    }

  }

  static async checkUserLike (req, res) {

    const post = req.params.postId

    //Get user info
    const secret = process.env.SECRET
    const accessToken = req.cookies["access-token"]
    const user = jwt.verify(accessToken, secret).id

    // Check if user liked the post
    const like = await Likes.findOne({userId: user, postId: post}).catch((err) => console.log(err))

    if(!like) return res.status(200).json({like: false})

    try {

      return res.status(200).json({like: true})

    } catch(err) {

      console.log(err)

      return res.status(500).json({msg: "server internal error"})
    }
  }

  static async updatePost (req, res) {

    const { title, postText } = req.body

    const postId = req.params.id

    // Get user info
    const tokenAcess = req.cookies["access-token"]
    const user = await userInfo(tokenAcess)

    // Check if post exists
    const post = await Post.findById(postId)

    if(!post) return res.status(404).json({ msg: "Post not found"})
    
    // Check if user created post
    if(post.userId !== user.id) return res.status(401).json({ msg: "User unauthorized"})

    try {

      // If body is empty set to default value
      post.title = title !== undefined ? title : post.title
      post.postText = postText !== undefined ? postText : post.postText

      // Updating post
      await Post.findByIdAndUpdate(postId, {
        title: post.title, 
        postText: post.postText
      })

      return res.status(200).json({ msg: "Post updated" })

    } catch(err) {

      console.log(err)

      return res.status(500).json({ msg: "Server internal error"})
    }

  }

  static async deletePost (req, res) {

    const postId = req.params.id

    // Check if post exists
    const post = await Post.findById(postId)

    if(!post) return res.status(404).json({ msg: "Post not found"})

    // Check if user created post
    const tokenAcess = req.cookies["access-token"]
    const user = await userInfo(tokenAcess)

    if(post.userId !== user.id) return res.status(401).json({ msg: "User unathourized"})

    try {

      await Post.findByIdAndDelete(postId)

      return res.status(204).json()

    } catch(error) {

      console.log(error)

      return req.status(500).json({ msg: "Internal server error"})
    }


  }
}

module.exports = PostController