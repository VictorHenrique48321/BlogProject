const jwt = require("jsonwebtoken")
const User = require("../Models/User")

const userInfo = async (token) => {
  
  const secret = process.env.SECRET

  const userToken = jwt.verify(token, secret)

  const user = await User.findById(userToken.id, "-password -_id -__v").catch((err) => console.log(err))

  return user
}

module.exports = userInfo