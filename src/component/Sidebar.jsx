import Navbar from '../component/Navbar';
import React from 'react';
import Search from './Search';
import Chats from "./Chats";

export default function Sidebar() {
  return (
    <div className='w-[24rem] bg-indigo-500'>
        <Navbar/>
        <Search/>
        <Chats/>
    </div>
  )
}
