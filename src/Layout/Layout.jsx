// ----------------------------------START LOCAL LIBRARY ---------------------------------------------
import style from './Layout.module.scss';
import { LogoFablab } from '~/assets/imgs';
import { LogoBKU } from '~/assets/imgs';
import { publicRoutes, privateRoutes } from '~/routes';
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
  faCartShopping,
} from '@fortawesome/free-solid-svg-icons';

// --------------------------------- END LIBRARY---------------------------------------------
const css = classNames.bind(style);

function Layout({ children, header }) {
  const [isExtra, setIsExtra] = useState(false);
  const [roleOfPerson, setRoleOfPerson] = useState('');
  useEffect(() => {
    const role = localStorage.getItem('role');
    setRoleOfPerson(role);
  }, []);

  const listIconAdmin = [
    faSliders,
    faNewspaper,
    faHardDrive,
    faUpload,
    // faDiagramProject,
    faClockRotateLeft,
    faCartShopping,
    // faChartSimple,
  ];
  const listIconUser = [faSliders, faHardDrive, faDiagramProject, faClockRotateLeft, faChartSimple];
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
        {privateRoutes.map((route, index) => {
          return (
            <NavLink key={index} className={(nav) => css('sidebar-element', { active: nav.isActive })} to={route.path}>
              <FontAwesomeIcon className={css('sidebar-icon')} icon={listIconAdmin[index]} />
              {isExtra && <span className={css('sidebar-text')}>{route.header}</span>}
            </NavLink>
          );
        })}
        {/* {roleOfPerson == 'user' &&
          publicRoutes.map((route, index) => {
            return (
              <NavLink
                key={index}
                className={(nav) => css('sidebar-element', { active: nav.isActive })}
                to={route.path}
              >
                <FontAwesomeIcon className={css('sidebar-icon')} icon={listIconUser[index]} />
                {isExtra && <span className={css('sidebar-text')}>{route.header}</span>}
              </NavLink>
            );
          })} */}
      </div>
      <div className={css('body')}>
        <div className={css('header')}>{header}</div>
        <div className={css('sub-body')}>{children}</div>
      </div>
    </div>
  );
}

export default Layout;
