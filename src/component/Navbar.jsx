import React, { useContext } from 'react';
import {signOut} from 'firebase/auth';
import { auth } from '../firebase';
import { AuthContext } from '../context/Authcontext';

export default function Navbar() {

  const {currentUser} = useContext(AuthContext);
  console.log(currentUser.photoURL);

  return (
    <div className='bg-indigo-700 flex items-center space-x-3'>
      <span className='text-2xl p-2  font-semibold font-sans text-white'>Tech chat</span>
      <div className='flex space-x-2 p-3 items-center'>
      <img src={currentUser.photoURL} alt="" className='object-cover h-14 rounded-sm'/>
        <span className='font-md text-white font-sans'>{currentUser.displayName}</span>
        <button className='px-2 py-1 text-lg rounded-md bg-cyan-500' onClick={()=>signOut(auth)}>logout</button>
      </div>
    </div>
  )
}
