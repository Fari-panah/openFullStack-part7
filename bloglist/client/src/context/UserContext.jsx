import { createContext, useState } from 'react'

const UserContext = createContext()

export default UserContext

export const  UserContextProvider = (props) => {
  const [user, setUser] = useState(null)
  return(
    <userContext.provider value={{ user, setUser }}>
      {props.children}
    </userContext.provider>
  )

}