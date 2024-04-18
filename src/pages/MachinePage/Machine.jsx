// ----------------------------------START LOCAL LIBRARY ---------------------------------------------
import style from './Machine.module.scss';

import hubConnection from '~/utils/hubConnection';
import machine1 from '~/assets/imgs/machine1.png';
import machine2 from '~/assets/imgs/machine2.png';
import machine3 from '~/assets/imgs/machine3.png';
import machine4 from '~/assets/imgs/machine4.png';
import SemiCircleBar from '~/components/SemiCircleBar';
import CircleBar from '~/components/CircleBar';
// ----------------------------------START REACT LIBRARY---------------------------------------------
import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
// --------------------------------- END LIBRARY---------------------------------------------
const css = classNames.bind(style);

function Machine() {
  const [machineImage, setMachineImage] = useState();
  const [machineSelected, setMachineSelected] = useState();
  const [workTime, setWorkTime] = useState('');
  const [runTime, setRunTime] = useState('');
  const [netRunTime, setNetRunTime] = useState('');
  const [processTime, setProcessTime] = useState('');
  const [storeTime, setStoreTime] = useState(7200);
  const [timeStamp, setTimeStamp] = useState({
    startRunTime: '2024/04/09 07:05:00',
    endRunTime: '',
    startProcessTime: '2024/04/09 09:35:00',
    endProcessTime: '',
  });
  const options = [
    { value: 'machine1', label: 'MC01-Máy số 1', image: machine1 },
    { value: 'machine2', label: 'MC01-Máy số 2', image: machine2 },
    { value: 'machine3', label: 'MC03-Máy số 3', image: machine3 },
    { value: 'machine4', label: 'MC01-Máy số 4', image: machine4 },
  ];
  const currentDate = new Date();
  const handleChange = (selectedOption) => {
    setMachineSelected(selectedOption);
  };
  const displayMachineInfomation = () => {
    setMachineImage(machineSelected?.image);
  };

  useEffect(() => {
    const myTimeout = setTimeout(() => {
      getWorkTime();
      getRunTime(timeStamp.startRunTime, timeStamp.endRunTime);
      getNetRunTime(timeStamp.startProcessTime, timeStamp.endProcessTime);
      getProcessTime(timeStamp.startProcessTime, timeStamp.endProcessTime);
    }, 1000);

    return () => clearTimeout(myTimeout);
  }, [workTime]);

  const formatTime = (time) => {
    if (time < 10) time = '0' + time;
    return time;
  };
  const getWorkTime = () => {
    const timeFormer = new Date();
    timeFormer.setHours(7, 0, 0);
    const timeLater = new Date();
    const timeDiff = timeLater.getTime() - timeFormer.getTime();
    //convert to hh:mm:ss
    var seconds = Math.floor(timeDiff / 1000);
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);

    seconds = formatTime(seconds % 60);
    minutes = formatTime(minutes % 60);
    hours = formatTime(hours % 24);
    //
    // if (timeDiff < 4 * 60 * 60 * 1000) {
    //   setWorkTime(`${hours}:${minutes}:${seconds}`);
    // } else if (timeDiff < 6 * 60 * 60 * 1000) {
    //   setWorkTime(`04:00:00`);
    // } else {
    //   setWorkTime(`${hours - 2}:${minutes}:${seconds}`);
    // }
    if (timeDiff < 8 * 60 * 60 * 1000) {
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
    <div className={css('container')}>
      <div className={css('wrapper-above')}>
        <div className={css('select-machine')}>
          <h1 className="font-bold text-[20px]">Lua chon may</h1>
          <div className="select-area flex">
            <span className="flex h-[32px] leading-[32px] min-w-[120px]">Chon khu vuc</span>
            <div className="w-[200px]">
              <Select
                options={options}
                isSearchable={false}
                menuPlacement="auto"
                maxMenu
                Height={320} // Thiết lập chiều cao tối đa của menu
                styles={{
                  control: (control, state) => ({
                    ...control,
                    height: '18px',
                    border: 'none',
                    borderBottom: '1px solid #ccc',
                  }),
                }}
              />
            </div>
          </div>
          <div className="select-machine flex">
            <span className="flex h-[32px] leading-[32px] min-w-[120px]">Chon may</span>
            <div className="w-[200px]">
              <Select
                onChange={handleChange}
                options={options}
                isSearchable={false}
                menuPlacement="auto"
                maxMenu
                Height={320} // Thiết lập chiều cao tối đa của menu
                styles={{
                  control: (control, state) => ({
                    ...control,
                    height: '18px',
                    border: 'none',
                    borderBottom: '1px solid #ccc',
                  }),
                }}
              />
            </div>
          </div>

          <div
            onClick={displayMachineInfomation}
            className="h-[36px] text-[18px] leading-[36px] text-center font-bold bg-[#99CFEB]"
          >
            Hien thi du lieu
          </div>
        </div>
        <div className={css('info-machine')}>
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
              <span className={css('content-inner-title')}>Thời gian ca làm việc:</span>
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
        <div className={css('image-machine')}>
          <img className="h-[95%]" src={machineImage} alt="" />
        </div>
      </div>
      <div className={css('wrapper-under')}>
        <div className={css('parameter-element')}>
          <h1 className="mt-[6px] ml-2 text-[18px] font-bold">Availability-Do sang sang</h1>
          <div className={css('semi-chart')}>
            <h1>Availability</h1>
            <SemiCircleBar timeDivided={runTime} timeDivisor={workTime} />
            <div>{`Thời gian vận hành: ${runTime}`}</div>
          </div>
        </div>
        <div className={css('parameter-element')}>
          <h1 className="mt-[6px] ml-2 text-[18px] font-bold">Performance-Hieu suat</h1>
          <div className={css('semi-chart')}>
            <h1>Performance</h1>
            <SemiCircleBar timeDivided={netRunTime} timeDivisor={runTime} />
            <div>{`Thời gian tạo sản phẩm: ${netRunTime}`}</div>
          </div>
        </div>
        <div className={css('parameter-element')}>
          <h1 className="mt-[6px] ml-2 text-[18px] font-bold">Quality-Chat luong</h1>
          <div className={css('semi-chart')}>
            <h1>Quality</h1>
            <SemiCircleBar timeDivided={netRunTime} timeDivisor={netRunTime} />
            <div>{`Thời gian có giá trị: ${netRunTime}`}</div>
          </div>
        </div>
        <div className={css('parameter-oee')}>
          <div>OEE(%)</div>
          <CircleBar workTime={workTime} runTime={runTime} netRunTime={netRunTime} />
        </div>
      </div>
    </div>
  );
}

export default Machine;
