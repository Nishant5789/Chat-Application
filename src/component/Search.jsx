import React, { useContext, useState } from 'react';
import { collection, query, where, setDoc, getDocs, getDoc,  serverTimestamp, doc, updateDoc } from "firebase/firestore";
import { db } from '../firebase';
import { AuthContext } from '../context/Authcontext';


export default function Search() {
  const [userName, setUserName] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  
  const {currentUser} = useContext(AuthContext);

  const handlesearch = async ()=>{
    const q = await query(collection(db, "users"), where("displayName", "==", userName));
    try{
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
        console.log(doc.data());
      });
      setError(false);
    }
    catch(err){
      console.log("here");
      setError(true);
    }
  }
  const handleSelect = async ()=>{
    // console.log("here2");
    // console.log(currentUser.uid);
    // console.log(user.uid);

    const combinedID = currentUser.uid > user.uid ? currentUser.uid+user.uid : user.uid+currentUser.uid;
    // console.log(combinedID);
    try{
      const res = await getDoc(doc(db, "chats", combinedID));
      if(!res.exists())
      {
        console.log("here3");
        setDoc(doc(db, "chats", combinedID),{ 
          messages: [],
        });
        await updateDoc(doc(db, "userchats", user.uid ),{
          [combinedID+".userInfo"]:{
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL
          },
          [combinedID+'.date']: serverTimestamp()
        })

        await updateDoc(doc(db, "userchats", currentUser.uid),{
          [combinedID+".userInfo"]:{
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
          },
          [combinedID+'.date']: serverTimestamp()
        })
      }
    }
    catch(err){      
      console.log(err);
    }
    setUser(null);
    setUserName('');
  }

  const handlekey= (e)=>{
    e.code==="Enter" && handlesearch();
  }

  return (
    <div className='bg-indigo-500'>
      <div className='p-3'>
        <input type="text" placeholder='Find User' onKeyDown={handlekey} value={userName}
         onChange={(e)=>setUserName(e.target.value)} className='p-2 w-auto bg-indigo-500
        rounded-md border-2 border-stone-700 placeholder:text-white placeholder:text-bold 
        placeholder:text-xl outline-none'/>
      </div>
      {error && <h1 className='p-3 text-xl text-white font-semibold'>NO user Found</h1> }

      { 
        user && <div className='flex space-x-6 items-center mx-6 pb-1 border-b-2 border-stone-400 text-white'
                 onClick={handleSelect} >
        <img src={user.photoURL} alt="No Found" className='object-cover h-14 rounded-sm'/>
        <ul className='flex-col space-y-1'>
            <li className='text-md font-semibold'>{user.displayName}</li>
            {/* <li className='text-sm'>{user.lastname}</li> */}
        </ul>
        </div>
      }
      </div>
   
  )
}
