import { Box, Button, Grid, TextField, Typography } from "@mui/material"
import { useContext, useState } from "react"
import { AuthContext } from "../context/authenticateProvider"
import validateLogin, { loginResponse } from "../helpers/validateLogin"

const Login = () => {

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [loginError, setLoginError] = useState<any>()

  const [authState, setAuthState] = useContext(AuthContext)

  const validateUser = async () => {

    const response = await validateLogin(email, password)

    if(response.error) {
      return setLoginError(response)
    }

    return setAuthState({
      name: response.user.name,
      email: response.user.email,
      profilePicture: response.user.profilePicture
    })
  }

  const containerStyle = {
    height: "calc(100vh - 50px)",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#e9ecef"
  }

  const formStyle = {
    border: "2px solid black",
    borderRadius: "10px",
    width: "500px",
    height: "500px",
    padding: "0 15px",
    margin: "0 auto",
    backgroundColor: "white"
  }

  const headerStyle = {
    color: "#1565c0",
    fontWeight: "500"
  }

  const inputStyle = {
    width: "95%",
    margin: "0 auto"
  }

  return (
    <Box sx={containerStyle}>
      <Grid container spacing={2} sx={formStyle}>
        <Grid item xs={12}>
          <Typography sx={headerStyle} variant="h5">
            LOGIN FORM
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            sx={inputStyle}
            label="Email"
            id="Email"
            type="text"
            size="small"
            onChange={(e) => setEmail(e.target.value)}
            error={loginError?.error}
            helperText={loginError?.message}
            value={email}
            focused
          />  
        </Grid>
        <Grid item xs={12}>
          <TextField
            sx={inputStyle}
            label="Password"
            id="Password"
            type="password"
            size="small"
            onChange={(e) => setPassword(e.target.value)}
            error={loginError?.error}
            helperText={loginError?.message}
            value={password}
            focused
          />  
        </Grid>
        <Grid item xs={6}>
          <Button sx={{textTransform: "none"}} variant="contained" onClick={validateUser}>
            Login
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Login