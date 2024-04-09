// ----------------------------------START LOCAL LIBRARY ---------------------------------------------
import style from './Alert.module.scss';
import { displayModalLogin } from '~/redux/displaySlice';
import { login } from '~/services/loginService';
// ----------------------------------START REACT LIBRARY---------------------------------------------
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// --------------------------------- END  LIBRARY---------------------------------------------
const css = classNames.bind(style);
function Alert({ content, onClose }) {
  return (
    <div className={css('alert')}>
      <h1>Thông báo</h1>
      <div className={css('alert-content')}>{content}</div>
      <button onClick={() => onClose()} className={css('alert-button')}>
        OK
      </button>
    </div>
  );
}

export default Alert;
