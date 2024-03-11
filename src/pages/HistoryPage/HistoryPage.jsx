// ----------------------------------START LOCAL LIBRARY ---------------------------------------------
import style from './HistoryPage.module.scss';
import Employee from './Employee';
import Machine from './Machine';

// ----------------------------------START REACT LIBRARY---------------------------------------------
import classNames from 'classnames/bind';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

// --------------------------------- END LIBRARY---------------------------------------------
const css = classNames.bind(style);

function HistoryPage() {
  const [active, setActive] = useState(false);
  const [active2, setActive2] = useState(false);
  return (
    <div className={css('detailpage')}>
      <div className={css('sub-header')}>
        <div
          onClick={() => {
            setActive(false);
            setActive2(false);
          }}
          className={css('tag', { active: !active && !active2 })}
        >
          Machine
        </div>
        <div
          onClick={() => {
            setActive(false);
            setActive2(true);
          }}
          className={css('tag', { active: !active && active2 })}
        >
          Employee
        </div>
        <div
          onClick={() => {
            setActive(true);
            setActive2(false);
          }}
          className={css('tag', { active: active && !active2 })}
        >
          PAGE 3
        </div>
      </div>
      {!active && !active2 && <Machine />}
      {!active && active2 && <Employee />}
      {active && !active2 && <div> page detail 3</div>}
    </div>
  );
}

export default HistoryPage;
