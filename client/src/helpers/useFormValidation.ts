export interface formObject {
  name: {
   error: boolean,
   message: string
  },
  email: {
    error: boolean,
    message: string 
  },
  password: {
    error: boolean,
    message: string 
  }
}

const formValidation = (name: string, email: string, password: string, confirmPassword: string) => {

  let formResponse: formObject = {
    name: {
      error: false,
      message: ""
     },
    email: {
      error: false,
      message: "" 
    },
    password: {
      error: false,
      message: "" 
    }
  }
  
  if(name.length <= 2 || name.length > 13) {
    formResponse.name.error = true
    formResponse.name.message = "The name must be 3 to 13 letters long"
  }

  const nameValidation: RegExp = /^(?=[a-zA-Z0-9\s]{8,20}$)?(?!.*[_.]{2})[^_.].*[^_.]$/

  if(!name.match(nameValidation)) {
    formResponse.name.error = true
    formResponse.name.message = formResponse.name.message ? formResponse.name.message : "The name cannot contain special characters"
  }

  const validationEmail: RegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

  if(!email.match(validationEmail)) {
    formResponse.email.error = true
    formResponse.email.message = "Email is not valid"
  }

  if(password.length <= 7) {
    formResponse.password.error = true
    formResponse.password.message = "Password should have at least 8 characters"
  }

  if(password !== confirmPassword) {
    formResponse.password.error = true
    formResponse.password.message = "Password dont match"
  }

  return formResponse
}

export default formValidation