// ----------------------------------START LOCAL LIBRARY ---------------------------------------------
import style from './Layout.module.scss';
import { LogoFablab } from '~/assets/imgs';
import { LogoBKU } from '~/assets/imgs';
import { publicRoutes, privateRoutes } from '~/routes';
import { setUserInfo } from '~/redux/authSlice';
// ----------------------------------START REACT LIBRARY---------------------------------------------
import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUpload,
  faSliders,
  faClockRotateLeft,
  faHardDrive,
  faCartShopping,
  faGear,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

// --------------------------------- END LIBRARY---------------------------------------------
const css = classNames.bind(style);

function Layout({ children, header }) {
  const dispatch = useDispatch();
  const [isExtra, setIsExtra] = useState(false);
  const [route, setRoute] = useState();
  const [listIconSidebar, setListIconSidebar] = useState();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const listIconAdmin = [faSliders, faHardDrive, faClockRotateLeft, faUpload, faGear];
  const listIconUser = [faSliders, faHardDrive, faClockRotateLeft];

  useEffect(() => {
    if (userInfo) {
      userInfo.role == 'admin' ? setRoute(privateRoutes) : setRoute(publicRoutes);
      if (userInfo.role == 'admin') {
        setRoute(privateRoutes);
        setListIconSidebar(listIconAdmin);
      } else {
        setRoute(publicRoutes);
        setListIconSidebar(listIconUser);
      }
    }
  }, []);

  const handleLogout = () => {
    dispatch(setUserInfo({}));
    window.location.reload();
  };

  return (
    <div className={css('layout')}>
      <div
        onMouseLeave={() => setIsExtra(false)}
        onMouseEnter={() => setIsExtra(true)}
        className={css('sidebar', { 'sidebar-extra': isExtra })}
      >
        <div className={css({ 'sidebar-logo-narrow': !isExtra }, { 'sidebar-logo-extra': isExtra })}>
          <LogoBKU className={css('logo')} />
          <LogoFablab className={css('logo')} />
        </div>
        {route?.map((route, index) => {
          return (
            <NavLink key={index} className={(nav) => css('sidebar-element', { active: nav.isActive })} to={route.path}>
              <FontAwesomeIcon className={css('sidebar-icon')} icon={listIconSidebar[index]} />
              {isExtra && <span className={css('sidebar-text')}>{route.header}</span>}
            </NavLink>
          );
        })}
      </div>
      <div className={css('body')}>
        <div className={css('header')}>
          <div>{header}</div>
          <div className={css('info-user')}>
            <div className={css('avatar-user')}>
              <FontAwesomeIcon className={css('icon-user')} icon={faUser} />
            </div>

            <div style={{ minWidth: '50px' }} className="text-[14px] mx-[2px] h-[8vh] ">
              {userInfo.userName}
            </div>
            <div onClick={handleLogout} className="text-[14px] w-[90px] h-[8vh] cursor-pointer">
              Đăng xuất
            </div>
          </div>
        </div>
        <div className={css('sub-body')}>{children}</div>
      </div>
    </div>
  );
}

export default Layout;
