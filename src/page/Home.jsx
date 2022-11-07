import Sidebar from "../component/Sidebar"
import Chat from "../component/Chat"

export default function Home() {
  return (
    <div className="flex w-screen bg-fuchsia-700 h-screen items-center justify-center">
    <div className="flex  h-[36rem] shadow-2xl shadow-stone-800">
      <Sidebar/>
      <Chat/>
    </div>
    </div>
  )
}
