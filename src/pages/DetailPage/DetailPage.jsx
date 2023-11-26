// ----------------------------------START LOCAL LIBRARY ---------------------------------------------
import style from './DetailPage.module.scss';
import { login } from '~/services/loginService';
import { getAll, getOnReq } from '~/services/getService';
import ModalLogin from '~/components/ModalLogin/ModalLogin';
import { displayModalLogin } from '~/redux/displaySlice';
import checkLogin from '~/utils/checkLogin';

// ----------------------------------START REACT LIBRARY---------------------------------------------
import classNames from 'classnames/bind';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';

// --------------------------------- END LIBRARY---------------------------------------------
const css = classNames.bind(style);

function DetailPage() {
  const dispatch = useDispatch();
  const isLoginAgain = useSelector((state) => state.display.isLogin);
  const [data, setData] = useState([]);

  useEffect(() => {
    let date = new Date();
    const fetchApi = async () => {
      try {
        const res = await getAll();
        setData(res);
      } catch (error) {}
    };

    if (!checkLogin()) {
      dispatch(displayModalLogin(true));
    } else {
      fetchApi();
    }
  }, []);
  return (
    <div>
      {isLoginAgain && <ModalLogin />}
      <h1>DetailPage</h1>
      <div className="mt-11 ml-11">
        {data.map((item, index) => {
          return <div key={index}>{item.tenDanhMuc}</div>;
        })}
      </div>
    </div>
  );
}

export default DetailPage;
