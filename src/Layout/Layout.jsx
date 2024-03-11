// ----------------------------------START LOCAL LIBRARY ---------------------------------------------
import style from './Layout.module.scss';
import { publicRoutes } from '~/routes';
import { LogoFablab } from '~/assets/imgs';
import { LogoBKU } from '~/assets/imgs';
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
  faDiagramProject,
  faChartSimple,
  faNewspaper,
} from '@fortawesome/free-solid-svg-icons';

// --------------------------------- END LIBRARY---------------------------------------------
const css = classNames.bind(style);

function Layout({ children, header }) {
  const [isExtra, setIsExtra] = useState(false);
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
        <NavLink className={(nav) => css('sidebar-element', { active: nav.isActive })} to="/">
          <FontAwesomeIcon className={css('sidebar-icon')} icon={faSliders} />
          {isExtra && <span className={css('sidebar-text')}>TỔNG QUAN</span>}
        </NavLink>
        <NavLink className={(nav) => css('sidebar-element', { active: nav.isActive })} to="/order">
          <FontAwesomeIcon className={css('sidebar-icon')} icon={faNewspaper} />
          {isExtra && <span className={css('sidebar-text')}>TẠO ĐƠN HÀNG</span>}
        </NavLink>
        <NavLink className={(nav) => css('sidebar-element', { active: nav.isActive })} to="/machine">
          <FontAwesomeIcon className={css('sidebar-icon')} icon={faHardDrive} />
          {isExtra && <span className={css('sidebar-text')}>GIÁM SÁT MÁY</span>}
        </NavLink>
        <NavLink className={(nav) => css('sidebar-element', { active: nav.isActive })} to="/updateproject">
          <FontAwesomeIcon className={css('sidebar-icon')} icon={faUpload} />
          {isExtra && <span className={css('sidebar-text')}>CẬP NHẬT DỰ ÁN</span>}
        </NavLink>
        <NavLink className={(nav) => css('sidebar-element', { active: nav.isActive })} to="/project">
          <FontAwesomeIcon className={css('sidebar-icon')} icon={faDiagramProject} />
          {isExtra && <span className={css('sidebar-text')}>THEO DÕI DỰ ÁN</span>}
        </NavLink>
        <NavLink className={(nav) => css('sidebar-element', { active: nav.isActive })} to="/history">
          <FontAwesomeIcon className={css('sidebar-icon')} icon={faClockRotateLeft} />
          {isExtra && <span className={css('sidebar-text')}>TRUY XUẤT DỮ LIỆU</span>}
        </NavLink>
        <NavLink className={(nav) => css('sidebar-element', { active: nav.isActive })} to="/report">
          <FontAwesomeIcon className={css('sidebar-icon')} icon={faChartSimple} />
          {isExtra && <span className={css('sidebar-text')}>BÁO CÁO</span>}
        </NavLink>
      </div>
      <div className={css('body')}>
        <div className={css('header')}>{header}</div>
        <div className={css('sub-body')}>{children}</div>
      </div>
    </div>
  );
}

export default Layout;
