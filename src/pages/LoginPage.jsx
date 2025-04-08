import React from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  return (
    <div style={styles.wrapper}>
      <LoginForm />
    </div>
  );
};

const styles = {
  wrapper: {
    backgroundColor: 'rgb(251, 248, 239)', // your background color
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem',
  },
};

export default LoginPage;
