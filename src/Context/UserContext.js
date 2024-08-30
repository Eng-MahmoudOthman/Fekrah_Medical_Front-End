import { createContext , useState } from "react";



export let UserContext = createContext();


export default function UserContextProvider(props){


   const [loggedUser , setLoggedUser] = useState("") ;
   const [admin , setAdmin] = useState(false) ;
   const [moderator , setModerator] = useState(false) ;
   const [userToken , setUserToken] = useState("") ;
   const [error , setError] = useState(null) ;
   const [loading , setLoading] = useState(false)



   return (
      <>
         <UserContext.Provider value={{loggedUser , setLoggedUser , userToken , setUserToken , admin , setAdmin , moderator , setModerator  , error , setError , loading , setLoading }}>
            {props.children}
         </UserContext.Provider>
      </>
   )
}