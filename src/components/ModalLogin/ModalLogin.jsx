// ----------------------------------START LIBRARY MAUNUAL---------------------------------------------
import style from './ModalLogin.module.scss';
import { displayModalLogin } from '../../redux/displaySlice';
import { login } from '../../services/loginService';
// ----------------------------------START REACT LIBRARY---------------------------------------------
import { useState } from 'react';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';

// --------------------------------- END  LIBRARY---------------------------------------------
const css = classNames.bind(style);

function ModalLogin({ classname }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const isLoginAgain = useSelector((state) => state.display.isLogin);
  const cln = css(classname, 'overlay');

  const handleLogin = async () => {
    const res = await login(username, password);
    if (typeof res === 'string') {
      localStorage.setItem('token', res);
      dispatch(displayModalLogin(false));
      window.location.reload();
    }
  };
  return (
    <div className={cln}>
      <div className={css('modal')}>
        <input type="text" value={username} placeholder="UserName" onChange={(e) => setUsername(e.target.value)} />
        <input type="text" value={password} placeholder="PassWord" onChange={(e) => setPassword(e.target.value)} />
        <button onClick={() => handleLogin()}>Login</button>
      </div>
    </div>
  );
}

export default ModalLogin;
