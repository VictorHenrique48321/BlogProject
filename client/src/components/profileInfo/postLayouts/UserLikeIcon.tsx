import axios from "axios"
import { useEffect, useState } from "react"

// Icons
import FavoriteIcon from '@mui/icons-material/Favorite'

interface userLikeState {
  cursor: "pointer",
  marginRight: "5px",
  color: "red" | "white"
}

interface props {
  postID: string | undefined,
  likes: number | undefined
}

const UserLikeIcon = ({ postID, likes }: props) => {
  
  const [userLike, setUserLike] = useState<null | userLikeState>(null)
  const [likeCount, setLikeCount] = useState<number | undefined>(likes)

  const updateLike = async () => {

    const URL = `http://localhost:5000/post/${postID}/like`

    const response = await axios({
      method: "post",
      url: URL,
      withCredentials: true
    })

    const data: boolean = await response.data.response

    const likeStyle: userLikeState = {
      cursor: "pointer",
      marginRight: "5px",
      color: data ? "red" : "white"
    }

    const updateLikeCount = data ? likeCount! + 1 : likeCount! - 1

    setUserLike(likeStyle)
    setLikeCount(updateLikeCount)
    return
  }

  useEffect(() => {

    const URL = `http://localhost:5000/post/${postID}/like`

    // Check if user liked the post
    const checkLike = async () => {

      const response = await axios({
        method: "get",
        url: URL,
        withCredentials: true
      })

      const data: boolean = await response.data.like

      const likeStyle: userLikeState = {
        cursor: "pointer",
        marginRight: "5px",
        color: data ? "red" : "white"
      }

      setUserLike(likeStyle)

      return
    }

    checkLike()

  }, [])

  return (
    <>
      <FavoriteIcon sx={userLike} onClick={updateLike}/>
      <span>{likeCount}</span>
    </>
  )
}

export default UserLikeIcon