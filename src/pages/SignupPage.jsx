import React from 'react';
import SignupForm from '../components/SignupForm';

const SignupPage = () => {
  return (
    <div style={styles.wrapper}>
      <SignupForm />
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

export default SignupPage;
