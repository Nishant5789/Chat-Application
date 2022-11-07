import { useRef } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/Authcontext";
import { Chatcontext } from "../context/Chatcontext";

export default function Message(message) {
  console.log("final");
  console.log(message);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(Chatcontext);
  const ref = useRef();

  useEffect(()=>{
    ref.current?.scrollIntoView({behaviour:"smooth"});
  }, [message]);


  console.log(message.message.text);

  return (
    <div>
      <div class="flex space-x-4 items-center" className={`message ${message.message.senderID === currentUser.uid && "owner"}`}>
        <div className="p-2 flex-col space-y-2">
          <img
            src={message.message.senderID === currentUser.uid ? currentUser.photoURL:data.user.photoURL}
            alt="No found"
            className="object-cover h-12 rounded-sm" />
          <span>just now</span>
        </div>
        <div>
          <div className="inline-flex inset-0 bg-purple-700 rounded-tr-xl
          rounded-bl-xl rounded-br-xl p-2 max-w-md font-semibold text-lg text-white font-mono">{message.message.text}</div>
        </div>
        {
          message.img &&
          <img src={message.message.photourl} alt="No found" className="p-3 object-cover h-48" />
        }
      </div>
    </div>
  );
}
