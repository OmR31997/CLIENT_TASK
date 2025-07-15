import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BASE_API = import.meta.env.VITE_API;

const Login = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [token, setToken] = useState('');

  const loginAPI = async (userData) => {
    try {
      const resServer = await axios.post(`${BASE_API}/login`, userData);

      const data = resServer.data;

      setErrorMessage('');
      setSuccessMessage(data?.message);
      setToken(data?.token);

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.data));
    } catch (error) {
      setErrorMessage(error?.response?.data?.error || 'Something went wrong');
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const email = form.get('email');
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    loginAPI({ email, password });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-success mb-4">Login</h2>

      <form onSubmit={handleSubmit} className="mx-auto border p-4 rounded shadow" style={{ maxWidth: '400px' }}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" placeholder="Enter your email" required />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" placeholder="Enter password" required />
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" placeholder="Confirm password" required />
        </div>

        <div className="mb-3 text-end">
          <Link to={'/forgot-password'}>Forgot Password?</Link>
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-success">Login</button>
        </div>
      </form>

      <div id="result" className="mt-3">
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="alert alert-success" role="alert">
            {successMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
