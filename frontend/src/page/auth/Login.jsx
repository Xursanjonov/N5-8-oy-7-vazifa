// src/components/Login.js
import React, { useState } from 'react';
// import { useLoginMutation } from '../features/api/apiSlice';
import './login.css';

const Login = () => {
    const [username, setUsername] = useState('john14');
    const [password, setPassword] = useState('12345678');
    // const [login, { isLoading, isError, data }] = useLoginMutation();

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         await login({ username, password }).unwrap();
    //         alert('Login successful!');
    //     } catch (err) {
    //         console.error('Failed to login: ', err);
    //         alert('Login failed!');
    //     }
    // };

    return (
        <div className="login-container">
            <h1 className='h1'>Login</h1>
            <form>
                <div className="input-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button className='form-btn' type="submit">
                    Login{/* {isLoading ? 'Logging in...' : 'Login'} */}
                </button>
                {/* {isError && <p className="error">Login failed. Please try again.</p>} */}
            </form>
        </div>
    );
};

export default Login;
