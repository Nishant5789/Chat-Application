import React, { useContext } from 'react'
import VideoCameraBackOutlinedIcon from '@mui/icons-material/VideoCameraBackOutlined';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import ReorderOutlinedIcon from '@mui/icons-material/ReorderOutlined';
import Messages from './Messages';
import Input from "./Input";
import { Chatcontext } from '../context/Chatcontext';

export default function Chat() {

  const {data} = useContext(Chatcontext);
  
  return (
    <div className='bg-blue-400 w-[46rem]'>
      <div className='flex items-center justify-between px-4 p-6 bg-purple-800'>
        <span  className='text-2xl  font-sans'>{data.user?.displayName}</span>
        <ul className='flex space-x-4'>
            <li className=''><VideoCameraBackOutlinedIcon/></li>
            <li className=''><PersonAddAlt1OutlinedIcon/></li>
            <li className=''><ReorderOutlinedIcon/></li>
        </ul>
      </div>
      <Messages/>
      <Input/>
    </div>
  )
}
