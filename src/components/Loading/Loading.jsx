// ----------------------------------START LOCAL LIBRARY ---------------------------------------------
import style from './Loading.module.scss';
import { displayModalLogin } from '~/redux/displaySlice';
import { login } from '~/services/loginService';
// ----------------------------------START REACT LIBRARY---------------------------------------------
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
// --------------------------------- END  LIBRARY---------------------------------------------
const css = classNames.bind(style);
function Loading() {
  return (
    <div className={css('loading')}>
      <FontAwesomeIcon icon={faSpinner} className={css('icon-loading')} />
      <div>Đang xử lý...</div>
    </div>
  );
}

export default Loading;
