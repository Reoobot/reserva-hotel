import { createContext, useEffect, useState } from "react";
import axios from 'axios';


axios.defaults.withCredentials = true;

export const UserContext = createContext({});

export function UserContextProvider({children}){
    const [user,setUser] = useState(null);
    const [ready,setReady] = useState(false);
    useEffect(() => {
      axios.get('https://booking-sable-nine.vercel.app/api/user')
          .then(({data}) => {
              setUser(data);
              setReady(true);
              
          })
          .catch((error) => {
              console.error(error);
          });
  }, []);

  
    return(
  <UserContext.Provider value={{user,setUser,ready}}>
    {children}
  </UserContext.Provider>
    )
}



