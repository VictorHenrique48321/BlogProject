import axios from "axios"

// Components
import ProfileInfo from "../../components/profileInfo/ProfileInfo"

// Hooks
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

// Material UI
import { Avatar, Box, Typography } from "@mui/material"

interface profileUser {
  name: string,
  profilePicture: string,
  username: string
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

export default Profile