import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
    const BASE_API = import.meta.env.VITE_API;
    const { token } = useParams();
    const navigate = useNavigate();
    const [isTokenValid, setIsTokenValid] = useState(false);
    const [error, setError] = useState({ password: '', confirmPassword: '', message: '' });
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const tokenInspection = async () => {
            try {
                const resServer = await axios.post(`${BASE_API}/verify-token/${token}`);
                if (resServer.data.message === 'Token is valid') {
                    setIsTokenValid(true);
                }
            } catch (error) {
                setError((prev) => ({ ...prev, message: 'Invalid or expired token' }));
                console.log(error.message);
            }
        };
        tokenInspection();
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const privateCode = /^(?!.*(<|>|script|alert|console|onerror|onload|javascript:)).*$/i;
        const formData = new FormData(e.target);
        const { password, confirmPassword } = Object.fromEntries(formData);

        if (password === '') {
            setError((prev) => ({ ...prev, password: 'Password is required' }));
            return;
        }
        else if (!privateCode.test(password)) {
            setError((prev) => ({ ...prev, password: 'Malicious code detected. Please do not submit such code.' }));
            return;
        }


        if (confirmPassword === '') {
            setError((prev) => ({ ...prev, confirmPassword: 'Confirm Password is required' }));
            return;
        }
        else if (password !== confirmPassword) {
            setError((prev) => ({ ...prev, confirmPassword: 'Password do not match' }))
            return;
        }

        try {
            await axios.post(`${BASE_API}/reset-password/${token}`, {
                password,
                confirm_password: confirmPassword
            });

            setSuccess("Password reset successfully! Redirecting to login...");
            setError({ password: '', confirmPassword: '', message: '' });
            setTimeout(() => navigate("/login"), 2000);

        } catch (error) {
            setError((prev) => ({ ...prev, message: 'Failed to update password' }));
            console.log(error.message);
        }
    };

    if (!isTokenValid) {
        return (
            <div className="min-h-screen flex items-center justify-center text-red-500">
                <p>{error.message || "Checking token..."}</p>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit} className="mx-auto border p-4 rounded shadow" style={{ maxWidth: '400px' }}>
                <h2 className="text-center text-success mb-4">Reset Password</h2>

                {error.message && <p className="text-red-500 text-center mb-2">{error.message}</p>}
                {success && <p className="text-green-500 text-center mb-2">{success}</p>}

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" placeholder="Enter password" required />
                    {(error && error.password) && (<p className='text-red-600'>{error.password}</p>)}
                </div>

                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Password</label>
                    <input type="text" className="form-control" id="confirmPassword" name="confirmPassword" placeholder="Enter password" required />
                    {(error && error.confirmPassword) && (<p className='text-red-600'>{error.confirmPassword}</p>)}
                </div>

                <button type="submit" className="btn btn-success">Update Password</button>

                <div className="text-center mt-4">
                    <Link to="/login" className="text-info">Back to Login</Link>
                </div>
            </form>
        </div>
    );
};

export default ResetPassword;
