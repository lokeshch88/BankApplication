import React, { useState } from 'react';
import axios from 'axios';
import './LoginSignup.css';
import Navbar from './Navbar';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Validate the input 
  const validate = () => {
    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      alert("Password must contain at least one uppercase letter");
      return false;
    }
    if (!/[!@#$%^&*()_+?"{}><]/.test(password)) {
      alert("Password must contain at least one special character");
      return false;
    }
    if (!/[0-9]/.test(password)) {
      alert("Password must contain at least one number");
      return false;
    }
    return true;
  };

  
  const handleSignup = async (e) => {
    e.preventDefault();
    
    if (validate()) {
      try {
        const response = await axios.post('http://192.168.0.108:8080/users', {
          name,
          email,
          password,
        });
        setSuccessMessage("Signup successful! Please log in.");
        setError('');
      } catch (err) {
        if (err.response.status === 409) {
          setError("Email already used. Please try a different email.");
        } else {
          setError("Signup failed. Please try again.");
        }
        setSuccessMessage('');
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className='container'>
        <div>
          <form className='inputs' onSubmit={handleSignup}>
            <div className='header'>
              <div className='text'><b>Sign Up</b></div>
            </div>
            <div className='input'>
              <input 
                type='text'
                placeholder='Enter Name' 
                id='name' 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className='input'>
              <input 
                type='email' 
                placeholder='Enter Email' 
                id='email' 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className='input'>
              <input 
                type='password' 
                placeholder='Enter Password' 
                id='password' 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className='text2'>
              Already have an account? <a href='/login'>Login</a>
            </div>
            <div className='submit'>
              <button type='submit'>Sign Up</button>
            </div>
            {error && <div className='error'>{error}</div>}
            {successMessage && <div className='success'>{successMessage}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
