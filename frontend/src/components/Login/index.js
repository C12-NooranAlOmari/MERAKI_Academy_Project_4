import React, { useContext, useState } from 'react';
import { AppContext } from '../../App';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import './Login.css';

const LogIn = () => {
    const navigate = useNavigate();
    const { setToken, setisAdmin } = useContext(AppContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/users/login", { email, password })
            .then((res) => {
                setToken(res.data.token);
                localStorage.setItem('token', res.data.token);
                const isAdmin = res.data.isAdmin;
                setisAdmin(isAdmin);
                localStorage.setItem('isAdmin', isAdmin);
                navigate(isAdmin ? "/adminPanel" : "/");
            })
            .catch((err) => {
                setMessage(err.response.data.message);
            });
    };

    const handleGoogleLogin = (credentialResponse) => {
        const token = credentialResponse.credential;
        axios.post("http://localhost:5000/users/google-login", { idToken: token })
            .then((res) => {
                setToken(res.data.token);
                localStorage.setItem('token', res.data.token);
                const isAdmin = res.data.isAdmin;
                setisAdmin(isAdmin);
                localStorage.setItem('isAdmin', isAdmin);
                navigate(isAdmin ? "/adminPanel" : "/");
            })
            .catch((err) => {
                setMessage(err.response.data.message);
            });
    };

    return (
        <>
            <div className="form-container sign-in-container">
                <form>
                    <h1>Sign in</h1>
                    <p>Already have an account? sign in here!</p>

                    <div className="social-container">
                        <a href="#" className="social">
                            <i className="fab fa-facebook-f" />
                        </a>
                        
                        {/*Google Login بدون النص */}
                        <div className="google-login-button-wrapper">
                            <GoogleLogin
                                onSuccess={handleGoogleLogin}
                                onError={(error) => {
                                    console.error("Login Failed: ", error);
                                }}
                            />
                        </div>

                        <a href="#" className="social">
                            <i className="fab fa-linkedin-in" />
                        </a>
                    </div>

                    <span>or use your account</span>

                    <input
                        type='email'
                        placeholder='Email'
                        onChange={(e) => { setEmail(e.target.value) }}
                        className="input-field"
                    />

                    <input
                        type='password'
                        placeholder='Password'
                        onChange={(e) => { setPassword(e.target.value) }}
                        className="input-field"
                    />

                    <button onClick={handleLogin}>Sign in</button>

                    {message && <div className='message'>{message}</div>}
                </form>
            </div>
        </>
    );
}

export default LogIn;
