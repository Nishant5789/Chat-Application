import { onSnapshot, doc } from 'firebase/firestore';
import  { useContext, useEffect, useState } from 'react';
import { Chatcontext } from '../context/Chatcontext';
import { db } from "../firebase";
import Message from './Message';

export default function Messages() {

  const [messages, setMessages] = useState([]);
  const {data} = useContext(Chatcontext);

  useEffect(()=>{
    console.log("in",data.chatID);
    const unsub = onSnapshot(doc(db, "chats", data.chatID),(doc)=>{
      // console.log(doc.data().messages);
      setMessages(doc.data().messages);
    })
    return ()=>{
      unsub();
    }
    
  }, [data.chatID])

  // console.log(messages);

  return (
    <div className='h-[27.8rem] overflow-scroll overflow-x-hidden'>
    { 
        messages.map((m)=>(<Message message={m} key={m?.id}/>))
    }
    </div>
  )
}
