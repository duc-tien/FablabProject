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
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const res = await login(userName, password);
    if (typeof res === 'string') {
      localStorage.setItem('token', res);
      navigate('/detail');
    }
  };
  return (
    <div>
      <div>Login Page</div>
      <input type="text" value={userName} placeholder="UserName" onChange={(e) => setUserName(e.target.value)} />
      <input type="text" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

      <button className="w-[150px] h-[22px]" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default LoginPage;
