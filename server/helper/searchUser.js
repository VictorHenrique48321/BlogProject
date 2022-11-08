
// Models
const User = require("../Models/User")

const SearchUser = async (postComments) => {

  let usersInfo = await Promise.all(postComments.map(value => {
    return User.findById(value.userId, "-__v -password -email")
    .then((data => data))
  })) 
  
  return usersInfo
}

module.exports = SearchUser