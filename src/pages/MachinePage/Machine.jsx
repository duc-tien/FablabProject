// ----------------------------------START LOCAL LIBRARY ---------------------------------------------
import style from './Machine.module.scss';
import Machine01 from './Machine01';
import Machine02 from './Machine02';
import Machine03 from './Machine03';
import Machine04 from './Machine04';
import hubConnection from '~/utils/hubConnection';

// ----------------------------------START REACT LIBRARY---------------------------------------------
import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// --------------------------------- END LIBRARY---------------------------------------------
const css = classNames.bind(style);

function Machine() {
  const [active, setActive] = useState(false);
  const [active2, setActive2] = useState(false);
  return (
    <div className={css('machine-page')}>
      <div className={css('sub-header')}>
        <div
          onClick={() => {
            setActive(false);
            setActive2(false);
          }}
          className={css('tag', { active: !active && !active2 })}
        >
          Machine 01
        </div>
        <div
          onClick={() => {
            setActive(false);
            setActive2(true);
          }}
          className={css('tag', { active: !active && active2 })}
        >
          Machine 02
        </div>
        <div
          onClick={() => {
            setActive(true);
            setActive2(false);
          }}
          className={css('tag', { active: active && !active2 })}
        >
          Machine 03
        </div>
        <div
          onClick={() => {
            setActive(true);
            setActive2(true);
          }}
          className={css('tag', { active: active && active2 })}
        >
          Machine 04
        </div>
      </div>
      {!active && !active2 && <Machine01 />}
      {!active && active2 && <Machine02 />}
      {active && !active2 && <Machine03 />}
      {active && active2 && <Machine04 />}
    </div>
  );
}

export default Machine;
