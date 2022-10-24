import { Box, Button, Grid, TextField, Typography } from "@mui/material"
import axios from "axios"
import { useState } from "react"
import formValidation, { formObject } from "../helpers/useFormValidation"

const Register = () => {

  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [formResponse, setFormResponse] = useState<formObject>()


  const validateForm = () => {

    const formResponse = formValidation(name, email, password, confirmPassword)

    if(formResponse.email.error === true ||
      formResponse.name.error === true ||
      formResponse.password.error === true 
    ) {
      return setFormResponse(formResponse)
    }

    registerUser(name, email, password)

    return
  }

  const registerUser = (name: string, email: string, password: string) => {

    const formData = new FormData()
    formData.append("name", name)
    formData.append("email", email)
    formData.append("password", password)
    formData.append("confirmPassoword", password)

    axios({
      method: "post",
      url: "http://localhost:5000/auth/register",
      data: formData,
      headers: { "Content-Type": "multipart/form-data"}
    }).then((response) => {
      console.log(response)
    }).catch(() => {
      const error = formValidation(name, email, password, confirmPassword)
      error.email.error = true
      error.email.message = "Email already registered"
      setFormResponse(error)
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
    <Box component="form" sx={containerStyle}>
      <Grid container sx={formStyle} spacing={2}>
        <Grid item xs={12}>
          <Typography sx={headerStyle} variant="h5">
            REGISTER FORM
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            sx={inputStyle}
            label = "Name"
            id="name"
            size="small"
            value={name}
            onChange={(event) => setName(event.target.value)}
            error = {formResponse?.name.error}
            helperText = {formResponse?.name.message}
            focused
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            sx={inputStyle}
            label = "Email"
            id="Email"
            size="small"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            error = {formResponse?.email.error}
            helperText = {formResponse?.email.message}
            focused
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            sx={inputStyle}
            label ="Password"
            id="Password"
            type="password"
            size="small"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            error = {formResponse?.password.error}
            helperText = {formResponse?.password.message}
            focused
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            sx={inputStyle}
            label ="Confirm Password"
            id="ConfirmPassoword"
            type="password"
            size="small"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            error = {formResponse?.password.error}
            helperText = {formResponse?.password.message}
            focused
          />
        </Grid>
        <Grid item xs={6}>
          <Button sx={{textTransform: "none"}} variant="contained" onClick={() => validateForm()}>
            Register
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Register