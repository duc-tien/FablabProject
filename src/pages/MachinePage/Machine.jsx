// ----------------------------------START LOCAL LIBRARY ---------------------------------------------
import style from './Machine.module.scss';

import hubConnection from '~/utils/hubConnection';

import SemiCircleBar from '~/components/SemiCircleBar';
import CircleBar from '~/components/CircleBar';
import calculateTime from '~/utils/calculateTime';
import calculateSumTime from '~/utils/calculateSumTime';
import { getArea, getMachine, getWorker, getMachineDetailLog, getMachineELog } from '~/services/getServices';
import ProgressBar from '~/components/ProgressBar';
// ----------------------------------START REACT LIBRARY---------------------------------------------
import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import axios from 'axios';
// --------------------------------- END LIBRARY---------------------------------------------
const css = classNames.bind(style);

function Machine() {
  const [listAreaInit, setListAreaInit] = useState([]);
  const [listMCInit, setListMCInit] = useState([]);
  const [currentArea, setCurrentArea] = useState('');
  const [machineSelected, setMachineSelected] = useState();
  const [currentMachine, setCurrentMachine] = useState('');
  const [machineImage, setMachineImage] = useState();
  const [workTime, setWorkTime] = useState('');
  const [runTime, setRunTime] = useState('');
  const [netRunTime, setNetRunTime] = useState('');
  const [processTime, setProcessTime] = useState('');
  const [dataForDisplay, setDataForDisplay] = useState({});

  useEffect(() => {
    hubConnection.start();
    hubConnection.connection.on('DataMachineChanged', async (msg) => {
      const dataSignalR = JSON.parse(msg);
      const today = new Date();
      const start = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} 00:00:01`;
      const end = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} 23:00:01`;

      const tempListStage = await getMachineDetailLog(machineSelected.machineId, start, end);
      const list1 = tempListStage.map((e) => {
        return {
          startTimeStamp: e.startTagging,
          endTimeStamp: e.endTagging,
        };
      });
      const tempListELog = await getMachineELog(machineSelected.machineId, start, end);
      const list2 = tempListELog.map((e) => {
        return {
          startTimeStamp: e.startTagging,
          endTimeStamp: e.endTagging,
        };
      });

      const accumulateNetRunTime = calculateSumTime(list1);
      const accumulateRunTime = calculateSumTime(list2);
      const key = dataSignalR.name;
      const data = dataSignalR;
      const [worker] = await getWorker(dataSignalR.value);

      if (dataSignalR.machineId == currentMachine.machineId) {
        setDataForDisplay((prev) => {
          return {
            ...prev,
            [key]: data,
            storeRunTime: accumulateRunTime,
            storeNetRunTime: accumulateNetRunTime,
            worker: typeof worker == 'undefined' ? prev.worker : worker,
          };
        });
      }
    });

    return () => {
      hubConnection.connection.off('DataMachineChanged');
    };
  }, [hubConnection.connection, currentMachine]);

  const currentDate = new Date();

  useEffect(() => {
    const getDataInit = async () => {
      const res = await getArea();
      setListAreaInit(res);
    };
    getDataInit();
  }, []);
  useEffect(() => {
    const myTimeout = setTimeout(() => {
      getWorkTime();
      getRunTime(dataForDisplay.MachineStatusOn?.timestamp, dataForDisplay.MachineStatusOff?.timestamp);
      getNetRunTime(dataForDisplay.MaterialCodeProducting?.timestamp, dataForDisplay.MaterialCodeDone?.timestamp);
      getProcessTime(dataForDisplay.MaterialCodeProducting?.timestamp, dataForDisplay.MaterialCodeDone?.timestamp);
    }, 1000);

    return () => clearTimeout(myTimeout);
  }, [workTime, runTime, netRunTime, dataForDisplay]);

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
    if (timeDiff < 4 * 3600 * 1000) {
      setWorkTime(`${hours}:${minutes}:${seconds}`);
    } else if (timeDiff < 6 * 3600 * 1000) {
      setWorkTime(`04:00:00`);
    } else if (timeDiff > 6 * 3600 * 1000 && timeDiff < 8 * 3600 * 1000) {
      setWorkTime(`${hours - 2}:${minutes}:${seconds}`);
    } else {
      setWorkTime('08:00:00');
    }
  };
  const getRunTime = (startTime, endTime) => {
    const duration = calculateTime(startTime, endTime, dataForDisplay.storeRunTime);
    setRunTime(duration);
  };
  const getNetRunTime = (startTime, endTime) => {
    const duration = calculateTime(startTime, endTime, dataForDisplay.storeNetRunTime);
    setNetRunTime(duration);
  };
  const getProcessTime = (startTime, endTime) => {
    const duration = calculateTime(startTime, endTime, 0);
    setProcessTime(duration);
  };

  const handleChangeArea = async (selectedOption) => {
    setCurrentArea(selectedOption);
    const res = await getMachine(selectedOption.areaId);
    setListMCInit(res);
    setMachineSelected('');
  };
  const handleChangeMachine = (selectedOption) => {
    setMachineSelected(selectedOption);
  };

  const checkInput = () => {
    if (!currentArea) {
      alert('Vui lòng chọn khu vực ');
      return false;
    }

    if (!machineSelected) {
      alert('Vui lòng chọn máy');
      return false;
    }
    return true;
  };
  const displayMachineInfomation = async () => {
    const checkResult = checkInput();
    if (checkResult) {
      setMachineImage(machineSelected?.machinePicture);
      setCurrentMachine(machineSelected);

      hubConnection.connection.send('SendAllTag');
      hubConnection.connection.on('GetAll', async (msg) => {
        const res = JSON.parse(msg);
        let tempDataDisplay = {};
        for (let i = 0; i < res.length; i++) {
          if (res[i].TagValue.machineId == machineSelected.machineId) {
            const key = res[i].Topic;
            const data = res[i].TagValue;
            tempDataDisplay[key] = data;
          }
        }
        const [worker] = await getWorker(tempDataDisplay.Operator.value);

        const today = new Date();
        const start = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} 00:00:01`;
        const end = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} 23:00:01`;

        const tempListStage = await getMachineDetailLog(machineSelected.machineId, start, end);
        const list1 = tempListStage.map((e) => {
          return {
            startTimeStamp: e.startTagging,
            endTimeStamp: e.endTagging,
          };
        });
        const tempListELog = await getMachineELog(machineSelected.machineId, start, end);
        const list2 = tempListELog.map((e) => {
          return {
            startTimeStamp: e.startTagging,
            endTimeStamp: e.endTagging,
          };
        });

        const accumulateNetRunTime = calculateSumTime(list1);
        const accumulateRunTime = calculateSumTime(list2);
        tempDataDisplay.storeNetRunTime = accumulateNetRunTime;
        tempDataDisplay.storeRunTime = accumulateRunTime;
        tempDataDisplay.worker = worker;
        setDataForDisplay(tempDataDisplay);
      });
    }
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
                onChange={handleChangeArea}
                options={listAreaInit?.map((option) => ({
                  ...option,
                  value: option.areaId,
                  label: option.description,
                }))}
                isSearchable={false}
                menuPlacement="auto"
                maxMenuHeight={150}
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
                onChange={handleChangeMachine}
                options={listMCInit?.map((option) => ({
                  ...option,
                  value: option.machineId,
                  label: `${option.machineId} • ${option.machineName}`,
                }))}
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
          {`${currentMachine?.machineId}-${currentMachine?.machineName}`}
          <div className={css('content-inner')}>
            <div className={css('div')}>
              <span className={css('content-inner-title')}>Ngày làm việc: </span>
              <span>{`${currentDate.getFullYear()}/${formatTime(currentDate.getMonth() + 1)}/${formatTime(
                currentDate.getDate(),
              )}`}</span>
            </div>
            <div className={css('div')}>
              <span className={css('content-inner-title')}>Trạng thái hoạt động: </span>
              <span>
                {dataForDisplay.MachineStatus?.value == 1
                  ? 'ON'
                  : dataForDisplay.MachineStatus?.value == 2
                  ? 'Đang gia công'
                  : 'OFF'}
              </span>
            </div>
            <div className={css('div')}>
              <span className={css('content-inner-title')}>Thời gian ca làm việc:</span>
              <span>{workTime}</span>
            </div>
            <div className={css('div')}>
              <span className={css('content-inner-title')}>Công nhân: </span>
              <span>{`${dataForDisplay.worker?.workerId} • ${dataForDisplay.worker?.workerName}`}</span>
            </div>
            <div className={css('div')}>
              <span className={css('content-inner-title')}>Chi tiết gia công: </span>
              <span>{dataForDisplay.MaterialCodeProducting?.value}</span>
            </div>
            <div className={css('div')}>
              <span className={css('content-inner-title')}>Thời gian gia công chi tiết:</span>
              <span>{processTime}</span>
            </div>
            <div className={css('div')}>
              <span className={css('content-inner-title')}>Tiến trình bảo trì: </span>
              <ProgressBar
                timeDivided={(currentMachine?.motorOperationTime / 3600).toFixed(2)}
                timeDivisor={(currentMachine?.motorMaintenanceTime / 3600).toFixed(0)}
              />
            </div>
          </div>
        </div>
        <div className={css('image-machine')}>
          <img className="h-[95%]" src={`data:image/png;base64,${machineImage}`} />
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
