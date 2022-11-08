// Material ui
import { Box, Avatar, Typography } from '@mui/material'

// Components
import UserLike from './UserLikeIcon'
import UserCommentIcon from './UserCommentIcon'
import { Link } from 'react-router-dom'

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

const PostsLayout = (postDetails: postInformation) => {

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
    marginTop: "30px",
  }
  const userSection = {
    display: "inline-flex",
    alignItems: "center"
  }

  return (
    <Box sx={{borderTop: "1px solid #6e6a65"}}>
        <Box sx={containerStyle}>
          <Box sx={postContainer}>
            <Link to={`/${postDetails.creatorName}/post/${postDetails.id}`} style={{color: "inherit", textDecoration: "none"}}>
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
            </Link>
            <Box sx={postUserInterface}>
              <Box sx={userSection}>
                <UserCommentIcon commentCount={postDetails.comment} postID={postDetails.id}/>
              </Box>
              <Box sx={userSection}>
                <UserLike postID={postDetails.id} likes={postDetails.likes}/>
              </Box>
            </Box>
          </Box>
        </Box>
    </Box>
  )
}

export default PostsLayout