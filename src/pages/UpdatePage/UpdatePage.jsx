// ----------------------------------START LOCAL LIBRARY ---------------------------------------------
import style from './UpdatePage.module.scss';
import BackToTop from '~/components/BackToTop';
import UpdateProject from './UpdateProject';
import Worker from './Worker';
import ComfirmDetail from './ComfirmDetail';
// ----------------------------------START REACT LIBRARY---------------------------------------------
import classNames from 'classnames/bind';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

// --------------------------------- END LIBRARY---------------------------------------------
const css = classNames.bind(style);

function UpdatePage() {
  const [active1, setActive1] = useState(false);
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
            setActive1(false);
            setActive2(false);
          }}
          className={css('tag', { active: !active1 && !active2 })}
        >
          Dự án
        </div>
        <div
          onClick={() => {
            setActive1(false);
            setActive2(true);
          }}
          className={css('tag', { active: !active1 && active2 })}
        >
          Công nhân
        </div>
        <div
          onClick={() => {
            setActive1(true);
            setActive2(false);
          }}
          className={css('tag', { active: active1 && !active2 })}
        >
          Xác nhận chi tiết
        </div>
      </div>
      {!active1 && !active2 && <UpdateProject />}
      {!active1 && active2 && <Worker />}
      {active1 && !active2 && <ComfirmDetail />}

      {showBackTop && <BackToTop func={scrollToTop} />}
    </div>
  );
}

export default UpdatePage;
