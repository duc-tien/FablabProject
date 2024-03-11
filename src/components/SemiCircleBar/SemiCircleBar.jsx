// ----------------------------------START LOCAL LIBRARY ---------------------------------------------
import style from './SemiCircleBar.module.scss';
import { displayModalLogin } from '~/redux/displaySlice';
import { login } from '~/services/loginService';
// ----------------------------------START REACT LIBRARY---------------------------------------------
import { useState } from 'react';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';

// --------------------------------- END  LIBRARY---------------------------------------------
const css = classNames.bind(style);
function SemiCircleBar({ className }) {
  const [per, setPer] = useState(40);
  return (
    <div className={css('bar', { [className]: className })}>
      <div
        style={{
          background: `conic-gradient(from -90deg, red 0deg, red ${(per / 100) * 180}deg, #ccc ${
            (per / 100) * 180
          }deg, #ccc 360deg)`,
        }}
        className={css('outer')}
      >
        <div className={css('inner')}>
          <span>{`${per}%`}</span>
        </div>
      </div>
    </div>
  );
}

export default SemiCircleBar;
