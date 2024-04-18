// ----------------------------------START LOCAL LIBRARY ---------------------------------------------
import style from './HomePage.module.scss';
import machine1 from '~/assets/imgs/machine1.png';
import machine2 from '~/assets/imgs/machine2.png';
import ProgressBar from '~/components/ProgressBar';
// ----------------------------------START REACT LIBRARY---------------------------------------------
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
// --------------------------------- END LIBRARY---------------------------------------------
const css = classNames.bind(style);
function HomePage() {
  return (
    <div className={css('container')}>
      <div className={css('area-wrapper')}>
        <h1 className={css('header-area')}>Khu vuc 1</h1>
        <div className={css('overview-area')}>
          <div className={css('machine-overview')}>
            <div className={css('machine-info')}>
              <div className="font-bold text-[18px] mb-[8px]">MC01-May so 1</div>
              <div>Nang luong: 27kW</div>
              <div>Cong nhan: Nguyen Van A</div>
              <div>Ma chi tiet: IF-AB01-01</div>
              <div>Trang thai may</div>
              <div>OEE: 84%</div>
              <div>Tien trinh bao tri may</div>
              <ProgressBar />
            </div>
            <div className={css('machine-image')}>
              <img className="h-[100%]" src={machine1} alt="" />
            </div>
          </div>
          <div className={css('machine-overview')}>
            <div className={css('machine-info')}>
              <div className="font-bold text-[18px] mb-[8px]">MC01-May so 1</div>
              <div>Nang luong: 27kW</div>
              <div>Cong nhan: Nguyen Van A</div>
              <div>Ma chi tiet: IF-AB01-01</div>
              <div>Trang thai may</div>
              <div>OEE: 84%</div>
              <div>Tien trinh bao tri may</div>
              <div className="progress-bar w-[180px] h-[20px] bg-[#ccc]">
                <div style={{ width: '96%', height: '20px', backgroundColor: '#ff9900' }}></div>
              </div>
            </div>
            <div className={css('machine-image')}>
              <img className="h-[100%]" src={machine1} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
