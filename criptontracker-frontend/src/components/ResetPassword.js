import React, { useState } from "react";
import "../style/Password.css";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordReset = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match!");
        setSuccessMessage("");
      } else {
        setErrorMessage("");
        setSuccessMessage("Your password has been successfully reset!");
      }
    }, 2000); // Simulación de espera
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
          {isLoading ? 'Loading...' : 'Reset Password'}
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
