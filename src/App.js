import {
  BrowserRouter,Route,Routes,
 } from "react-router-dom";
import { Login } from "./pages/login/Login";
import { Register } from "./pages/register/Register";
import { Home } from "./pages/home/Home";
import { UserExp } from "./pages/userexp/UserExp";
import { Roomreg } from "./pages/room/Roomreg";

function App() {
  return (
    <div className="App">
      
 <BrowserRouter>
  <Routes>
  <Route path="/" element={<Home/>} />
  <Route path="/user/:userId" element={<UserExp/>} />
  <Route path="/roomreg" element={<Roomreg/>} />
   <Route path="/login" element={<Login/>}/>
   <Route path="/register" element={<Register/>}/>
  </Routes>
 </BrowserRouter>
    
    </div>
  );
}

export default App;
