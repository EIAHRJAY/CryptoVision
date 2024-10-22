import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "../style/Email.css";

const ResetEmail = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  const sendResetLink = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${apiUrl}/generate_reset_token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),  // Enviamos el email al backend
      });

      const data = await response.json();
      setIsLoading(false);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send reset link');
      }

      setSuccessMessage('Password reset link has been sent to your email!');
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.message);
      setSuccessMessage("");
      setIsLoading(false);
    }
  };

  return (
    <div className="row form-container">
      <h1>Forgot Password</h1>
      <h6 className="information-text">Enter your registered email to reset your password.</h6>
      <div className="form-group">
        <input
          type="email"
          name="user_email"
          id="user_email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        {errorMessage && <p className="error">{errorMessage}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
        <button onClick={sendResetLink} disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </div>
      <div className="footer">
        <h5>New here? <Link to="/Login">Sign Up.</Link></h5>
        <h5>Already have an account? <Link to="/Login">Sign In.</Link></h5>
      </div>
    </div>
  );
};

export default ResetEmail;
