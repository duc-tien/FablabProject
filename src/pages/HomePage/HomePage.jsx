// ----------------------------------START LOCAL LIBRARY ---------------------------------------------
import style from './HomePage.module.scss';
import machine1 from '~/assets/imgs/machine1.png';
import machine2 from '~/assets/imgs/machine2.png';
import ProgressBar from '~/components/ProgressBar';
import { stage } from '~/utils/fakeData';
import calculateSumTime from '~/utils/calculateSumTime';
import hubConnection from '~/utils/hubConnection';

// ----------------------------------START REACT LIBRARY---------------------------------------------
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
// --------------------------------- END LIBRARY---------------------------------------------
const css = classNames.bind(style);
function HomePage() {
  const [workTime, setWorkTime] = useState('');
  const [oee, setOee] = useState('');
  const [dataOfMachine1, setDataOfMachine1] = useState();
  const [dataOfMachine2, setDataOfMachine2] = useState();
  const [storeTime, setStoreTime] = useState();

  useEffect(() => {
    const getDataInit = async () => {
      const { data } = await axios.get('https://localhost:7245/Message');
      setDataOfMachine1(data[0]);
      setDataOfMachine2(data[1]);
    };
    getDataInit();

    const tempList = stage.filter((x) => x.machineId == 'MC02');
    const list = tempList.map((e) => {
      return {
        startTimeStamp: e.startProcessTime,
        endTimeStamp: e.endProcessTime,
      };
    });
    const accumulateTime = calculateSumTime(list);
    setStoreTime(accumulateTime);
  }, []);

  useEffect(() => {
    hubConnection.start();
    hubConnection.connection.on('TagChanged', (msg) => {
      switch (msg.machine) {
        case 'MC01': {
          setDataOfMachine1(msg);
          break;
        }
        case 'MC02': {
          setDataOfMachine2(msg);
          break;
        }
      }
    });
    return () => {
      hubConnection.connection.off('TagChanged');
    };
  }, [hubConnection.connection]);

  useEffect(() => {
    const myTimeout = setTimeout(() => {
      getWorkTime();
      calculateOEE1();
      calculateOEE2();
    }, 1000);
    return () => clearTimeout(myTimeout);
  }, [workTime]);

  const calculateOEE1 = () => {
    let start = new Date(dataOfMachine1.startProcessTime);
    let end = new Date(dataOfMachine1.endProcessTime);
    let oeeValue;
    if (start < end) {
      const timeDiff = (end.getTime() - start.getTime()) / 1000 + storeTime;
      oeeValue = ((timeDiff / workTime) * 100).toFixed(2);
    } else {
      end = new Date();
      const timeDiff = (end.getTime() - start.getTime()) / 1000 + storeTime;
      oeeValue = ((timeDiff / workTime) * 100).toFixed(2);
    }
    setDataOfMachine1((prev) => {
      return {
        ...prev,
        oee: oeeValue,
      };
    });
  };
  const calculateOEE2 = () => {
    let start = new Date(dataOfMachine2.startProcessTime);
    let end = new Date(dataOfMachine2.endProcessTime);
    let oeeValue;
    if (start < end) {
      const timeDiff = (end.getTime() - start.getTime()) / 1000 + storeTime;
      oeeValue = ((timeDiff / workTime) * 100).toFixed(2);
    } else {
      end = new Date();
      const timeDiff = (end.getTime() - start.getTime()) / 1000 + storeTime;
      oeeValue = ((timeDiff / workTime) * 100).toFixed(2);
    }
    setDataOfMachine2((prev) => {
      return {
        ...prev,
        oee: oeeValue,
      };
    });
  };

  const getWorkTime = () => {
    const timeFormer = new Date();
    timeFormer.setHours(7, 0, 0);
    const timeLater = new Date();
    const timeDiff = (timeLater.getTime() - timeFormer.getTime()) / 1000;

    if (timeDiff < 8 * 60 * 60) {
      setWorkTime(timeDiff);
    } else {
      setWorkTime(8 * 3600);
    }
  };

  return (
    <div className={css('container')}>
      <div className={css('area-wrapper')}>
        <h1 className={css('header-area')}>Khu vuc 1</h1>
        <div className={css('overview-area')}>
          <div className={css('machine-overview')}>
            <div className={css('machine-info')}>
              <div className="font-bold text-[18px] mb-[8px]">MC01-May so 1</div>
              <div>Năng lượng: 27kW</div>
              <div>Công nhân: Nguyen Van A</div>
              <div>Mã chi tiết: IF-AB01-01</div>
              <div>Trạng thái máy</div>
              <div>
                OEE: <span>{dataOfMachine1?.oee ? dataOfMachine1.oee : '---'}</span>%
              </div>
              <div>Tiến trình bảo trì máy</div>
              <ProgressBar timeDivided={2000} timeDivisor={4000} />
            </div>
            <div className={css('machine-image')}>
              <img className="h-[100%]" src={machine1} alt="" />
            </div>
          </div>
          <div className={css('machine-overview')}>
            <div className={css('machine-info')}>
              <div className="font-bold text-[18px] mb-[8px]">MC01-May so 1</div>
              <div>Năng lượng: 27kW</div>
              <div>Công nhân: Nguyen Van A</div>
              <div>Mã chi tiết: IF-AB01-01</div>
              <div>Trạng thái máy</div>
              <div>
                OEE: <span>{dataOfMachine2?.oee ? dataOfMachine2.oee : '---'}</span>%
              </div>
              <div>Tiến trình bảo trì máy</div>
              <ProgressBar timeDivided={4001} timeDivisor={4000} />
            </div>
            <div className={css('machine-image')}>
              <img className="h-[100%]" src={machine2} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

// const timeDiff1 =
// (end1.getHours() - start1.getHours()) * 3600 +
// (end1.getMinutes() - start1.getMinutes()) * 60 +
// end1.getSeconds() -
// start1.getSeconds();
// const timeDiff2 =
// (end2.getHours() - start2.getHours()) * 3600 +
// (end2.getMinutes() - start2.getMinutes()) * 60 +
// end2.getSeconds() -
// start2.getSeconds() +
// storeTime;
// const oeeValue = ((((timeDiff1 / workTime) * timeDiff2) / timeDiff1) * 100).toFixed(2);
