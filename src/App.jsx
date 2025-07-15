import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import SignUp from './pages/SignUp';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path='/register' element={<SignUp />} />
        <Route path='forgot-password' element={<ForgotPassword />} />
        <Route path="*" element={<h3 className="text-center mt-5 text-danger">404 - Page Not Found</h3>} />
      </Routes>
    </Router>
  );
};

export default App;
