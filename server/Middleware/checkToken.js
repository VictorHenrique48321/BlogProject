const jwt = require("jsonwebtoken")

const checkToken = async (req, res, next) => {

  const accessToken = req.cookies["access-token"]

  if(!accessToken) return res.status(404).json({ msg: "Usuario nao autenticado"})

  try {

    const secret = process.env.SECRET

    const validToken = jwt.verify(accessToken, secret)

    if(validToken) {
      req.authenticated = true
      next()
    }
    

  } catch(error) {

    return res.status(500).json({ msg: "Token invalido"})

  }
}

module.exports = checkToken

