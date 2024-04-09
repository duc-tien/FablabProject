// ----------------------------------START LOCAL LIBRARY ---------------------------------------------
import style from './CircleBar.module.scss';
import { displayModalLogin } from '~/redux/displaySlice';
import { login } from '~/services/loginService';
// ----------------------------------START REACT LIBRARY---------------------------------------------
import { useState } from 'react';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';

// --------------------------------- END  LIBRARY---------------------------------------------
const css = classNames.bind(style);
function CircleBar({ netRunTime, runTime, workTime }) {
  let percent = 0;
  if (netRunTime && runTime && workTime) {
    const eNetRunTime = netRunTime.split(':');
    const eRunTime = runTime.split(':');
    const eWorkTime = workTime.split(':');

    const tNetRunTime = parseInt(eNetRunTime[0]) * 3600 + parseInt(eNetRunTime[1]) * 60 + parseInt(eNetRunTime[2]);
    const tRunTime = parseInt(eRunTime[0]) * 3600 + parseInt(eRunTime[1]) * 60 + parseInt(eRunTime[2]);
    const tWorkTime = parseInt(eWorkTime[0]) * 3600 + parseInt(eWorkTime[1]) * 60 + parseInt(eWorkTime[2]);
    percent = ((((tRunTime / tWorkTime) * tNetRunTime) / tRunTime) * 100).toFixed(2);
  }
  return (
    <div
      style={{
        background: `conic-gradient(from 0deg, #1488DB 0deg, #1488DB ${(percent / 100) * 360}deg, #ccc ${
          (percent / 100) * 360
        }deg, #ccc 360deg)`,
      }}
      className={css('outer')}
    >
      <div className={css('inner')}>{`${percent}%`}</div>
    </div>
  );
}

export default CircleBar;
