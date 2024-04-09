// ----------------------------------START LOCAL LIBRARY ---------------------------------------------
import style from './LoginPAge.module.scss';
import { login } from '~/services/loginService';

// ----------------------------------START REACT LIBRARY---------------------------------------------
import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// --------------------------------- END  LIBRARY---------------------------------------------
const css = classNames.bind(style);

function LoginPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role) navigate('/');
  }, []);

  const handleLogin = (role) => {
    localStorage.setItem('role', role);
    navigate('/');
    window.location.reload();
  };
  return (
    <div>
      <div>Login Page</div>
      <button className="w-[150px] h-[22px]" onClick={() => handleLogin('admin')}>
        Login Admin
      </button>
      <button className="w-[150px] h-[22px]" onClick={() => handleLogin('user')}>
        Login User
      </button>
    </div>
  );
}

export default LoginPage;
