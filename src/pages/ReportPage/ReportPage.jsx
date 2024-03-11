// ----------------------------------START LOCAL LIBRARY ---------------------------------------------
import style from './ReportPage.module.scss';
import { addHobby, deleteHobby } from '~/redux/hobbySlice';
import ModalLogin from '~/components/ModalLogin/ModalLogin';
import instance from '~/utils/api';

// ----------------------------------START REACT LIBRARY---------------------------------------------
import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// --------------------------------- END LIBRARY---------------------------------------------
const css = classNames.bind(style);

function ReportPage() {
  return <div className={css('homepage')}></div>;
}

export default ReportPage;
