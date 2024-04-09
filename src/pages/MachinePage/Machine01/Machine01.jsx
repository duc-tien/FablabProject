// ----------------------------------START LOCAL LIBRARY ---------------------------------------------
import style from './Machine01.module.scss';
import { login } from '~/services/loginService';
import CircleBar from '~/components/CircleBar';
import SemiCircleBar from '~/components/SemiCircleBar';
import { Machine001 } from '~/assets/imgs';
import hubConnection from '~/utils/hubConnection';

// ----------------------------------START REACT LIBRARY---------------------------------------------
import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// --------------------------------- END  LIBRARY---------------------------------------------
const css = classNames.bind(style);
function Machine01() {
  const [workTime, setWorkTime] = useState('');
  const [runTime, setRunTime] = useState('');
  const [netRunTime, setNetRunTime] = useState('');
  const [processTime, setProcessTime] = useState('');
  const [storeTime, setStoreTime] = useState(1850000);
  const [timeStamp, setTimeStamp] = useState({
    startRunTime: '',
    endRunTime: '',
    startProcessTime: '',
    endProcessTime: '',
  });

  const currentDate = new Date();

  useEffect(() => {
    hubConnection.start();
    hubConnection.connection.on('TagChanged', (msg) => {
      setTimeStamp((prev) => {
        return {
          startRunTime: msg.startRunTime,
          endRunTime: msg.endRunTime,
          startProcessTime: msg.startProcessTime,
          endProcessTime: msg.endProcessTime,
        };
      });
      setStoreTime(parseInt(msg.storeTime));
    });
    return () => {
      hubConnection.connection.off('TagChanged');
    };
  }, [hubConnection.connection]);

  useEffect(() => {
    const myTimeout = setTimeout(() => {
      getWorkTime();
      getRunTime(timeStamp.startRunTime, timeStamp.endRunTime);
      getNetRunTime(timeStamp.startProcessTime, timeStamp.endProcessTime);
      getProcessTime(timeStamp.startProcessTime, timeStamp.endProcessTime);
      // getRunTime('2024/04/09 18:32:00', '');
      // getNetRunTime('2024/04/09 15:46:00', '');
      // getProcessTime('2024/04/09 15:46:00', '');
    }, 1000);

    return () => clearTimeout(myTimeout);
  }, [workTime]);

  const formatTime = (time) => {
    if (time < 10) time = '0' + time;
    return time;
  };
  const getWorkTime = () => {
    const timeFormer = new Date();
    const timeLater = new Date();
    timeFormer.setHours(7, 0, 0);
    const timeDiff = timeLater.getTime() - timeFormer.getTime() + storeTime;
    if (timeDiff < 8 * 60 * 60 * 1000) {
      var seconds = Math.floor(timeDiff / 1000);
      var minutes = Math.floor(seconds / 60);
      var hours = Math.floor(minutes / 60);

      seconds = formatTime(seconds % 60);
      minutes = formatTime(minutes % 60);
      hours = formatTime(hours % 24);

      setWorkTime(`${hours}:${minutes}:${seconds}`);
    } else {
      setWorkTime(`08:00:00`);
    }
  };
  const getRunTime = (startTime, endTime) => {
    if (startTime) {
      const timeFormer = new Date(startTime);
      let timeLater;
      if (endTime) {
        timeLater = new Date(endTime);
      } else {
        timeLater = new Date();
      }
      const timeDiff = timeLater.getTime() - timeFormer.getTime();
      var seconds = Math.floor(timeDiff / 1000);
      var minutes = Math.floor(seconds / 60);
      var hours = Math.floor(minutes / 60);

      seconds = formatTime(seconds % 60);
      minutes = formatTime(minutes % 60);
      hours = formatTime(hours % 24);

      setRunTime(`${hours}:${minutes}:${seconds}`);
    } else {
      setRunTime(`00:00:00`);
    }
  };
  const getNetRunTime = (startTime, endTime) => {
    if (startTime) {
      const timeFormer = new Date(startTime);
      let timeLater;
      if (endTime) {
        timeLater = new Date(endTime);
      } else {
        timeLater = new Date();
      }
      const timeDiff = timeLater.getTime() - timeFormer.getTime() + storeTime * 1000;
      var seconds = Math.floor(timeDiff / 1000);
      var minutes = Math.floor(seconds / 60);
      var hours = Math.floor(minutes / 60);

      seconds = formatTime(seconds % 60);
      minutes = formatTime(minutes % 60);
      hours = formatTime(hours % 24);

      setNetRunTime(`${hours}:${minutes}:${seconds}`);
    } else {
      setNetRunTime(`00:00:00`);
    }
  };
  const getProcessTime = (startTime, endTime) => {
    if (startTime) {
      const timeFormer = new Date(startTime);
      let timeLater;
      if (endTime) {
        timeLater = new Date(endTime);
      } else {
        timeLater = new Date();
      }
      const timeDiff = timeLater.getTime() - timeFormer.getTime();
      var seconds = Math.floor(timeDiff / 1000);
      var minutes = Math.floor(seconds / 60);
      var hours = Math.floor(minutes / 60);

      seconds = formatTime(seconds % 60);
      minutes = formatTime(minutes % 60);
      hours = formatTime(hours % 24);

      setProcessTime(`${hours}:${minutes}:${seconds}`);
    } else {
      setProcessTime(`00:00:00`);
    }
  };
  return (
    <div className={css('machine01')}>
      <div className={css('machine-info')}>
        <div className={css('machine-info-above')}>
          <div className={css('machine-info-detail')}>
            MC01-Máy khoan
            <div className={css('content-inner')}>
              <div>
                <span className={css('content-inner-title')}>Ngày làm việc: </span>
                <span>{`${currentDate.getFullYear()}/${formatTime(currentDate.getMonth() + 1)}/${formatTime(
                  currentDate.getDate(),
                )}`}</span>
              </div>
              <div>
                <span className={css('content-inner-title')}>Trạng thái hoạt động: </span>
                <span>ON</span>
              </div>
              <div>
                <span className={css('content-inner-title')}>Năng lượng: </span>
                <span>27kW</span>
              </div>
              <div>
                <span className={css('content-inner-title')}>Thời gian làm việc:</span>
                <span>{workTime}</span>
              </div>
              <div>
                <span className={css('content-inner-title')}>Nhân viên: </span>
                <span>Nguyễn Văn A</span>
              </div>
              <div>
                <span className={css('content-inner-title')}>Chi tiết gia công: </span>
                <span>IF-AB01-02</span>
              </div>
              <div>
                <span className={css('content-inner-title')}>Thời gian gia công:</span>
                <span>{processTime}</span>
              </div>
            </div>
          </div>
          <div className={css('machine-info-oee')}>
            <div>OEE(%)</div>
            <CircleBar workTime={workTime} runTime={runTime} netRunTime={netRunTime} />
          </div>
        </div>
        <div className={css('machine-info-under')}>
          <div className={css('semi-chart')}>
            <h1>Avaibility</h1>
            <SemiCircleBar timeDivided={runTime} timeDivisor={workTime} />
            <div>{`Thời gian vận hành: ${runTime}`}</div>
          </div>
          <div className={css('semi-chart')}>
            <h1>Performance</h1>
            <SemiCircleBar timeDivided={netRunTime} timeDivisor={runTime} />
            <div>{`Thời gian tạo sản phẩm: ${netRunTime}`}</div>
          </div>
          <div className={css('semi-chart')}>
            <h1>Quality</h1>
            <SemiCircleBar timeDivided={netRunTime} timeDivisor={netRunTime} />
            <div>{`Thời gian có giá trị: ${netRunTime}`}</div>
          </div>
        </div>
      </div>
      <div className={css('machine-illustrate')}>
        <Machine001 />
      </div>
    </div>
  );
}

export default Machine01;

// useEffect(() => {
//   hubConnection.start();
//   hubConnection.connection.send('SendAllTag');
//   hubConnection.connection.on('GetAll', (msg) => {
//     console.log('alltag :', msg);
//   });

//   hubConnection.connection.on('TagChanged', (msg) => {
//     console.log(msg);
//   });
//   return () => {
//     hubConnection.connection.off('TagChanged');
//     hubConnection.connection.off('GetAll');
//   };
// }, [hubConnection.connection]);

// const [timeStamp, setTimeStamp] = useState({
//   start: '',
//   end: '',
// });
