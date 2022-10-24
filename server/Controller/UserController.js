// Imports
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Post = require("../Models/Post")
const sharp = require("sharp")

// Middlewares
const userInfo = require("../Middleware/userInfo")
const modelDetailed = require("../Middleware/modelDetailed")

// Sharp config
sharp.cache(false)

// Models
const User = require("../Models/User")
const Likes = require("../Models/Likes")
const Comments = require("../Models/Comment")


class UserController {

  static async userAccounteInfo (req, res) {

    const username = req.params.username

    // Check if id exists
    const user = await User.findOne({'username': {'$regex': `^${username}$`, $options: 'i'}}, "name email profilePicture username").catch((error) => console.log(error))

    // Search if user has any posts
    const post = await Post.find({userId: user.id}, "_id title postText likes creatorName")

    // Seach if user has any comments
    const comments = await Comments.find({userId: user.id}, "_id postId comment createdAt userId creatorName")
    
    // Search if user has any likes
    const likes = await Likes.find({userId: user.id}, "postId")
    
    if(!user) {
      return res.status(404).json({ msg: "Usuario nao encontrado"})
    }
    
    const postInformation = await modelDetailed(post, "post")
    const commentInformation = await modelDetailed(comments, "comment")
    const likeInformation = await modelDetailed(likes, "like")

    const userInfo = {
      user: postInformation,
      comments: commentInformation,
      likes: likeInformation
    }

    return res.status(200).json({ userInfo })
  }

  static async createUser (req, res) {

    const { name, username, email, password } = req.body

    // Validations
    if(!name) return res.status(422).json({ msg: "Name is required"})
    if(!username) return res.status(422).json({ msg: "Username is required"})
    if(!email) return res.status(422).json({ msg: "Email is required"})
    if(!password) return res.status(422).json({ msg: "password is required"})

    // Check if user exists 
    const userExists = await User.findOne({'username': {'$regex': `^${username}$`, $options: 'i'}})

    if(userExists) {
      return res.status(422).json({ msg: "Username already registred"})
    }

    // Check if email is exists
    const emailExists = await User.findOne({ email: email})

    if(emailExists) {
      return res.status(422).json({ msg: "Email already registred"})
    }

    // Create password
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    // Create user on database 
    const user = new User({
      name: name,
      username: username,
      email: email,
      password: passwordHash,
    })

    try {

      await user.save()

      res.status(201).json({ msg: "Usuario criado com sucesso"})

    } catch(error) {
      
      console.log(error)

      res.status(500).json({ msg: "Um erro ocorreu"})

    }
  }

  static async loginUser (req, res) {

    const { email, password } = req.body

    // Validations
    if(!email) {
      return res.status(422).json({ msg: "Preencha o email"})
    }
     
    if(!password) {
      return res.status(422).json({ msg: "Preencha a senha"})
    }

    // Check if user exists
    const user = await User.findOne({ email: email })

    if(!user) {
      return res.status(404).json({ msg: "Email nao existe"})
    }

    // Compare passwords
    const checkPassword = await bcrypt.compare( password, user.password)

    if(!checkPassword) {
      return res.status(422).json({ msg: "Senha incorreta" })
    }

    try {

      // creating token
      const secret = process.env.SECRET

      const token = jwt.sign({
        id: user.id
      }, secret)

      res.cookie("access-token", token, {
        maxAge: 60*60*24*30*1000,
        httpOnly: true,
        origin: "http://localhost:3000"
      })

      res.status(200).json({ 
        msg: "Autenticado com sucesso",
        user: {
          name: user.name,
          username: user.username,
          email: user.email,
          profilePicture: user.profilePicture
        }
      })

    } catch(erro) {

      console.log(erro)

      res.status(500).json({ msg: "Ocorreu um erro"})
    }
  }

  static async authenticateUser (req, res) {

    // Verify user ID
    const accessToken = req.cookies["access-token"]
    const user = await userInfo(accessToken)

    try {

      return res.status(200).json({ user })

    } catch(error) {

      console.log(error)

      return res.status(500).json({ msg: "Internal server error"})
    }
  }

  static async userInfo (req, res) {

    const username = req.params.username

    if(!username) return res.status(404).json({msg: "Username is required"})

    const user = await User.findOne({'username': {'$regex': `^${username}$`, $options: 'i'}}, "name profilePicture username")

    try {

      return res.status(200).json({ user })

    } catch(error) {

      console.log(error)

      return res.status(500).json({msg: "Server internal error"})
    }
  }

  static async updateProfilePicture (req, res) {

    const secret = process.env.SECRET
    const accessToken = req.cookies["access-token"]
    const userID = jwt.verify(accessToken, secret)

    // Field to update
    const update = {profilePicture: `/userAvatar/${req.file.filename}`}

    try {

      // Update user profile picture
      await User.findByIdAndUpdate(userID.id, update).catch((err) => console.log(err))

      return res.status(200).json({ msg: "Ola"})

    } catch {

      return res.status(500).json({ msg: "Deu merda"})

    }
  }
}

module.exports = UserController