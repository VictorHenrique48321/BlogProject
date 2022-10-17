require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const path = require("path")
const cors = require("cors")
const multer = require("multer")

// Cors config 
const corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true
}

// Server Config
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(multer().array())
app.use(cookieParser())
app.use("/userAvatar", express.static("UserAvatar"))
app.use(cors(corsOptions))

// Routes 
const mainRoutes = require("./Routes/routes")
app.use(mainRoutes)

// Database credencials
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

// Connect server to the database
const start = async () => {
  await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.paqhemu.mongodb.net/?retryWrites=true&w=majority`)

  app.listen(5000)
  console.log("Conectou ao banco")
}

start().catch((error) => console.log(error))

module.exports = app


