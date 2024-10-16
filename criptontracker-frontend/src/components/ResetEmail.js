import React, {useState} from "react";
import { Link } from 'react-router-dom';
import "../style/Email.css"


const ResetEmail = () =>{
    const [isLoading, setIsLoading] = useState(false);

  const showSpinner = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('Password reset link has been sent to your email!');
    }, 2000); // Simulación de espera
  };

  return (
    <div className="row form-container">
      <h1>Forgot Password</h1>
      <h6 className="information-text">Enter your registered email to reset your password.</h6>
      <div className="form-group">
        <input type="email" name="user_email" id="user_email" />
        
        <button onClick={showSpinner} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'To Send'}
        </button>
      </div>
      <div className="footer">

        <h5>New here? <Link to="/Login"><a href="#">Sign Up.</a></Link></h5>
        <h5>Already have an account? <Link to="/Login"><a >Sign In.</a></Link></h5>
      </div>
    </div>
  );
};

export default ResetEmail