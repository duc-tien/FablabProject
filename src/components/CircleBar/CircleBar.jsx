// ----------------------------------START LOCAL LIBRARY ---------------------------------------------
import style from './CircleBar.module.scss';
import { login } from '~/services/loginService';
// ----------------------------------START REACT LIBRARY---------------------------------------------
import { useState } from 'react';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';

// --------------------------------- END  LIBRARY---------------------------------------------
const css = classNames.bind(style);
function CircleBar({ netRunTime, runTime, workTime }) {
  let percent = 0;
  let color;
  if (netRunTime && runTime && workTime) {
    const eNetRunTime = netRunTime.split(':');
    const eRunTime = runTime.split(':');
    const eWorkTime = workTime.split(':');

    const tNetRunTime = parseInt(eNetRunTime[0]) * 3600 + parseInt(eNetRunTime[1]) * 60 + parseInt(eNetRunTime[2]);
    const tRunTime = parseInt(eRunTime[0]) * 3600 + parseInt(eRunTime[1]) * 60 + parseInt(eRunTime[2]);
    const tWorkTime = parseInt(eWorkTime[0]) * 3600 + parseInt(eWorkTime[1]) * 60 + parseInt(eWorkTime[2]);
    percent = ((((tRunTime / tWorkTime) * tNetRunTime) / tRunTime) * 100).toFixed(2);
  }

  if (percent < 50) {
    color = 'red';
  } else if (50 <= percent && percent < 80) {
    color = 'orange';
  } else {
    color = '#00aa11';
  }

  return (
    <div
      style={{
        background: `conic-gradient(from 0deg, ${color} 0deg, ${color} ${(percent / 100) * 360}deg, #ccc ${
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
