import React, {useState} from 'react'
import './LoginSignup.css'
import Navbar from './Navbar'

const ForgotPassword = () => {
    const [email,setEmail]=useState('');
    const [showOtpInput, setShowOtpInput] = useState(false);
    const handleForgot=()=>{
        if(!email){
            alert("email can not be blank")
        }
        setShowOtpInput(true)
        // alert("sure to submit")

    }
  return (
    <div>  
     <Navbar/>
      <div className='container'>
      
          <div >
        
          <form className='inputs' onSubmit={handleForgot}>
          <div className='header'>
            <div className='text'><b>Forgot Password</b></div>
        </div>

            <div className='input'>
               
              <input type='email' id='email' placeholder='Enter Email' value={email}
              onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <div className='submit'>
            <div> <button type='submit'>Get OTP</button></div>


            {showOtpInput && (
          <div >
            <div className='input'>
            <input type="text" id="otp" name="otp" placeholder='Enter OTP'required />
            </div>
            <div className='submit'>
            <button type="submit">Verify</button>
            </div>
          </div>
        )}

        </div>
            </form>
            </div>

     </div> 
    </div>
    
  )
}

export default ForgotPassword
