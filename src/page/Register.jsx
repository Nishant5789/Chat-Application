import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import { auth, storage, db } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile  } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register(){
    {
      const [displayName, setdisplayName] = useState('');
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [file, setFile] = useState(null);
      const [error, setError] = useState(false);
      const [errorText, seterrorText] = useState('');

      const navigate = useNavigate();

      const handlesubmit = async (e)=> {
        e.preventDefault();
        try{
          const res = await createUserWithEmailAndPassword(auth, email, password);
          // here res is equal to  UserCredential
          const storageRef = ref(storage, displayName);
          const uploadTask = uploadBytesResumable(storageRef, file);
          // console.log(res);
          seterrorText('');

          uploadTask.on( 
          (error) => {
              console.log(error);
          }, 
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then( (downloadURL)=>{
              console.log(downloadURL);
               updateProfile(res.user, {
                displayName,
                photoURL: downloadURL
              });
               setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid, 
                displayName,
                photoURL: downloadURL,
                email
              });
               setDoc(doc(db, "userchats", res.user.uid), {}
               );
               navigate('/');
            });
          }
        );
        console.log(res);
        }
        catch(err)
        {
            setError(true);
            seterrorText(err.message);
            console.log(err.message);
        }
      }
      return (
        <div className="login flex w-screen min-h-screen justify-center bg-cyan-400 items-center">
          <div className="cart flex  shadow-black shadow-lg">
              <div className="right bg-white flex-col space-y-4 pb-6 px-5 pt-5 w-72">
              <h1 className="text-3xl font-sans font-bold">Register</h1>
              <form className="flex-col space-y-8 " onSubmit={handlesubmit}> 
                  <input type="text" placeholder="Name"     onChange={(e)=>setdisplayName(e.target.value)} 
                    className="border-b-2 min-w-fit border-black outline-none cursor-pointer"/>
                  <input type="text" placeholder="Email"    onChange={(e)=>setEmail(e.target.value)}  
                   className="border-b-2 min-w-fit border-black outline-none cursor-pointer"/>
                  <input type="text" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}  
                   className="border-b-2 min-w-fit border-black outline-none cursor-pointer"/>
                  <div>
                  <input type="file" id="file" className="hidden" onChange={(e)=>{console.log(e.target.files[0]);setFile(e.target.files)}}  />
                  <label htmlFor="file" className='flex items-center font-sans font-semibold'
                  onChange={(e)=>{
                    // console.log(e.target.file);
                    setFile(e.target.files[0]);
                    }}>
                  <AddPhotoAlternateOutlinedIcon/>   &nbsp; Add an Avatar</label>
                  {error && <span className='text-red-500'>Entered Detail Are Invalid</span>}
                  </div>
                  <button className="bg-purple-600 text-white rounded-md capitalize py-2 px-4
                   font-bold hover:bg-purple-700 active:bg-purple-400">Register</button>
              </form>
              </div> 
              <div className="left flex-col px-6 pt-6 space-y-4 pb-8 bg-gradient-to-r from-sky-500 to-indigo-700">
                  <h1 className="font-bold capitalize w-60 text-left text-white text-5xl">lama tech </h1>
                  <p className="w-60 font-semibold text-white text-sm" >
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                      Blanditiis laudantium non ipsa omnis vel temporibus necessitatibus
                      obcaecati soluta . 
                  </p>
                  <span className="font-semibold mt-4 text-white text-lg">Do you have an account</span>
                  <div>
                  <Link to='/login'>
                  <button  className=" bg-white capitalize py-2 px-4 font-bold 
                  hover:bg-slate-100 active:bg-slate-200 rounded-md active:border-4
                   active:-m-[4px] active:border-stone-500">Login</button>
                  </Link>
                  </div>
              </div>
          </div>
        </div>
      )
    }
  }
  
  
  