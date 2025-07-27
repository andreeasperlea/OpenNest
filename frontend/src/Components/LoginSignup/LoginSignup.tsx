import React, { useState } from 'react';
import './LoginSignup.css';
import userIcon from '../Assets/user.png';
import emailIcon from '../Assets/envelope.png';
import passwordIcon from '../Assets/key.png';
import {useNavigate} from "react-router-dom";

const LoginSignup: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState<boolean>(true);
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate=useNavigate()

  const toggleForm = (): void => setIsSignUp(!isSignUp);

  const handleSubmit = async () => {
    const endpoint = isSignUp ? 'signup' : 'sign-in';
    const url = `http://localhost:8000/${endpoint}`;

    const body = isSignUp
      ? { username, email, password }
      : { email, password };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials:'include',
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Something went wrong');

      console.log('Success:', data);
      alert(`Success: ${isSignUp ? 'Signed up' : 'Signed in'}`);
      if(!isSignUp) {
        navigate('/dashboard')
      }
    } catch (err: any) {
      console.error('Error:', err.message);
      alert(`Error: ${err.message}`);
    }
  };

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

        {isSignUp && (
          <div className="input-field">
            <img src={userIcon} alt="user" />
            <input
              type="text"
              placeholder="Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        )}
        <div className="input-field">
          <img src={emailIcon} alt="email" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-field">
          <img src={passwordIcon} alt="password" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button onClick={handleSubmit} className="sign-up-btn">
          {isSignUp ? 'SIGN UP' : 'SIGN IN'}
        </button>
      </div>
    </div>
  );
};

export default LoginSignup;
