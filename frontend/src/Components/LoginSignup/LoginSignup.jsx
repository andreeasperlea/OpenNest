import React, { useState } from 'react';
import './LoginSignup.css';
import userIcon from '../Assets/user.png';
import emailIcon from '../Assets/envelope.png';
import passwordIcon from '../Assets/key.png';

const LoginSignup = () => {
    const [isSignUp, setIsSignUp] = useState(true);

    const toggleForm = () => setIsSignUp(!isSignUp);

    return (
        <div className={`container ${isSignUp ? 'sign-up-mode' : ''}`}>
            <div className="left-panel">
                <h2>{isSignUp ? 'Welcome back to OpenNest!' : 'Welcome to OpenNest!'}</h2>
                <p>
                    {isSignUp
                        ? 'To keep connected with us please login with your personal info'
                        : 'Enter your personal details and start your journey with us'}
                </p>
                <button onClick={toggleForm} className="sign-in-btn">
                    {isSignUp ? 'SIGN IN' : 'SIGN UP'}
                </button>
            </div>

            <div className="right-panel">
                <h2>{isSignUp ? 'Create Account' : 'Sign In'}</h2>
                <p className="alt-text">
                    Enter your credentials for {isSignUp ? 'registration' : 'login'}:
                </p>

                <div className="input-field">
                    <img src={userIcon} alt="user" />
                    <input type="text" placeholder="Name" />
                </div>
                <div className="input-field">
                    <img src={emailIcon} alt="email" />
                    <input type="email" placeholder="Email" />
                </div>
                <div className="input-field">
                    <img src={passwordIcon} alt="password" />
                    <input type="password" placeholder="Password" />
                </div>

                <button className="sign-up-btn">
                    {isSignUp ? 'SIGN UP' : 'SIGN IN'}
                </button>
            </div>
        </div>
    );
};

export default LoginSignup;
