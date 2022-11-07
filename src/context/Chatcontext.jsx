import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./Authcontext";

export const  Chatcontext = createContext();

export const ChatcontextProvider = ({children}) => { 
    
    const {currentUser} = useContext(AuthContext);
    const INITIAL_STATE = {
        chatID: "null",
        user: {},
    }
    
    const chatReducer = (state, action)=>{
        switch(action.type){
            case "CHANGE_USER":
                const chat_id = currentUser.uid > action.payload.uid ? currentUser.uid+action.payload.uid : action.payload.uid+currentUser.uid;
                console.log("reducer",chat_id);
                return{
                    user: action.payload,
                    chatID: currentUser.uid > action.payload.uid ? currentUser.uid+action.payload.uid : action.payload.uid+currentUser.uid,
                }
            default :
            return state;
        }
    } 
    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

    return(
        <Chatcontext.Provider value={{data: state, dispatch}}>
            {children}
        </Chatcontext.Provider>
    )
};