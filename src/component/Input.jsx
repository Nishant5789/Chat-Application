import React, { useContext, useState } from 'react'
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import { AuthContext } from '../context/Authcontext';
import { Chatcontext } from '../context/Chatcontext';
import { arrayUnion, updateDoc, Timestamp, doc, serverTimestamp} from 'firebase/firestore';
import {  storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuid } from 'uuid';

export default function Input() {
  const [text, setText] = useState('');
  const [img, setImg] = useState(null);

  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(Chatcontext);

  const handlesend = async ()=>{
      
    if(img)
    {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on( 
        (error) => {
            console.log(error);
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then( (downloadURL)=>{
            updateDoc(doc(db, "chats", data.chatID),{
              messages: arrayUnion({
                  id: uuid(),
                  text,
                  senderID: currentUser.uid,
                  date: Timestamp.now(),
                  img: downloadURL,
              }),
            })
          });
        }
      );
    }
    else{
      updateDoc(doc(db, "chats", data.chatID),{
        messages: arrayUnion({
            id: uuid(),
            senderID: currentUser.uid, 
            date: Timestamp.now(),
            text,
        }),
      })
    }

    await updateDoc(doc(db, "userchats", currentUser.uid),{
      [data.chatID + ".lastMessage"]: text,
      [data.chatID + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userchats", data.user.uid),{
      [data.chatID + ".lastMessage"]: text,
      [data.chatID + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  }

  return (
    <div className='flex bg-slate-100  spacex-2'>
      <input type="text" className='placeholder:text-xl border-none w-[56rem]  cursor-pointer font-sans font-semibold
       p-2 outline-none  placeholder:p-6' onChange={(e)=>setText(e.target.value)} placeholder='Type Something..' />
      <div className='flex items-center space-x-4 py-2 px-6'>
            <AttachFileOutlinedIcon/>
            <input type="file" className='hidden' id='file' onChange={(e)=>setImg(e.target.files[0])}/>
            <label htmlFor="file">
            <AddAPhotoOutlinedIcon/>
            </label>
            <button onClick={handlesend} className='px-2 py-1 text-lg rounded-md bg-cyan-500'>send</button>
      </div>
    </div>
  )
}
