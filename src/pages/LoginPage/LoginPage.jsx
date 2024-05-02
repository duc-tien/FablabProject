// ----------------------------------START LOCAL LIBRARY ---------------------------------------------
import style from './LoginPage.module.scss';
import ModalLogin from '~/components/ModalLogin/ModalLogin';
import { getProject } from '~/services/getServices';
import Loading from '~/components/Loading';
import { listProjectFake, listDetailFake, listUser } from '~/utils/fakeData';
import { setUserInfo } from '~/redux/authSlice';
// ----------------------------------START REACT LIBRARY---------------------------------------------
import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
// --------------------------------- END LIBRARY---------------------------------------------
const css = classNames.bind(style);

function LoginPage() {
  const navigate = useNavigate();
  const dispath = useDispatch();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const userInfo = useSelector((state) => state.auth.userInfo);
  useEffect(() => {
    if (userInfo.role) {
      navigate('/');
    }
  }, []);

  const handleLogin = () => {
    const result = listUser.find((e) => {
      return userName == e.userName && password == e.password;
    });

    if (result) {
      dispath(setUserInfo(result));
      navigate('/');
      window.location.reload();
    }
  };

  return (
    <div className={css('overlay')}>
      <div className={css('modal')}>
        <div>Tài khoản</div>
        <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
        <div>Mật khẩu</div>
        <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button
          onClick={() => {
            handleLogin();
          }}
        >
          Đăng nhập
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
