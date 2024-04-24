// ----------------------------------START LOCAL LIBRARY ---------------------------------------------
import style from './Machine.module.scss';

import hubConnection from '~/utils/hubConnection';
import machine1 from '~/assets/imgs/machine1.png';
import machine2 from '~/assets/imgs/machine2.png';
import machine3 from '~/assets/imgs/machine3.png';
import machine4 from '~/assets/imgs/machine4.png';
import SemiCircleBar from '~/components/SemiCircleBar';
import CircleBar from '~/components/CircleBar';
import { listAreaFake, stage } from '~/utils/fakeData';
import calculateTime from '~/utils/calculateTime';
import calculateSumTime from '~/utils/calculateSumTime';
import { activeMachine } from '~/redux/projectSlice';
// ----------------------------------START REACT LIBRARY---------------------------------------------
import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import axios from 'axios';
// --------------------------------- END LIBRARY---------------------------------------------
const css = classNames.bind(style);

function Machine() {
  const dispatch = useDispatch();
  const [listArea, setListArea] = useState([]);
  const [currentArea, setCurrentArea] = useState('');
  const [currentMachineId, setCurrentMachineId] = useState('');
  const [machineImage, setMachineImage] = useState();
  const [machineSelected, setMachineSelected] = useState();
  const [workTime, setWorkTime] = useState('');
  const [runTime, setRunTime] = useState('');
  const [netRunTime, setNetRunTime] = useState('');
  const [processTime, setProcessTime] = useState('');
  const [storeTime, setStoreTime] = useState();
  const [timeStamp, setTimeStamp] = useState({
    startRunTime: '',
    endRunTime: '',
    startProcessTime: '',
    endProcessTime: '',
  });
  useEffect(() => {
    hubConnection.start();
    hubConnection.connection.on('TagChanged', (msg) => {
      if (msg.machine == currentMachineId) {
        setTimeStamp({
          startRunTime: msg.startRunTime,
          endRunTime: msg.endRunTime,
          startProcessTime: msg.startProcessTime,
          endProcessTime: msg.endProcessTime,
        });
      }
    });
    return () => {
      hubConnection.connection.off('TagChanged');
    };
  }, [hubConnection.connection, currentMachineId]);

  const options = [
    { value: 'MC01', label: 'MC01-Máy số 1', image: machine1 },
    { value: 'MC02', label: 'MC02-Máy số 2', image: machine2 },
  ];
  const currentDate = new Date();

  useEffect(() => {
    setListArea(listAreaFake);
  }, []);
  useEffect(() => {
    const myTimeout = setTimeout(() => {
      getWorkTime();
      getRunTime(timeStamp.startRunTime, timeStamp.endRunTime);
      getNetRunTime(timeStamp.startProcessTime, timeStamp.endProcessTime);
      getProcessTime(timeStamp.startProcessTime, timeStamp.endProcessTime);
    }, 1000);

    return () => clearTimeout(myTimeout);
  }, [workTime, timeStamp, runTime, netRunTime]);

  const formatTime = (time) => {
    if (time < 10) time = '0' + time;
    return time;
  };
  const getWorkTime = () => {
    const timeFormer = new Date();
    timeFormer.setHours(7, 0, 0);
    const timeLater = new Date();
    const timeDiff = timeLater.getTime() - timeFormer.getTime();

    var seconds = Math.floor(timeDiff / 1000);
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);

    seconds = formatTime(seconds % 60);
    minutes = formatTime(minutes % 60);
    hours = formatTime(hours % 24);
    if (timeDiff < 8 * 60 * 60 * 1000) {
      setWorkTime(`${hours}:${minutes}:${seconds}`);
    } else {
      setWorkTime(`08:00:00`);
    }
  };
  const getRunTime = (startTime, endTime) => {
    const duration = calculateTime(startTime, endTime, 0);
    setRunTime(duration);
  };
  const getNetRunTime = (startTime, endTime) => {
    const duration = calculateTime(startTime, endTime, storeTime);
    setNetRunTime(duration);
  };
  const getProcessTime = (startTime, endTime) => {
    const duration = calculateTime(startTime, endTime, 0);
    setProcessTime(duration);
  };

  const getListMachineOfProject = async (selectedOption) => {
    setCurrentArea(selectedOption);
  };
  const handleChange = (selectedOption) => {
    setMachineSelected(selectedOption);
  };

  const displayMachineInfomation = async () => {
    setMachineImage(machineSelected?.image);
    setCurrentMachineId(machineSelected?.value);
    const tempList = stage.filter((x) => x.machineId == machineSelected.value);
    const list = tempList.map((e) => {
      return {
        startTimeStamp: e.startProcessTime,
        endTimeStamp: e.endProcessTime,
      };
    });
    const accumulateTime = calculateSumTime(list);
    setStoreTime(accumulateTime);

    const { data } = await axios.get('https://localhost:7245/Message');
    const singalRMachine = data.find((e) => {
      return e.machine == machineSelected.value;
    });

    setTimeStamp({
      startRunTime: singalRMachine.startRunTime,
      endRunTime: singalRMachine.endRunTime,
      startProcessTime: singalRMachine.startProcessTime,
      endProcessTime: singalRMachine.endProcessTime,
    });
  };

  return (
    <div className={css('container')}>
      <div className={css('wrapper-above')}>
        <div className={css('select-machine')}>
          <h1 className="font-bold text-[20px]">Lựa chọn máy</h1>
          <div className="select-area flex">
            <span className="flex h-[32px] leading-[32px] min-w-[120px]">Chọn khu vực</span>
            <div className="w-[200px]">
              <Select
                value={currentArea}
                onChange={getListMachineOfProject}
                options={listArea?.map((option) => ({
                  ...option,
                  value: option.areaId,
                  label: `${option.areaName}`,
                }))}
                isSearchable={false}
                menuPlacement="auto"
                maxMenuHeight={250}
                styles={{
                  control: (control, state) => ({
                    ...control,
                    border: 'none',
                    borderBottom: '1px solid #ccc',
                  }),
                }}
              />
            </div>
          </div>
          <div className="select-machine flex">
            <span className="flex h-[32px] leading-[32px] min-w-[120px]">Chọn máy</span>
            <div className="w-[200px]">
              <Select
                value={machineSelected}
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
            className="h-[36px] text-[18px] cursor-pointer leading-[36px] text-center font-bold bg-[#99CFEB]"
          >
            Hiển thị dữ liệu
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
          <h1 className="mt-[6px] ml-2 text-[18px] font-bold">Availability-Độ sẵn sàng</h1>
          <div className={css('semi-chart')}>
            <h1>Availability</h1>
            <SemiCircleBar timeDivided={runTime} timeDivisor={workTime} />
            <div>{`Thời gian vận hành: ${runTime}`}</div>
          </div>
        </div>
        <div className={css('parameter-element')}>
          <h1 className="mt-[6px] ml-2 text-[18px] font-bold">Performance-Hiệu suất</h1>
          <div className={css('semi-chart')}>
            <h1>Performance</h1>
            <SemiCircleBar timeDivided={netRunTime} timeDivisor={runTime} />
            <div>{`Thời gian tạo sản phẩm: ${netRunTime}`}</div>
          </div>
        </div>
        <div className={css('parameter-element')}>
          <h1 className="mt-[6px] ml-2 text-[18px] font-bold">Quality-Chất lượng</h1>
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

//
// if (timeDiff < 4 * 60 * 60 * 1000) {
//   setWorkTime(`${hours}:${minutes}:${seconds}`);
// } else if (timeDiff < 6 * 60 * 60 * 1000) {
//   setWorkTime(`04:00:00`);
// } else {
//   setWorkTime(`${hours - 2}:${minutes}:${seconds}`);
// }
