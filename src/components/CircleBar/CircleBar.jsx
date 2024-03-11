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
function CircleBar() {
  const [per, setPer] = useState(50);

  return (
    <div
      style={{
        background: `conic-gradient(from 0deg, red 0deg, red ${(per / 100) * 360}deg, #ccc ${
          (per / 100) * 360
        }deg, #ccc 360deg)`,
      }}
      className={css('outer')}
    >
      <div className={css('inner')}>{`${per}%`}</div>
    </div>
  );
}

export default CircleBar;
