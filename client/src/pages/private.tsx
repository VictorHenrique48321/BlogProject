import axios from "axios"
import { useEffect } from "react"


const PrivateRoute = () => {

  

  useEffect(() => {
    const verifyToken = () => {
      
      const URL = "http://localhost:5000/user/631b6a0a2a5a96318549ac0a"

      axios({
        method: "get",
        url: URL,
        withCredentials: true
      }).then((response) => {
        console.log(response)
      }).catch((response) =>  {
        console.log(response)
      })
    }

    verifyToken()
  })

  return (
    <div>ola</div>
  )
}

export default PrivateRoute