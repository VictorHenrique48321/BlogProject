import { useParams } from "react-router-dom"
import { useEffect, useState } from 'react'
import axios from "axios"

import { Avatar, Box, Typography } from '@mui/material'
import moment from "moment"
import UserCommentIcon from "../../../components/profileInfo/postLayouts/UserCommentIcon"
import UserLikeIcon from "../../../components/profileInfo/postLayouts/UserLikeIcon"

interface postInfo {
  postDetails: {
    comment: string,
    createdAt: string,
    likes: number,
    postText: string,
    title: string,
    name: string,
    username: string,
    profilePicture: string,
  },
  postComments: postCommentType[] | []
}

type postCommentType = {
  username: string,
  name: string,
  picture: string
  comment: string,
}

const PostUser = () => {

  const [postDetails, setPostDetails] = useState<postInfo | null>(null)

  const params = useParams()

  const loadComments = () => {

    const comments = postDetails?.postComments

    if(comments?.length === 0) return

    const commentContainer = {
      marginBottom: "30px",
      paddingBottom: "20px",
      "&:last-child": {
        marginBottom: "0",
        paddingBottom: "0",
      }
    }

    return (
      <>
        {comments?.map((value, index) => (
          <Box key={index} sx={commentContainer}>
            <Box sx={postUser}>
              <Avatar alt={value.username} src={`http://localhost:5000${value.picture}`}/>
              <Typography sx={{marginLeft: "5px"}}>{value.name}</Typography>
              <Typography sx={{marginLeft: "5px", color: "#a59e94"}}>@{value.username}</Typography>
            </Box>
            <Box>
              <Typography>{value.comment}</Typography>
            </Box>
          </Box>
        ))}
      </>
    )
  }

  useEffect(() => {
    
    const getPostData = () => {

      // post id from params 
      const postID = params.postID

      const URL = `http://localhost:5000/post/user/${postID}`

      axios({
        method: "get",
        withCredentials: true,
        url: URL
      }).then((res) => {
      
        if(res.status === 200) {

          const postInfo: postInfo = res.data

          setPostDetails(postInfo)

          console.log(postInfo)

          return
        }

        return

      }).catch((err) => {
        console.log(err)
      })
    }

    getPostData()

  }, [params.postID])

  const container = {
    width: "45%",
    margin: "0 auto",
    backgroundColor: "#181a1b",
    color: "#d9d6d2"
  }
  const postContainer = {
    padding: "20px 30px 0 30px"
  }
  const postUser = {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px"
  }
  const postInfo = {
    marginTop: "30px",
    display: "flex",
    justifyContent: "space-evenly",
  }
  const postComments = {
    padding: "20px",
    paddingLeft: "50px"
  }

  return (
    <Box>
      <Box sx={container}>
        <Box sx={postContainer}>
          <Box sx={postUser}>
            <Avatar alt={postDetails?.postDetails.username} src={`http://localhost:5000${postDetails?.postDetails.profilePicture}`}/>
            <Typography sx={{marginLeft: "5px"}}>{postDetails?.postDetails.name}</Typography>
            <Typography sx={{marginLeft: "5px", color: "#a59e94"}}>@{postDetails?.postDetails.username}</Typography>
          </Box>
          <Box>
            <Box sx={{marginBottom: "20px"}}>
              <Typography component="h1" variant="h5">{postDetails?.postDetails.title}</Typography>
            </Box>
            <Box>
              <Typography>{postDetails?.postDetails.postText}</Typography>
            </Box>
          </Box>
          <Box sx={postInfo}>
            <Box sx={{display: "inline-flex", alignItems: "center"}}>
              <UserCommentIcon commentCount={postDetails?.postDetails.comment} postID={params.postID}/>
            </Box>
            <Box sx={{display: "inline-flex", alignItems: "center"}}>
              <UserLikeIcon likes={postDetails?.postDetails.likes} postID={params.postID}/>
            </Box>
          </Box>
          <Box sx={postComments}>
            {loadComments()}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default PostUser