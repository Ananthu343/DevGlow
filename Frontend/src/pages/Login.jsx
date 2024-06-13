import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginForm from '../components/LoginForm';
import Footer from '../components/Footer';

const Login = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [userInfo, navigate]);

  return (
    <>
      <div style={{
        top: 0,
        backgroundImage: `url('https://c0.wallpaperflare.com/preview/506/555/733/career-leadership-success-businessman.jpg')`,
        height: "100vh",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <LoginForm />
      </div>
      <Footer />
    </>
  );
};

export default Login;
