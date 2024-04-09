// ----------------------------------START LOCAL LIBRARY ---------------------------------------------
import style from './SemiCircleBar.module.scss';
import { displayModalLogin } from '~/redux/displaySlice';
import { login } from '~/services/loginService';
// ----------------------------------START REACT LIBRARY---------------------------------------------
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';

// --------------------------------- END  LIBRARY---------------------------------------------
const css = classNames.bind(style);
function SemiCircleBar({ className, timeDivided, timeDivisor }) {
  let percent = 0;
  if (timeDivided && timeDivisor) {
    const eTimeDivided = timeDivided.split(':');
    const eTimeDivisor = timeDivisor.split(':');

    const tTimeDivided = parseInt(eTimeDivided[0]) * 3600 + parseInt(eTimeDivided[1]) * 60 + parseInt(eTimeDivided[2]);
    const tTimeDivisor = parseInt(eTimeDivisor[0]) * 3600 + parseInt(eTimeDivisor[1]) * 60 + parseInt(eTimeDivisor[2]);
    percent = ((tTimeDivided / tTimeDivisor) * 100).toFixed(2);
  }

  return (
    <div className={css('bar', { [className]: className })}>
      <div
        style={{
          background: `conic-gradient(from -90deg, #1488DB 0deg, #1488DB ${(percent / 100) * 180}deg, #ccc ${
            (percent / 100) * 180
          }deg, #ccc 360deg)`,
        }}
        className={css('outer')}
      >
        <div className={css('inner')}>
          <span>{`${percent}%`}</span>
        </div>
      </div>
    </div>
  );
}

export default SemiCircleBar;
