const { default: axios } = require("axios")
const postDetails = require("./postDetails")


const modelDetailed = async (model, modelName) => {

  let details = null

  if(model.length >= 1) {

    const postId = model.map((value) => {

      if(modelName === "post") {
        return value.id
      }

      return value.postId
    })

    details = await postDetails(postId)
  }

  let postInformation = []

  let userInfo = null

  if(modelName === "comment" & model.length >= 1) {
    
    const userInfoData = await axios(`http://localhost:5000/userinfo/${model[0].creatorName}`).catch((error) => console.log("deu merda"))
  
    userInfo = {
      name: userInfoData.data.user.name,
      username: userInfoData.data.user.username,
      profilePicture: userInfoData.data.user.profilePicture,
    }  
  }

  for(let i = 0; i < model.length; i++) {

    const postInfo = {
      id: details[i].id,
      title: details[i].title,
      postText: details[i].postText ,
      creatorName: details[i].creatorName,
      name: details[i].name,
      likes: details[i].likes,
      profilePicture: details[i].profilePicture
    }

    let modelKeys

    switch (modelName) {
      case "comment":
        modelKeys = {
          _id: model[i].id,
          comment: model[i].comment,
          createdAt: model[i].createdAt,
          postId: model[i].postId,
          userInfo
        }
        break
      case "like": 
        modelKeys = {
          _id: model[i]._id,
          postId: model[i].postId,
        }
        break
      default:
        break;
    }

    const information = {
      [modelName]: modelKeys,
      postInformation: postInfo
    }

    if(modelName === "post") postInformation.push(postInfo)
    else postInformation.push(information)
  }

  return postInformation
}

module.exports = modelDetailed