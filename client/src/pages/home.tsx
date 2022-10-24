import { Box, Typography, Button } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"

export interface recentPosts {
  createdAt: string,
  cretorName: string,
  likes: number,
  postText: string,
  title: string,
  _id: string
}

const Home = () => {

  const [recentPosts, setRecentPosts] = useState<recentPosts[]>([])

  const shorterText = (text: string) => {
    
    const shortText = text.slice(0, 225).concat(" ...")

    return shortText
  }

  const introductionStyle = {
    width: "70%",
    margin: "0 auto",
    height: "200px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  }

  const postsSyle = {
    display: "flex",
    width: "70%",
    margin: "0 auto",
    padding: "25px 0",
    borderBottom: "2px solid black"
  }

  const buttonStyle = {
    textTransform: "none",
    backgroundColor: "#6c757d",
    marginTop: "10px"
  }

  useEffect(() => {
    const getPosts = async () => {
      const URL = "http://localhost:5000/posts"
      axios.get(URL)
      .then((response) => {
        setRecentPosts(response.data.posts)
      })
      .catch((response) => {
        console.log(response)
      })
    }
    getPosts()
  }, [])

  return (
    <Box>
      <Box sx={{backgroundColor: "#e9ecef", padding: "25px 0"}}>
        <Box sx={introductionStyle}>
          <Typography variant="h4"> Create your own post</Typography>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Phasellus vel pellentesque nisl. Pellentesque et sem egestas tortor dignissim lacinia nec sed tortor.
            Nulla imperdiet molestie leo id dictum.
          </Typography>
          <Button sx={{textTransform: "none", width: "150px"}} variant="contained"> Documentantion</Button>
        </Box>
      </Box>
      <Box sx={postsSyle}>
        {recentPosts?.map((postDetails) => (
          <Box key={postDetails._id}>
            <Typography sx={{fontWeight: "bold", fontSize: "22px", marginBottom: "5px"}}>{postDetails.title}</Typography>
            <Box>
              <Typography>{shorterText(postDetails.postText)}</Typography>
            </Box>
            <Button variant="contained" sx={buttonStyle}>See post</Button>
          </Box>
        ))}
      </Box>
    </Box>  
  )
}

export default Home