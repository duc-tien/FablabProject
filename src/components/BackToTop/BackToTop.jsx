// ----------------------------------START LOCAL LIBRARY ---------------------------------------------
import style from './BackToTop.module.scss';
// ----------------------------------START REACT LIBRARY---------------------------------------------
import { useState } from 'react';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// --------------------------------- END  LIBRARY---------------------------------------------
const css = classNames.bind(style);
function BackToTop({ func }) {
  return (
    <div onClick={() => func()} className={css('backtop')}>
      <FontAwesomeIcon className={css('icon-up')} icon={faArrowUp} />
    </div>
  );
}

export default BackToTop;
