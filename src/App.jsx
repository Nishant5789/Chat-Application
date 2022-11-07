
import './index.css';
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Home from './page/Home';
import Login from './page/Login';
import Register from './page/Register';
import { AuthContext } from './context/Authcontext';
import { useContext } from 'react';

function App() {
  
  const {currentUser} = useContext(AuthContext);

  const ProtectdRoute = ({children}) =>{
    console.log("here is route");
    console.log(currentUser);
        if(!currentUser)
          return <Navigate to='/login'/>

        return children;
    }
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/'>
          <Route index element={<ProtectdRoute><Home/></ProtectdRoute>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="register" element={<Register/>}/>
        </Route>
    </Routes>
    </BrowserRouter>
  );
}
export default App;
