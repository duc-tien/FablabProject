// ----------------------------------START LOCAL LIBRARY ---------------------------------------------
import style from './HistoryPage.module.scss';
import Employee from './Employee';
import Machine from './Machine';
import Detail from './Detail';
import Project from './Project';
import BackToTop from '~/components/BackToTop';

// ----------------------------------START REACT LIBRARY---------------------------------------------
import classNames from 'classnames/bind';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

// --------------------------------- END LIBRARY---------------------------------------------
const css = classNames.bind(style);

function HistoryPage() {
  const [active, setActive] = useState(false);
  const [active2, setActive2] = useState(false);
  const [showBackTop, setShowBackTop] = useState(false);
  const divRef = useRef(null);
  const handleScroll = (pos) => {
    if (pos > 0) {
      setShowBackTop(true);
    } else setShowBackTop(false);
  };
  const scrollToTop = () => {
    if (divRef.current) {
      divRef.current.scrollTop = 0;
    }
  };
  return (
    <div ref={divRef} onScroll={(e) => handleScroll(e.target.scrollTop)} className={css('container')}>
      <div className={css('sub-header')}>
        <div
          onClick={() => {
            setActive(false);
            setActive2(false);
          }}
          className={css('tag', { active: !active && !active2 })}
        >
          Máy
        </div>
        <div
          onClick={() => {
            setActive(false);
            setActive2(true);
          }}
          className={css('tag', { active: !active && active2 })}
        >
          Nhân viên
        </div>
        <div
          onClick={() => {
            setActive(true);
            setActive2(false);
          }}
          className={css('tag', { active: active && !active2 })}
        >
          Dự án
        </div>
        <div
          onClick={() => {
            setActive(true);
            setActive2(true);
          }}
          className={css('tag', { active: active && active2 })}
        >
          Chi tiết
        </div>
      </div>
      {!active && !active2 && <Machine />}
      {!active && active2 && <Employee />}
      {active && !active2 && <Project />}
      {active && active2 && <Detail />}
      {showBackTop && <BackToTop func={scrollToTop} />}
    </div>
  );
}

export default HistoryPage;
