import axios from "axios"
import moment from "moment"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

// Material UI
import { Avatar, Box, Typography } from "@mui/material"

// Icons
import FavoriteIcon from '@mui/icons-material/Favorite'
import CommentIcon from '@mui/icons-material/Comment'

type postInformation = {
  id: string,
  title: string,
  postText: string,
  creatorName: string,
  name: string,
  likes: string,
  comment: string,
  profilePicture: string
}

type commentUserInfo = {
  name: string,
  username: string,
  profilePicture: string
}

interface profileUser {
  name: string,
  profilePicture: string,
  username: string
}

interface userInfo {
  user: [postInformation] | [] ,
  comments: [{
    comment: {
      _id: string,
      comment: string,
      createdAt: Date,
      postId: string,
      userInfo: commentUserInfo
    },
    postInformation: postInformation
  }] | [],
  likes: [{
    like: {
      _id: string,
      postId: string,
    },
    postInformation: postInformation
  }] | []
}

interface props {
  showInfo: string
}

const Profile = () => {

  const [showInfo, setShowInfo] = useState<string>("posts")
  const [profileUser, setProfileUser] = useState<profileUser | null>(null)

  const params = useParams()

  const style = (fieldName: string) => {

    if(fieldName === showInfo) {
      return {
        cursor: "pointer",
        color: "#dbd8d4",
        textTransform: "capitalize",
      }
    }

    const notSelected = { 
      cursor: "pointer",
      textTransform: "capitalize",
      color: "#6e6a65"
    }

    return notSelected
  }

  const containerStyle = {
    width: "45vw",
    margin: "0 auto",
    backgroundColor: "#181a1b",
  }
  const userInfoStyle = {
    width: "100%",
    height: "200px",
    backgroundColor: "#181a1b",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
  const userStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }
  const categorysStyle = {
    display: "flex",
    justifyContent: "space-evenly",
    margin: "10px 0"
  }
  const userInfo = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px"
  }

  useEffect(() => {
    const userProfile = () => {
      const URL = `http://localhost:5000/userInfo/${params.username}`
      axios({
        method: "get",
        url: URL,
        withCredentials: true,
      }).then((response) => {
        const user: profileUser = response.data.user
        setProfileUser(user)
      }).catch((response) => {
        console.log(response)
      })
    }
    userProfile()
  }, [params.username])

  return (
    <Box sx={containerStyle}>
      <Box sx={userInfoStyle}>
        <Box sx={userStyle}>
          <Box>
            <Avatar alt={profileUser?.username} src={`http://localhost:5000${profileUser?.profilePicture}`}/>
          </Box>
          <Box sx={userInfo}>
            <Typography sx={{color: "#d9d6d2"}}>{profileUser?.name}</Typography>
            <Typography sx={{color: "#a59e94"}}>@{profileUser?.username}</Typography>
          </Box>
        </Box>
      </Box>
      <Box>
        <Box sx={categorysStyle}>
          <Typography sx={style("posts")} onClick={() => setShowInfo("posts")}>posts</Typography>
          <Typography sx={style("comments")} onClick={() => setShowInfo("comments")}>comments</Typography>
          <Typography sx={style("likes")} onClick={() => setShowInfo("likes")}>likes</Typography>
        </Box>
        <Box sx={{ marginTop: "10px"}}>
          <ProfileInfo showInfo={showInfo}/>
        </Box>
      </Box>
    </Box>
  )
}

const ProfileInfo = ({ showInfo }: props) => {

  const [userInfo, setUserInfo] = useState<userInfo | null>(null)

  const params = useParams()

  const renderComponent = () => {

    switch (showInfo) {
      case "posts":
        return userPosts()
      case "comments":
        return userComments()
      case "likes":
        return userLikes()
    }
  }

  const userPosts = () => {

    const userPosts = userInfo?.user

    return (
      <Box>
        {userPosts?.map((value, index) => (
          <Box key={index}>
            {postsLayout(value)}
          </Box>
        ))}
      </Box>
    )
  }

  const userComments = () => {

    const userComments = userInfo?.comments
    console.log(userComments)

    const boxStyle = {
      paddingLeft: "30px"
    }
    const containerStyle = {
      padding: "20px",
      paddingLeft: "50px",
    }
    const commentsStyle = {
      cursor: "pointer",
      display: "flex",
      marginTop: "30px",
      justifyContent: "space-between",
      color: "#d9d6d2"
    }
    const userContainer = {
      display: "flex",
      alignItems: "center",
      marginBottom: "20px"
    }
    
    return (
      <Box>
        {userComments?.map((value) => (
          <Box key={value.comment._id}>
            <Box>
              {postsLayout(value.postInformation)}
            </Box>
            <Box sx={boxStyle}>
              <Box sx={containerStyle}>
                <Box sx={userContainer}>
                  <Avatar alt={value.comment.userInfo.username} src={`http://localhost:5000${value.comment.userInfo.profilePicture}`}/>
                  <Typography sx={{marginLeft: "10px", color: "#d9d6d2"}}>{value.comment.userInfo.name}</Typography>
                  <Typography sx={{marginLeft: "5px", color: "#a59e94"}}>@{value.comment.userInfo.username}</Typography>
                </Box>
                <Box sx={commentsStyle}>
                  <Typography>{value.comment.comment}</Typography>
                  <Typography>{moment(value.comment.createdAt).format("DD/MM/YYYY")}</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    )
  }

  const userLikes = () => {

    const userLikes = userInfo?.likes

    return (
      <Box>
        {userLikes?.map((value) => (
          <Box key={value.like._id}>
            {postsLayout(value.postInformation)}
          </Box>
        ))}
      </Box>
    )
  }

  const postsLayout = (postDetails: postInformation) => {

    const containerStyle = {
      padding: "20px",
      color: "#d9d6d2"
    }
    const postInfoContainer = {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "15px"
    }
    const userContainer = {
      display: "flex",
      alignItems: "center",
      marginBottom: "20px"
    }
    const postContainer = {
      padding: "0 2rem",
    }
    const postUserInterface = {
      display: "flex",
      justifyContent: "space-evenly",
      marginTop: "30px"
    }
    const userSection = {
      display: "inline-flex",
      alignItems: "center"
    }

    return (
      <Box sx={{borderTop: "1px solid #6e6a65"}}>
        <Box sx={containerStyle}>
          <Box sx={postContainer}> 
            <Box sx={userContainer}>
              <Avatar alt={postDetails.creatorName} src={`http://localhost:5000${postDetails.profilePicture}`}/>
              <Typography sx={{marginLeft: "10px"}}>{postDetails.name}</Typography>
              <Typography sx={{marginLeft: "5px", color: "#a59e94"}}>@{postDetails.creatorName}</Typography>
            </Box>
            <Box sx={postInfoContainer}>
              <Typography variant="h5">{postDetails.title}</Typography>
            </Box>
            <Box>
              <Typography>{postDetails.postText}</Typography>
            </Box>
            <Box sx={postUserInterface}>
              <Box sx={userSection}>
                <CommentIcon sx={{cursor: "pointer", marginRight: "5px"}}/>
                <span>{postDetails.comment}</span>
              </Box>
              <Box sx={userSection}>
                <FavoriteIcon sx={{cursor: "pointer", marginRight: "5px", color: "white"}}/>
                <span>{postDetails.likes}</span>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    )
  }
  
  useEffect(() => {
    const getUserData = () => {

      const URL = `http://localhost:5000/user/${params.username}`

      axios({
        method: "get",
        url: URL,
        withCredentials: true
      }).then((response) => {
        const userInfo: userInfo = response.data.userInfo
        setUserInfo(userInfo)
      }).catch((response) => {
        console.log(response)
      })
    }
    getUserData()
  }, [params.username])

  return (
    <Box>
      {renderComponent()}
    </Box>
  ) 
}

export default Profile