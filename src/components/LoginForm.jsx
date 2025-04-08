import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Form = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/login', { email, password });

      if (res.status === 200) {
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setLoginSuccess(true);
        setLoginError('');

        setTimeout(() => {
          navigate('/dashboard');
        }, 1500); // short delay before redirect
      }
    } catch (err) {
      console.error(err);
      setLoginError('Login failed. Please check your credentials.');
      setLoginSuccess(false);
    }
  };

  return (
    <StyledWrapper>
      <div className="container">
        <div className="heading">Sign In</div>
        <form className="form" onSubmit={handleSubmit}>
          <input
            required
            className="input"
            type="email"
            name="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            required
            className="input"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="forgot-password">
            <a href="#">Forgot Password ?</a>
          </span>
          <input className="login-button" type="submit" value="Sign In" />
        </form>
        {loginSuccess && <div className="fade-message success">Login successful! Redirecting...</div>}
        {loginError && <div className="fade-message error">{loginError}</div>}

        <div className="signup-redirect">
          New here? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  font-family: 'Segoe UI', sans-serif;

  .signup-redirect {
    text-align: center;
    margin-top: 14px;
    font-size: 18px;
  }

  .signup-redirect a {
    color: rgb(100, 197, 163);
    font-weight: 500;
    text-decoration: none;
  }

  .fade-message {
    text-align: center;
    font-size: 14px;
    margin-top: 10px;
    opacity: 0;
    animation: fadein 0.5s forwards;
  }

  .fade-message.success {
    color: rgb(100, 197, 163);
  }

  .fade-message.error {
    color: red;
  }

  @keyframes fadein {
    to {
      opacity: 1;
    }
  }

  .container {
    max-width: 800px;
    background: linear-gradient(120deg, rgba(255, 255, 255, 0.75), rgba(244, 247, 251, 0.75));
    border-radius: 40px;
    padding: 25px 35px;
    border: 5px solid #ffffff;
    box-shadow: rgba(128, 203, 196, 0.4) 0px 30px 30px -20px;
    margin: 20px;
    backdrop-filter: blur(16px);
  }

  .heading {
    text-align: center;
    font-weight: 800;
    font-size: 30px;
    color: rgb(128, 203, 196);
    margin-bottom: 5px;
  }

  .form {
    margin-top: 20px;
  }

  .form .input {
    width: 90%;
    background: #ffffff;
    border: none;
    padding: 15px 20px;
    border-radius: 16px;
    margin-top: 15px;
    box-shadow: #cff0ff 0px 10px 10px -5px;
    font-size: 15px;
    transition: all 0.2s;
  }

  .form .input::placeholder {
    color: rgb(160, 160, 160);
  }

  .form .input:focus {
    outline: none;
    border-inline: 2px solid rgb(128, 203, 196);
  }

  .form .forgot-password {
    display: block;
    margin-top: 10px;
    margin-left: 10px;
  }

  .form .forgot-password a {
    font-size: 11px;
    color: rgb(100, 197, 163);
    text-decoration: none;
  }

  .form .login-button {
    display: block;
    width: 100%;
    font-weight: bold;
    background: linear-gradient(45deg, rgb(255, 180, 51), rgb(255, 200, 100));
    color: white;
    padding: 14px 0;
    margin: 20px auto 10px;
    border-radius: 20px;
    box-shadow: rgba(255, 180, 51, 0.4) 0px 20px 10px -15px;
    border: none;
    transition: all 0.2s ease-in-out;
    font-size: 22px;
  }

  .form .login-button:hover {
    transform: scale(1.03);
    box-shadow: rgba(255, 180, 51, 0.4) 0px 23px 10px -20px;
  }

  .form .login-button:active {
    transform: scale(0.95);
  }
`;

export default Form;
