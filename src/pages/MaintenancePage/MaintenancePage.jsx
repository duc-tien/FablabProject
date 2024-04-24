// ----------------------------------START LOCAL LIBRARY ---------------------------------------------
import style from './MaintenancePage.module.scss';
import BackToTop from '~/components/BackToTop';
import Period from './Period';
import RecordError from './RecordError';
// ----------------------------------START REACT LIBRARY---------------------------------------------
import classNames from 'classnames/bind';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

// --------------------------------- END LIBRARY---------------------------------------------
const css = classNames.bind(style);

function MaintenancePage() {
  const [active, setActive] = useState(false);
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
          }}
          className={css('tag', { active: !active })}
        >
          Đặt t/gian bảo trì
        </div>
        <div
          onClick={() => {
            setActive(true);
          }}
          className={css('tag', { active: active })}
        >
          Ghi lỗi
        </div>
      </div>
      {!active && <Period />}
      {active && <RecordError />}

      {showBackTop && <BackToTop func={scrollToTop} />}
    </div>
  );
}

export default MaintenancePage;
