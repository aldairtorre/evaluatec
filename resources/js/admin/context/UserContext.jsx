import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({children}) => {

    const [userAuthenticate, setUserAuthenticate] = useState({})

    return (
        <UserContext.Provider value={{
            userAuthenticate,
            setUserAuthenticate
        }}>
            {children}
        </UserContext.Provider>
    )
}