import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../style/Password.css";

const ResetPassword = ({ token }) => {
 
  const navigate = useNavigate();  // Para redireccionar después del éxito
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  const handlePasswordReset = async () => {
    setIsLoading(true);

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/reset_password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          reset_token: token, new_password: password }),  // Enviamos token y nueva contraseña
        });
       
        
        const data = await response.json();
      setIsLoading(false);

      if (!response.ok) {
        throw new Error(data.message || 'Password reset failed');
      }

      setSuccessMessage("Your password has been successfully reset!");
      setErrorMessage("");

      // Redirigir a la página de inicio de sesión después de unos segundos
      setTimeout(() => {
        navigate('/Login');
      }, 2000);

    } catch (error) {
      setErrorMessage(error.message);
      setSuccessMessage("");
      setIsLoading(false);
    }
  };

  return (
    <div className="row form-container">
      <h1>Reset Password</h1>
      <h6 className="information-text">Enter your new password below.</h6>
      <div className="form-group">
        <input
          type="password"
          name="password"
          id="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          name="confirm_password"
          id="confirm_password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {errorMessage && <p className="error">{errorMessage}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
        <button onClick={handlePasswordReset} disabled={isLoading}>
          {isLoading ? 'Resetting...' : 'Reset Password'}
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
