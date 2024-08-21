import React from 'react';
import './Welcome.css'; 
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  const navigate=useNavigate();

    const handleResetPass=()=>{
      navigate('/reset-pass');
    }
    const handleLogout=()=>{
      localStorage.removeItem('user'); 
      localStorage.removeItem('userEmail'); 
      navigate('/login');
      
    }

    const handleLogin=()=>{
      navigate('/login');
    }

  return (
    <div>
      <Navbar />
      <div className='welcome'>
        {user ? (
          <h1>Welcome, {user.name}!</h1> 
        ) : (
          <h1>Log in first!</h1>
        )}

       <div>
       {user ? (
        <div>
        <button onClick={handleResetPass}>Reset Password</button>
        <button onClick={handleLogout}>Logout</button> 
        </div>
        ):(<button onClick={handleLogin}>Login</button>)}

       </div>
      </div>
      
    </div>
  );
};

export default Welcome;
