import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const BASE_API = import.meta.env.VITE_API;
  const [email, setEmail] = useState('');
  const [resultMessage, setResultMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_API}/forgot-password`, { email: email.trim() });

      setIsSuccess(true);
      setResultMessage(response.data.message || 'Reset link sent successfully.');
      setEmail('');
    } catch (error) {
      setIsSuccess(false);
      const errMsg = error.response?.data?.error || 'Failed to send reset link.';
      setResultMessage(errMsg);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-success mb-4">Forgot Password</h2>

      <form onSubmit={handleSubmit} className="mx-auto border p-4 rounded shadow-sm" style={{ maxWidth: '400px' }}>
        <div className="mb-3">
          <label htmlFor="forgotEmail" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="forgotEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-success">Send Reset Link</button>
        </div>
      </form>

      {resultMessage && (
        <div className={`alert mt-3 ${isSuccess ? 'alert-success' : 'alert-danger'}`} role="alert">
          {resultMessage}
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
