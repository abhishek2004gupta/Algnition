import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import styled from 'styled-components';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Wrapper>
      {isLogin ? <LoginForm /> : <SignupForm />}
      <div className="toggle">
        {isLogin ? (
          <p>
            Don't have an account?{' '}
            <button onClick={() => setIsLogin(false)}>Sign Up</button>
          </p>
        ) : (
          <p>
            Already have an account?{' '}
            <button onClick={() => setIsLogin(true)}>Log In</button>
          </p>
        )}
      </div>
    </Wrapper>
  );
};

export default AuthPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px;
  min-height: 100vh;
  background-color: rgb(251, 248, 239);

  .toggle {
    margin-top: 20px;
    font-size: 14px;
    color: #333;
  }

  .toggle button {
    border: none;
    background: none;
    color: rgb(128, 203, 196);
    font-weight: bold;
    cursor: pointer;
    font-size: 14px;
  }
`;
