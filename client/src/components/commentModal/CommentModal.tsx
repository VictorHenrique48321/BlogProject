import { Avatar, Modal, Typography, TextField, Button, Grid, makeStyles, IconButton } from "@mui/material"
import { Box } from "@mui/system"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/authenticateProvider"
import axios from "axios"

// Icons
import CloseIcon from '@mui/icons-material/Close';

interface props {
  postID: string | undefined,
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

interface postCommentDetails {
  name: string,
  username: string,
  profilePicture: string,
  title: string,
  postText: string
}

const CommentModal = ({ postID, open, setOpen }: props) => {

  const [postDetails, setPostDetails] = useState<null | postCommentDetails[]>(null)
  const [comment, setComment] = useState<string>("")
  
  const [authState] = useContext(AuthContext)

  const handleComment = (value: string) => {

    if(value.length <= 240) {
      setComment(value)
      return
    }

    return
  }

  const createComment = () => {

    if(comment.length <= 0) return 

    const URL = "http://localhost:5000/newcomment"

    axios({
      method: "post",
      url: URL,
      withCredentials: true,
      data: {
        postId: postID,
        comment: comment
      }
    }).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })

    handleClose()
    return
  }

  const handleClose = () => setOpen(false)

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: "400px",
    width: "800px",
    border: "2px solid black",
  }
  const boxContainer = {
    width: "100%",
    height: "100%",
    backgroundColor: "#343a40",
    color: "#d9d6d2"
  }
  const boxUserInfo = {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: "20px",
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
  const commentContainer = {
    padding: "0 2rem",
  }
  const commentUser = {
    display: "flex",
    alignItems: "flex-start",
  }
  const userComment = {
    marginLeft: "10px",
    width: "100%",
  }
  const uiContainer = {
    padding: "0 2rem",
  }
  const uiLayout = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }

  useEffect(() => {
    const getPostDetails = () => {
      const URL = `http://localhost:5000/post/comment/${postID}`
      axios({
        method: "get",
        url: URL,
        withCredentials: true
      }).then((res) => {

        const postInfo: postCommentDetails[] = [res.data]

        setPostDetails(postInfo)

      }).catch((err) => {
        console.log(err)
      })
    }
    if(open) getPostDetails()
  }, [open])

  return (
    <Box>
      <Modal 
        sx={modalStyle}
        open={open} 
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          {postDetails?.map((value, index) => (
            <Box sx={boxContainer} key={index}>     
              <Grid container sx={{height: "fill-available"}}>
                <Grid item xs={12}>
                  <Box sx={postContainer}>
                    <Box sx={boxUserInfo}>
                      <Box sx={userContainer}>
                        <Avatar alt={value.username} src={`http://localhost:5000${value.profilePicture}`}/>
                        <Typography sx={{marginLeft: "10px"}}>{value.name}</Typography>
                        <Typography sx={{marginLeft: "5px", color: "#a59e94"}}>@{value.username}</Typography>
                      </Box>
                      <Box sx={userContainer}>
                        <IconButton aria-label="close comment" sx={{color: "white"}} onClick={handleClose}>
                          <CloseIcon />
                        </IconButton>
                      </Box>
                    </Box>
                    <Box sx={postInfoContainer}>
                      <Typography variant="h5">{value.title}</Typography>
                    </Box>
                    <Box>
                      <Typography>{value.postText}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={commentContainer}>
                    <Box sx={commentUser}>
                      <Box>
                        <Avatar alt={authState.name} src={`http://localhost:5000${authState.profilePicture}`}/>
                      </Box>
                      <Box sx={userComment}> 
                        <TextField
                          id="standard-multiline-flexible"
                          inputProps={{ style: { color: "#d9d6d2" } }}
                          label="Multiline"
                          multiline={true}
                          variant="standard"
                          autoFocus
                          focused
                          fullWidth
                          value={comment}
                          onChange={(e) => handleComment(e.target.value)}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={uiContainer}>
                    <Box sx={uiLayout}>
                      <Box>
                        <Typography> Counter 240/{comment.length}</Typography>
                      </Box>
                      <Box>
                        <Button variant="contained" onClick={createComment}>Reply</Button>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          ))}
        </>
      </Modal>
    </Box>
  )
}

export default CommentModal