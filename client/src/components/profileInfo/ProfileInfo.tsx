// Hooks
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

// Material ui
import { Box, Avatar, Typography } from '@mui/material'

import axios from 'axios'
import moment from 'moment'

// Components
import PostsLayout from './postLayouts/PostsLayout'

interface props {
  showInfo: string
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

type postInformation = {
  id: string,
  title: string,
  postText: string,
  creatorName: string,
  name: string,
  likes: number,
  comment: string,
  profilePicture: string
}

type commentUserInfo = {
  name: string,
  username: string,
  profilePicture: string
}

interface props {
  showInfo: string
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
            {PostsLayout(value)}
          </Box>
        ))}
      </Box>
    )
  }

  const userComments = () => {

    const userComments = userInfo?.comments

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
              {PostsLayout(value.postInformation)}
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
            {PostsLayout(value.postInformation)}
          </Box>
        ))}
      </Box>
    )
  }
  
  useEffect(() => {
    const getUserData = () => {

      const URL = `http://localhost:5000/user/${params.username}`

      console.log("ola")

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

  if(userInfo) return <>{renderComponent()}</>

  return (
    <>
      <div>Ola</div>
    </>
  )
}

export default ProfileInfo