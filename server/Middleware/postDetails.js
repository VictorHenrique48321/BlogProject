const { default: axios } = require("axios")

const postDetails = async (postsId) => {

  try {
    
    const response = await Promise.all(
      postsId.map((id) => axios(`http://localhost:5000/post/${id}`))
    )
    
    const postData = response.map((data) => {

      return {
        id: data.data.postDetails.post._id,
        title: data.data.postDetails.post.title,
        postText: data.data.postDetails.post.postText,
        likes: data.data.postDetails.post.likes,
        name: data.data.postDetails.user.name,
        creatorName: data.data.postDetails.user.username,
        profilePicture: data.data.postDetails.user.profilePicture
      }
    })
  
    return postData

  } catch(err) {

    return "Post not found"
  }
  
}

module.exports = postDetails