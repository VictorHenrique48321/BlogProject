import axios from "axios"

export interface loginResponse {
  error: boolean
  message: string
  user: {
    name: string,
    username: string,
    email: string,
    profilePicture: string
  }
}

const validateLogin = async (email: string, password: string) => {

  const URL = "http://localhost:5000/auth/login"

  const formData = new FormData()
  formData.append("email", email)
  formData.append("password", password)

  const data = await axios({
    method: "post",
    url: URL,
    data: formData,
    headers: { "Content-Type": "multipart/form-data"},
    withCredentials: true
  })
  .then((response) => {
    return {
      error: false,
      message: "",
      user: response.data.user
    }
  })
  .catch(() => {
    return {
      error: true,
      message: "Email or password are incorrect",
      user: {}
    }
  })

  return data
}

export default validateLogin