import React, { useState } from 'react';
import axios from 'axios';
import './LoginSignup.css';
import Navbar from './Navbar';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const email = localStorage.getItem('userEmail');

  // Validate 
  const validate = () => {
    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters");
      return false;
    }
    if (!/[A-Z]/.test(newPassword)) {
      alert("Password must contain at least one uppercase letter");
      return false;
    }
    if (!/[!@#$%^&*()_+?"{}><]/.test(newPassword)) {
      alert("Password must contain at least one special character");
      return false;
    }
    if (!/[0-9]/.test(newPassword)) {
      alert("Password must contain at least one number");
      return false;
    }
    return true;
  };

  
  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (validate()) {
      try {
        const response = await axios.post(
          'http://192.168.0.108:8080/users/reset-password',
          { email, newPassword }
        );
        setSuccessMessage("Password reset successful.");
        setError('');
      } catch (err) {
        setError("Reset failed. Please try again.");
        setSuccessMessage('');
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className='container'>
        <form className='inputs' onSubmit={handleResetPassword}>
          <div className='header'>
            <div className='text'><b>Reset Password</b></div>
          </div>
          <div className='input'>
            <input 
              type='password'
              placeholder='Enter New Password'
              id='newPassword'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className='submit'>
            <button type='submit'>Reset</button>
          </div>
          {error && <div className='error'>{error}</div>}
          {successMessage && <div className='success'>{successMessage}</div>}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
