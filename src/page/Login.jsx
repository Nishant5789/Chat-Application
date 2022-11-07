import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login(){
  {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    const handlesubmit = async (e)=> {
      e.preventDefault();
      try{
         await signInWithEmailAndPassword(auth, email, password)
          navigate('/');
      }
      catch(err)
      {
          setError(true);
          console.log(err.message);
      }
    }
    return (
      <div className="login flex w-screen min-h-screen justify-center bg-purple-200 items-center">
        <div className="cart flex  shadow-black shadow-lg">

            <div className="left flex-col px-6 pt-6 space-y-4 pb-8 bg-gradient-to-r from-sky-500 to-indigo-500">
                <h1 className="font-bold capitalize w-60 text-left text-white text-5xl"> hello world. </h1>
                <p className="w-60 font-semibold text-white text-sm" >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis laudantium non ipsa omnis vel temporibus necessitatibus obcaecati soluta . 
                </p>
                <span className="font-semibold mt-4 text-white text-lg">Don't have an account</span>
                <div>
                <Link to="/register">
                <button className=" bg-white capitalize py-2 px-4 font-bold 
                hover:bg-slate-100 active:bg-slate-200 rounded-md active:border-4 
                active:-m-[4px] active:border-stone-500">Register</button>
                </Link>
                </div>
            </div>

            <div className="right bg-white flex-col space-y-4 px-5 pt-5 w-72">
            <h1 className="text-3xl font-sans font-bold">Login</h1>
            <form className="flex-col space-y-8" onSubmit={handlesubmit}> 
                <input type="text" placeholder="Username" onChange={(e)=>setEmail(e.target.value)}  className="border-b-2 min-w-fit border-black outline-none cursor-pointer"/>
                <input type="text" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}  className="border-b-2 min-w-fit border-black outline-none cursor-pointer"/>
                {error && <span className='text-red-500'>Entered Detail Are Invalid</span>}
                <button className="bg-purple-600 text-white rounded-md capitalize py-2 px-4
                 font-bold hover:bg-purple-700 active:bg-purple-400" >Login</button>
            </form>
            </div>
    
            
        </div>
      </div>
    )
  }
}


