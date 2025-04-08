import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: '',
    nickname: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    age: ''
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
  
    try {
      const res = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
  
      const data = await res.json(); // 👈 parse JSON manually
  
      if (res.status === 201) {
        localStorage.setItem('user', JSON.stringify(data.user)); // ✅ now it works
        //alert('Signup successful! 🎉');
        navigate('/dashboard');
      } else {
        alert(data.message || 'Signup failed.');
      }
    } catch (err) {
      console.error('Signup error:', err);
      alert('Server error. Please try again later.');
    }
  };

  return (
    <StyledWrapper>
      <div className="container">
        <div className="heading">Create Account</div>
        <form className="form" onSubmit={handleSubmit}>
          <input className="input" type="text" name="fullname" placeholder="Full Name" required onChange={handleChange} />
          <input className="input" type="text" name="nickname" placeholder="Nickname" required onChange={handleChange} />
          <input className="input" type="email" name="email" placeholder="Email" required onChange={handleChange} />
          <input className="input" type="password" name="password" placeholder="Password" required onChange={handleChange} />
          <input className="input" type="password" name="confirmPassword" placeholder="Confirm Password" required onChange={handleChange} />
          <select className="input" name="gender" required onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="nonbinary">Non-Binary</option>
            <option value="preferNotToSay">Prefer Not to Say</option>
          </select>
          <input className="input" type="number" name="age" placeholder="Age" min="10" max="120" required onChange={handleChange} />
          <input className="signup-button" type="submit" value="Sign Up" />
        </form>
        <div className="have-account">
          Already have an account? <Link to="/login">Sign In</Link>
        </div>
      </div>
    </StyledWrapper>
  );
};



const StyledWrapper = styled.div`
  font-family: 'Segoe UI', sans-serif;

  .container {
    max-width: 400px;
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
    font-weight: 700;
    font-size: 28px;
    color: rgb(128, 203, 196);
    margin-bottom: 10px;
  }

  .form {
    margin-top: 20px;
  }

  .form .input {
    width: 90%;
    background: #ffffff;
    border: none;
    padding: 14px 18px;
    border-radius: 16px;
    margin-top: 15px;
    box-shadow: #cff0ff 0px 10px 10px -5px;
    font-size: 15px;
    transition: all 0.2s;
  }

  .form .input:focus {
    outline: none;
    border-inline: 2px solid rgb(128, 203, 196);
  }

  .form .signup-button {
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

  .form .signup-button:hover {
    transform: scale(1.03);
    box-shadow: rgba(255, 180, 51, 0.4) 0px 23px 10px -20px;
  }

  .form .signup-button:active {
    transform: scale(0.95);
  }

  .have-account {
    text-align: center;
    font-size: 18px;
    margin-top: 10px;
  }

  .have-account a {
    color: rgb(100, 197, 163);
    text-decoration: none;
    font-weight: 500;
  }
`;

export default SignupForm;
