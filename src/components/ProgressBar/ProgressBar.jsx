// ----------------------------------START LOCAL LIBRARY ---------------------------------------------
import style from './ProgressBar.module.scss';
import { login } from '~/services/loginService';
// ----------------------------------START REACT LIBRARY---------------------------------------------
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';

// --------------------------------- END  LIBRARY---------------------------------------------
const css = classNames.bind(style);
function ProgressBar({ className, timeDivided, timeDivisor }) {
  let percent = 100;
  let color;
  // if (timeDivided && timeDivisor) {
  //   const eTimeDivided = timeDivided.split(':');
  //   const eTimeDivisor = timeDivisor.split(':');

  //   const tTimeDivided = parseInt(eTimeDivided[0]) * 3600 + parseInt(eTimeDivided[1]) * 60 + parseInt(eTimeDivided[2]);
  //   const tTimeDivisor = parseInt(eTimeDivisor[0]) * 3600 + parseInt(eTimeDivisor[1]) * 60 + parseInt(eTimeDivisor[2]);
  //   percent = ((tTimeDivided / tTimeDivisor) * 100).toFixed(2);
  // }
  if (percent < 50) {
    color = '#00aa11';
  } else if (70 <= percent && percent < 100) {
    color = '#FF9900';
  } else {
    color = 'red';
  }

  return (
    <div className="progress-bar w-[180px] h-[20px] bg-[#ccc]">
      <div style={{ width: `${percent}%`, height: '20px', backgroundColor: `${color}` }}></div>
    </div>
  );
}

export default ProgressBar;
