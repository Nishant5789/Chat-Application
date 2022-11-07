import React, { useContext, useEffect, useReducer, useState } from 'react'
import { AuthContext } from '../context/Authcontext';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';

import { Chatcontext } from '../context/Chatcontext';

export default function Chats() {

    const [chats, setChats] = useState([]);
    const {currentUser} = useContext(AuthContext);
    const {dispatch} = useContext(Chatcontext);

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userchats", currentUser.uid), (doc) => {
                // console.log("chats update",doc.data());
                setChats(doc.data());
            });        
            return () => {
                unsub();
            };
        }
        currentUser.uid && getChats();
    }, [currentUser.uid]);
    // console.log(chats);
    console.log(Object.entries(chats));

    const handleSelect = (user) => {
      console.log("search on click",user);
      dispatch({type:"CHANGE_USER", payload:user});
    }
  
  return (
    <div>
        {
         Object.entries(chats)?.sort((a,b)=>b[1].date-a[1].date).map((chat)=>(
        <div className='flex space-x-6 items-center mx-6 pb-2 text-white' key={chat[0]} onClick={()=>handleSelect(chat[1].userInfo)}>
          <img src={chat[1].userInfo.photoURL} alt="No Found" className='object-cover h-14 rounded-sm' />
          <ul className='flex-col space-y-1'>
              <li className='text-md font-semibold'>{chat[1].userInfo.displayName}</li>
              <li className='text-sm'>{chat[1].lastMessage}</li>
          </ul>
        </div>
          ))
        } 
    </div>
  )
}
