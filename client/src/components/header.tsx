import { Box, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { AuthContext } from "../context/authenticateProvider"
import "./header.css"

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
  
  const [authState, setAuthState] = useContext(AuthContext)

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
    color: "white",
    margin: "0 auto"
  }

  const showUser = () => {
    console.log(authState)
  }

  useEffect(() => {
    if(authState) {
      setHeaderValues({
        links: {
          firstLink: "/profile",
          secondLink: "/logout"
        },
        text: {
          firstText: "Profile",
          secondText: "Logout"
        }
      })
    }
  }, [authState])

  return (
    <Box sx={testeStyle} onClick={showUser}>
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