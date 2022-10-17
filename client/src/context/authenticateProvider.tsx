import axios from "axios";
import { createContext, JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useEffect, useState } from "react";

export interface userData {
  name: string,
  email: string,
  profilePicture: string,
  username: string
}

export const AuthContext = createContext<any>({})

export const AuthProvider = (props: { children: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }) => {
  
  const [authState, setAuthState] = useState<userData | null>(null)

  useEffect(() => {
    
    const authenticateUser = () => {

      const URL = "http://localhost:5000/auth"
      
      axios({
        method: "get",
        url: URL,
        withCredentials: true
      }).then((response) => {

        const user: userData = response.data.user

        setAuthState(user)

      }).catch((response) => {
        console.log(response)
      })
    }

    authenticateUser()
  }, [])

  return (
    <AuthContext.Provider value={[authState, setAuthState]}>
      {props.children}
    </AuthContext.Provider>
  )
}


