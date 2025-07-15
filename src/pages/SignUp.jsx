import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BASE_API = import.meta.env.VITE_API;

const SignUp = () => {
    const [formData, setFormData] = useState({
        f_name: '',
        l_name: '',
        email: '',
        password: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const registerAPI = async () =>{
        try {
            const response = await axios.post(`${BASE_API}/signup`, formData);
            const data = response.data;

            setErrorMessage('');
            setSuccessMessage(data?.message);
        } catch (err) {
            setErrorMessage(error?.response?.data?.error || 'Something went wrong');
            console.error(error);
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        registerAPI();
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center text-success mb-4">Registration</h2>

            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="f_name" className="form-label">First Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="f_name"
                            name="f_name"
                            value={formData.f_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="l_name" className="form-label">Last Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="l_name"
                            name="l_name"
                            value={formData.l_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="text-center">
                    <button type="submit" className="btn btn-success px-4">Submit</button>
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

export default SignUp;
