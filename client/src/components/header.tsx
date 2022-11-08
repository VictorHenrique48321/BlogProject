import { Avatar, Box, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { AuthContext } from "../context/authenticateProvider"
import SearchIcon from '@mui/icons-material/Search';
import "./header.css"
import axios from "axios";

interface header {
  links: {
    firstLink: string,
    secondLink: string
  },
  text: {
    firstText: string,
    secondText: string
  }
}

interface searchResultState {
  name: string,
  username: string,
  profilePicture: string
}

const Header = () => {

  const [headerValues, setHeaderValues] = useState<header>({
    links: {
      firstLink: "/register",
      secondLink: "/login"
    },
    text: {
      firstText: "Register",
      secondText: "Login"
    }
  })
  const [username, setUsername] = useState<string>("")
  const [searchBar, setSearchBar] = useState<boolean>(false)
  const [searchResult, setSearchResult] =  useState<searchResultState[] | []>([])
  
  const [authState] = useContext(AuthContext)

  const searchBarStyle = () => {

    if(searchBar) return {
      border: "1px solid #316ba5",
      borderRadius: "50px",
      backgroundColor: "rgb(39, 51, 64)"
    }

    return {
      backgroundColor: "#565656",
      borderRadius: "50px",
    }
  }

  const cleanSearchBar = () => {

    setSearchResult([])
    setSearchBar(false)

    return
  }

  const testeStyle = {
    backgroundColor: "#343a40",
    display: "flex",
    alignItems: "center",
    margin: "0 auto",
    height: "50px"
  }
  const linkStyle = {
    textDecoration: "none"
  }
  const headerStyle = {
    display: "flex",
    width: "45%",
    justifyContent: "flex-start",
    alignItems: "center",
    color: "white",
    margin: "0 auto"
  }
  const searchInfo = {
    display: "flex",
    padding: "5px 10px"
  }
  const searchContent = {
    height: "30px",
    display: "inline-flex",
    alignItems: "center"
  }
  const searchBarResult = {
    position: "fixed",
    width: "243px",
    color: "black",
    backgroundColor: "white",
    borderRadius: "10px",
  }
  const selectUser = {
    '&:hover': {
      backgroundColor: "#F8F8FF",
      cursor: "pointer",
      borderRadius: "10px"
    }
  }
  const searchBarContent = {
    display: "flex",
    alignItems: "center"
  }

  useEffect(() => {
    if(authState) {
      setHeaderValues({
        links: {
          firstLink: `/${authState.username}`,
          secondLink: "/logout"
        },
        text: {
          firstText: "Profile",
          secondText: "Logout"
        }
      })
    }
  }, [authState])

  useEffect(() => {

    if(username?.length <= 0) {
      setSearchResult([])
      return
    }
    
    const searchUser = async () => {

      const URL = `http://localhost:5000/users/${username}`

      const response = await axios({ method: "get", url: URL})
      const data: searchResultState[] = await response.data

      setSearchResult(data)
    }

    searchUser()

  }, [username])

  return (
    <Box sx={testeStyle}>
      <Box sx={{width: "100vw"}}>
        <Box sx={headerStyle}>
          <Typography sx={{margin: "0 25px"}}>
            <NavLink to="/" style={linkStyle} className={({isActive}) => isActive ? "currentLink" : "deactivatedLink"}>
              Home
            </NavLink> 
          </Typography>
          <Typography sx={{margin: "0 25px"}}>
            <NavLink to="/posts" style={linkStyle} className={({isActive}) => isActive ? "currentLink" : "deactivatedLink"}>
                Posts
            </NavLink> 
          </Typography>
          <Box>
            <Box sx={searchBarStyle}>
              <Box sx={searchInfo}>
                <Box sx={searchContent}>
                  <SearchIcon sx={{color: searchBar ? "#316ba5" : "white"}}/>
                </Box>
                <Box sx={searchContent}>
                  <input 
                    type="text"
                    placeholder="Search username"
                    className="inputStyle"
                    onFocus={() =>setSearchBar(true)}
                    onBlur={cleanSearchBar}
                    onChange={(e) =>setUsername(e.target.value)}
                  />
                </Box>
              </Box>
            </Box>
            <Box sx={searchBarResult}>
              <Box sx={{
                borderRadius: "10px", 
                border: searchResult.length >= 1 ? "1px solid black" : "none"}}
              >
                {searchResult.map((value, index) => (
                  <Box key={index} sx={selectUser}>
                    <Link to={`/${value.username}`} style={{color: "inherit", textDecoration: "none"}}>
                      <Box sx={{padding: "10px"}}>
                        <Box sx={searchBarContent}>
                          <Box>
                            <Avatar
                              sx={{width: "48px", height: "48px"}}
                              alt="user profile picture" 
                              src={`http://localhost:5000${value.profilePicture}`}
                            />
                          </Box>
                          <Box sx={{marginLeft: "10px"}}>
                            <Typography>{value.name}</Typography>
                            <Typography sx={{color: "#a59e94"}}>@{value.username}</Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Link>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{display: "flex", width: "30%", justifyContent: "space-evenly", color: "white"}}>
        <Typography>
          <NavLink to={headerValues?.links.firstLink} style={linkStyle} className={({isActive}) => isActive ? "currentLink" : "deactivatedLink"}>
            {headerValues?.text.firstText}
          </NavLink>
          </Typography>
        <Typography>
          <NavLink to={headerValues?.links.secondLink} style={linkStyle} className={({isActive}) => isActive ? "currentLink" : "deactivatedLink"}>
            {headerValues?.text.secondText}
          </NavLink>
        </Typography>
      </Box>
    </Box>
  )
}

export default Header