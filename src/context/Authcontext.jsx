import { createContext, useEffect, useState} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";


export const AuthContext = createContext();

export const AuthContextProvider = ({children})=>{ 
    const[currentUser, setCurrentuser] = useState({});
    useEffect(() => {
        const Unsub = onAuthStateChanged(auth, (user) => {
            console.log("here is useeffect");
            setCurrentuser(user); 
            console.log(user);
        });
        return()=>{
            Unsub();
        }
    }, []);
    return(
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    )
};