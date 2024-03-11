// ----------------------------------START LOCAL LIBRARY ---------------------------------------------
import style from './Machine04.module.scss';
import { login } from '~/services/loginService';
import CircleBar from '~/components/CircleBar';
import SemiCircleBar from '~/components/SemiCircleBar';
import { Machine004 } from '~/assets/imgs';

// ----------------------------------START REACT LIBRARY---------------------------------------------
import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// --------------------------------- END  LIBRARY---------------------------------------------
const css = classNames.bind(style);
function Machine04() {
  return (
    <div className={css('machine04')}>
      <div className={css('machine-info')}>
        <div className={css('machine-info-above')}>
          <div className={css('machine-info-detail')}>
            <h1>Thông tin chi tiết</h1>
            <div>ID máy</div>
            <div>Tên máy: Máy khoan</div>
            <div>Trạng thái: ON</div>
            <div>Ngày làm việc: 01-01-2024</div>
            <div>Mã chi tiết: fb01-abc</div>
            <div>Nhân viên: Nguyễn A</div>
            <div>Năng lượng: 20kW</div>
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
        <Machine004 />
      </div>
    </div>
  );
}

export default Machine04;
