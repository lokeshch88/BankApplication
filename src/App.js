
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';

import Signup from './Components/Signup';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import Welcome from './Components/Welcome';
import ForgotPassword from './Components/ForgotPassword';
import AdminPage from './Components/AdminPage'
import ResetPassword from './Components/ResetPassword';

function App() {
  return (
    <div >
     
      <Router>
       <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/welcome" element={<Welcome/>}/>
        <Route path="/forgotpasword" element={<ForgotPassword/>}/>
        <Route path="/admin" element={<AdminPage/>}/>

        <Route path="/reset-pass" element={<ResetPassword/>}/>

       </Routes>
      </Router>
      
    
    </div>
  );
}

export default App;
