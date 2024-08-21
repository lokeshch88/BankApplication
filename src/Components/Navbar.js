import React from 'react'
import './Navbar.css';
import Logo from '../images/logo2.png'
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
    const navigate=useNavigate();

    const handleLogin=()=>{
      navigate('/login');
    }

  return (
    <div>
        <div className="navbar-top">
    <div className="navbar-container">
    <div className="navbar-logo">
      <a href='/'><img src={Logo} alt="Bank logo"/></a>
        
      </div>
      <div className="navbar-links">
      <a href="/">Home</a>
      <a href="#services">About Us</a>
      <a href="#about">Locate Us</a>
      <a href="#about">Careers</a>
      <a href="#contact">Contact Us</a>
    </div>


      <form className="navbar-search" >
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
      <button className="login-button" onClick={handleLogin}>
        Login
      </button>
    </div>
  </div>
  {/* <div className="navbar-bottom">
    <div className='navbar-container'>
    <div className="navbar-logo">
        <img src={Logo} alt="Bank of Maharashtra" />
      </div>
      <div className="navbar-container">
      
      <div className="navbar-links">
      <a href="/">Personal</a>
      <a href="#services">Corporate</a>
      <a href="#about">MSME </a>
      <a href="#about">Agriulture</a>
    </div>
 
</div>

    </div>
      
  </div> */}
  
</div>
    
  )
}

export default Navbar
