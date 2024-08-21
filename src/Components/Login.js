import React, { useState } from 'react';
import axios from 'axios';
import './LoginSignup.css';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://192.168.0.108:8080/users/login', {
        email,
        password
      });

      
      const user = response.data;
      localStorage.setItem('user', JSON.stringify(user));

      localStorage.setItem('userEmail', email);

     
      setSuccessMessage("Login successful!");
      setError('');
      navigate('/welcome'); 
    } catch (err) {
      
      setError("Invalid email or password. Please try again.");
      setSuccessMessage('');
    }
  };

  return (
    <div>
      <Navbar />
      <div className='container'>
        <div>
          <form className='inputs' onSubmit={handleLogin}>
            <div className='header'>
              <div className='text'><b>Log in</b></div>
            </div>
            <div className='input'>
              <input
                type='email'
                id='email'
                placeholder='Enter Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className='input'>
              <input
                type='password'
                id='password'
                placeholder='Enter Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className='text2'>
              Don't have an account? <a href='/signup'>Sign up</a>
            </div>
            <div className='text2'>
              <a href='/forgotpasword'>Forgot password?</a>
            </div>
            <div className='submit'>
              <button type='submit'>Log in</button>
            </div>
            {error && <div className='error'>{error}</div>}
            {successMessage && <div className='success'>{successMessage}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
