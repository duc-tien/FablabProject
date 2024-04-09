// ----------------------------------START LOCAL LIBRARY ---------------------------------------------
import style from './Machine02.module.scss';
import { login } from '~/services/loginService';
import CircleBar from '~/components/CircleBar';
import SemiCircleBar from '~/components/SemiCircleBar';
import { Machine002 } from '~/assets/imgs';

// ----------------------------------START REACT LIBRARY---------------------------------------------
import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// --------------------------------- END  LIBRARY---------------------------------------------
const css = classNames.bind(style);
function Machine02() {
  return (
    <div className={css('machine02')}>
      <div className={css('machine-info')}>
        <div className={css('machine-info-above')}>
          <div className={css('machine-info-detail')}>
            MC01-Máy khoan
            <div className={css('content-inner')}>
              <div>
                <span className={css('content-inner-title')}>Trạng thái hoạt động: </span>
                <span>ON</span>
              </div>
              <div>
                <span className={css('content-inner-title')}>Năng lượng: </span>
                <span>27kW</span>
              </div>

              <div>
                <span className={css('content-inner-title')}>Nhân viên: </span>
                <span>Nguyễn Văn A</span>
              </div>
              <div>
                <span className={css('content-inner-title')}>Chi tiết gia công: </span>
                <span>fb01-abc</span>
              </div>
              <div>
                <span className={css('content-inner-title')}>Thời gian gia công:</span>
                <span>00:37:02</span>
              </div>
            </div>
          </div>
          <div className={css('machine-info-oee')}>
            <div>OEE(%)</div>
            <CircleBar />
          </div>
        </div>
        <div className={css('machine-info-under')}>
          <div className={css('semi-chart')}>
            <h1>Avaibility</h1>
            <SemiCircleBar />
            <div>Thoi gian: 00:00:00</div>
          </div>
          <div className={css('semi-chart')}>
            <h1>Avaibility</h1>
            <SemiCircleBar />
            <div>Thoi gian: 00:00:00</div>
          </div>
          <div className={css('semi-chart')}>
            <h1>Avaibility</h1>
            <SemiCircleBar />
            <div>Thoi gian: 00:00:00</div>
          </div>
        </div>
      </div>
      <div className={css('machine-illustrate')}>
        <Machine002 />
      </div>
    </div>
  );
}

export default Machine02;
