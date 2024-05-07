// ----------------------------------START LOCAL LIBRARY ---------------------------------------------
import style from './HomePage.module.scss';
import machine1 from '~/assets/imgs/machine1.png';
import machine2 from '~/assets/imgs/machine2.png';
import ProgressBar from '~/components/ProgressBar';
import { stage } from '~/utils/fakeData';
import calculateSumTime from '~/utils/calculateSumTime';
import hubConnection from '~/utils/hubConnection';
import { getMachine, getWorker, getMachineDetailLog, getMachineELog } from '~/services/getServices';

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
  const [machineTSH1390, setMachineTSH1390] = useState({});
  const [machineERL1330, setMachineERL1330] = useState({});
  const [machineFRD900S, setMachineFRD900S] = useState({});
  const [machineKB36, setMachineKB36] = useState({});

  useEffect(() => {
    hubConnection.start();
    hubConnection.connection.on('DataMachineChanged', async (msg) => {
      const dataSignalR = JSON.parse(msg);
      const today = new Date();
      const start = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} 00:00:01`;
      const end = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} 23:00:01`;
      const tempListStage = await getMachineDetailLog(dataSignalR.machineId, start, end);
      const list = tempListStage.map((e) => {
        return {
          startTimeStamp: e.startTagging,
          endTimeStamp: e.endTagging,
        };
      });
      const accumulateNetRunTime = calculateSumTime(list);
      const [worker] = await getWorker(dataSignalR.value);
      const key = dataSignalR.name;
      const value = dataSignalR;

      switch (dataSignalR.machineId) {
        case 'TSH1390': {
          setMachineTSH1390((prev) => {
            return {
              ...prev,
              [key]: value,
              storeTime: accumulateNetRunTime,
              worker: typeof worker == 'undefined' ? prev.worker : worker,
            };
          });
          break;
        }
        case 'ERL1330': {
          setMachineERL1330((prev) => {
            return {
              ...prev,
              [key]: value,
              storeTime: accumulateNetRunTime,
              worker: typeof worker == 'undefined' ? prev.worker : worker,
            };
          });
          break;
        }
        case 'FRD900S': {
          setMachineFRD900S((prev) => {
            return {
              ...prev,
              [key]: value,
              storeTime: accumulateNetRunTime,
              worker: typeof worker == 'undefined' ? prev.worker : worker,
            };
          });
          break;
        }
        case 'KB36': {
          setMachineKB36((prev) => {
            return {
              ...prev,
              [key]: value,
              storeTime: accumulateNetRunTime,
              worker: typeof worker == 'undefined' ? prev.worker : worker,
            };
          });
          break;
        }
      }
    });
  }, [hubConnection.connection]);

  useEffect(() => {
    const getMachineInit = async () => {
      const [mcERL1330, mcTSH1390] = await getMachine('area1');
      const [mcFRD900S, mcKB36] = await getMachine('area2');
      getDataDisplayForTSH1390(mcTSH1390);
      getDataDisplayForERL1330(mcERL1330);
      getDataDisplayForFRD900S(mcFRD900S);
      getDataDisplayForKB36(mcKB36);
    };

    getMachineInit();
  }, []);
  useEffect(() => {
    const myTimeout = setTimeout(() => {
      calculateOeeTSH1390();
      calculateOeeERL1330();
      calculateOeeFRD900S();
      calculateOeeKB36();
      getWorkTime();
    }, 1000);
    return () => clearTimeout(myTimeout);
  }, [workTime]);

  const getDataDisplayForTSH1390 = async (mcTSH1390) => {
    hubConnection.connection.send('SendAllTag');
    hubConnection.connection.on('GetAll', async (msg) => {
      const res = JSON.parse(msg);
      let tempDataDisplay = {};
      for (let i = 0; i < res.length; i++) {
        if (res[i].TagValue.machineId == 'TSH1390') {
          const key = res[i].Topic;
          const data = res[i].TagValue;
          tempDataDisplay[key] = data;
        }
      }
      const [worker] = await getWorker(tempDataDisplay.Operator.value);

      const today = new Date();
      const start = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} 00:00:01`;
      const end = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} 23:00:01`;
      const tempListStage = await getMachineDetailLog('TSH1390', start, end);
      const list = tempListStage.map((e) => {
        return {
          startTimeStamp: e.startTagging,
          endTimeStamp: e.endTagging,
        };
      });
      const accumulateTime = calculateSumTime(list);
      tempDataDisplay.storeTime = accumulateTime;
      tempDataDisplay.worker = worker;
      tempDataDisplay.info = mcTSH1390;
      setMachineTSH1390(tempDataDisplay);
    });
  };
  const getDataDisplayForERL1330 = async (mcERL1330) => {
    hubConnection.connection.send('SendAllTag');
    hubConnection.connection.on('GetAll', async (msg) => {
      const res = JSON.parse(msg);
      let tempDataDisplay = {};
      for (let i = 0; i < res.length; i++) {
        if (res[i].TagValue.machineId == 'ERL1330') {
          const key = res[i].Topic;
          const data = res[i].TagValue;
          tempDataDisplay[key] = data;
        }
      }
      const [worker] = await getWorker(tempDataDisplay.Operator.value);

      const today = new Date();
      const start = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} 00:00:01`;
      const end = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} 23:00:01`;
      const tempListStage = await getMachineDetailLog('ERL1330', start, end);
      const list = tempListStage.map((e) => {
        return {
          startTimeStamp: e.startTagging,
          endTimeStamp: e.endTagging,
        };
      });
      const accumulateTime = calculateSumTime(list);
      tempDataDisplay.storeTime = accumulateTime;
      tempDataDisplay.worker = worker;
      tempDataDisplay.info = mcERL1330;
      setMachineERL1330(tempDataDisplay);
    });
  };
  const getDataDisplayForFRD900S = async (mcFRD900S) => {
    hubConnection.connection.send('SendAllTag');
    hubConnection.connection.on('GetAll', async (msg) => {
      const res = JSON.parse(msg);
      let tempDataDisplay = {};
      for (let i = 0; i < res.length; i++) {
        if (res[i].TagValue.machineId == 'FRD900S') {
          const key = res[i].Topic;
          const data = res[i].TagValue;
          tempDataDisplay[key] = data;
        }
      }
      const [worker] = await getWorker(tempDataDisplay.Operator.value);

      const today = new Date();
      const start = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} 00:00:01`;
      const end = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} 23:00:01`;
      const tempListStage = await getMachineDetailLog('FRD900S', start, end);
      const list = tempListStage.map((e) => {
        return {
          startTimeStamp: e.startTagging,
          endTimeStamp: e.endTagging,
        };
      });
      const accumulateTime = calculateSumTime(list);
      tempDataDisplay.storeTime = accumulateTime;
      tempDataDisplay.worker = worker;
      tempDataDisplay.info = mcFRD900S;
      setMachineFRD900S(tempDataDisplay);
    });
  };
  const getDataDisplayForKB36 = async (mcKB36) => {
    hubConnection.connection.send('SendAllTag');
    hubConnection.connection.on('GetAll', async (msg) => {
      const res = JSON.parse(msg);
      let tempDataDisplay = {};
      for (let i = 0; i < res.length; i++) {
        if (res[i].TagValue.machineId == 'KB36') {
          const key = res[i].Topic;
          const data = res[i].TagValue;
          tempDataDisplay[key] = data;
        }
      }
      const [worker] = await getWorker(tempDataDisplay.Operator.value);

      const today = new Date();
      const start = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} 00:00:01`;
      const end = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} 23:00:01`;
      const tempListStage = await getMachineDetailLog('KB36', start, end);
      const list = tempListStage.map((e) => {
        return {
          startTimeStamp: e.startTagging,
          endTimeStamp: e.endTagging,
        };
      });
      const accumulateTime = calculateSumTime(list);
      tempDataDisplay.storeTime = accumulateTime;
      tempDataDisplay.worker = worker;
      tempDataDisplay.info = mcKB36;
      setMachineKB36(tempDataDisplay);
    });
  };

  const calculateOeeERL1330 = () => {
    let start = new Date(machineERL1330.MaterialCodeProducting?.timestamp);
    let end = new Date(machineERL1330.MaterialCodeDone?.timestamp);
    let oeeValue;
    if (start < end) {
      const timeDiff = machineERL1330.storeTime;
      oeeValue = ((timeDiff / workTime) * 100).toFixed(2);
    } else {
      end = new Date();
      const timeDiff = (end.getTime() - start.getTime()) / 1000 + machineERL1330.storeTime;
      oeeValue = ((timeDiff / workTime) * 100).toFixed(2);
    }
    setMachineERL1330((prev) => {
      return {
        ...prev,
        oee: oeeValue,
      };
    });
  };
  const calculateOeeFRD900S = () => {
    let start = new Date(machineFRD900S.MaterialCodeProducting?.timestamp);
    let end = new Date(machineFRD900S.MaterialCodeDone?.timestamp);
    let oeeValue;
    if (start < end) {
      const timeDiff = machineFRD900S.storeTime;
      oeeValue = ((timeDiff / workTime) * 100).toFixed(2);
    } else {
      end = new Date();
      const timeDiff = (end.getTime() - start.getTime()) / 1000 + machineFRD900S.storeTime;
      oeeValue = ((timeDiff / workTime) * 100).toFixed(2);
    }
    setMachineFRD900S((prev) => {
      return {
        ...prev,
        oee: oeeValue,
      };
    });
  };
  const calculateOeeKB36 = () => {
    let start = new Date(machineKB36.MaterialCodeProducting?.timestamp);
    let end = new Date(machineKB36.MaterialCodeDone?.timestamp);
    let oeeValue;
    if (start < end) {
      const timeDiff = machineKB36.storeTime;
      oeeValue = ((timeDiff / workTime) * 100).toFixed(2);
    } else {
      end = new Date();
      const timeDiff = (end.getTime() - start.getTime()) / 1000 + machineKB36.storeTime;
      oeeValue = ((timeDiff / workTime) * 100).toFixed(2);
    }
    setMachineKB36((prev) => {
      return {
        ...prev,
        oee: oeeValue,
      };
    });
  };
  const calculateOeeTSH1390 = () => {
    let start = new Date(machineTSH1390.MaterialCodeProducting?.timestamp);
    let end = new Date(machineTSH1390.MaterialCodeDone?.timestamp);
    let oeeValue;
    if (start < end) {
      const timeDiff = machineTSH1390.storeTime;
      oeeValue = ((timeDiff / workTime) * 100).toFixed(2);
    } else {
      end = new Date();
      const timeDiff = (end.getTime() - start.getTime()) / 1000 + machineTSH1390.storeTime;
      oeeValue = ((timeDiff / workTime) * 100).toFixed(2);
    }
    setMachineTSH1390((prev) => {
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

    // if (timeDiff < 8 * 3600) {
    //   setWorkTime(timeDiff);
    // } else {
    //   setWorkTime(8 * 3600);
    // }
    if (timeDiff < 4 * 3600) {
      setWorkTime(timeDiff);
    } else if (timeDiff < 6 * 3600) {
      setWorkTime(4 * 3600);
    } else if (timeDiff > 6 * 3600 && timeDiff < 8 * 3600) {
      setWorkTime(timeDiff - 2 * 3600);
    } else {
      setWorkTime(8 * 3600);
    }
  };

  return (
    <div className={css('container')}>
      <div className={css('area-wrapper')}>
        <h1 className={css('header-area')}>Khu vực 1</h1>
        <div className={css('overview-area')}>
          <div className={css('machine-overview')}>
            <div className={css('machine-info')}>
              <div className="font-bold text-[18px] mb-[8px]">
                {`${machineTSH1390.info?.machineId}-${machineTSH1390.info?.machineName}`}
              </div>
              <div>Công nhân: {machineTSH1390.worker?.workerName}</div>
              <div>Mã chi tiết: {machineTSH1390.MaterialCodeProducting?.value}</div>
              <div>
                Trạng thái máy:
                {machineTSH1390.MachineStatus?.value == 1
                  ? 'ON'
                  : machineTSH1390.MachineStatus?.value == 2
                  ? 'Đang gia công'
                  : 'OFF'}
              </div>
              <div>
                OEE: <span>{machineTSH1390?.oee ? machineTSH1390.oee : '---'}</span>%
              </div>
              <div>Tiến trình bảo trì máy</div>
              <ProgressBar
                timeDivided={(machineTSH1390.info?.motorOperationTime / 3600).toFixed(2)}
                timeDivisor={(machineTSH1390.info?.motorMaintenanceTime / 3600).toFixed(0)}
              />
            </div>
            <div className={css('machine-image')}>
              <img className="h-[100%]" src={`data:image/png;base64,${machineTSH1390.info?.machinePicture}`} alt="" />
            </div>
          </div>
          <div className={css('machine-overview')}>
            <div className={css('machine-info')}>
              <div className="font-bold text-[18px] mb-[8px]">
                {`${machineERL1330.info?.machineId}-${machineERL1330.info?.machineName}`}
              </div>
              <div>Công nhân: {machineERL1330.worker?.workerName}</div>
              <div>Mã chi tiết: {machineERL1330.MaterialCodeProducting?.value}</div>
              <div>
                Trạng thái máy:
                {machineERL1330.MachineStatus?.value == 1
                  ? 'ON'
                  : machineERL1330.MachineStatus?.value == 2
                  ? 'Đang gia công'
                  : 'OFF'}
              </div>
              <div>
                OEE: <span>{machineERL1330?.oee ? machineERL1330.oee : '---'}</span>%
              </div>
              <div>Tiến trình bảo trì máy</div>
              <ProgressBar
                timeDivided={(machineERL1330.info?.motorOperationTime / 3600).toFixed(2)}
                timeDivisor={(machineERL1330.info?.motorMaintenanceTime / 3600).toFixed(0)}
              />
            </div>
            <div className={css('machine-image')}>
              <img className="h-[100%]" src={`data:image/png;base64,${machineERL1330.info?.machinePicture}`} alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className={css('area-wrapper')}>
        <h1 className={css('header-area')}>Khu vực 2</h1>
        <div className={css('overview-area')}>
          <div className={css('machine-overview')}>
            <div className={css('machine-info')}>
              <div className="font-bold text-[18px] mb-[8px]">
                {`${machineFRD900S.info?.machineId}-${machineFRD900S.info?.machineName}`}
              </div>
              <div>Công nhân: {machineFRD900S.worker?.workerName}</div>
              <div>Mã chi tiết: {machineFRD900S.MaterialCodeProducting?.value}</div>
              <div>
                Trạng thái máy:
                {machineFRD900S.MachineStatus?.value == 1
                  ? 'ON'
                  : machineFRD900S.MachineStatus?.value == 2
                  ? 'Đang gia công'
                  : 'OFF'}
              </div>
              <div>
                OEE: <span>{machineFRD900S?.oee ? machineFRD900S.oee : '---'}</span>%
              </div>
              <div>Tiến trình bảo trì máy</div>
              <ProgressBar
                timeDivided={(machineFRD900S.info?.motorOperationTime / 3600).toFixed(2)}
                timeDivisor={(machineFRD900S.info?.motorMaintenanceTime / 3600).toFixed(0)}
              />
            </div>
            <div className={css('machine-image')}>
              <img className="h-[100%]" src={`data:image/png;base64,${machineFRD900S.info?.machinePicture}`} alt="" />
            </div>
          </div>
          <div className={css('machine-overview')}>
            <div className={css('machine-info')}>
              <div className="font-bold text-[18px] mb-[8px]">
                {`${machineKB36.info?.machineId}-${machineKB36.info?.machineName}`}
              </div>
              <div>Công nhân: {machineKB36.worker?.workerName}</div>
              <div>Mã chi tiết: {machineKB36.MaterialCodeProducting?.value}</div>
              <div>
                Trạng thái máy:
                {machineKB36.MachineStatus?.value == 1
                  ? 'ON'
                  : machineKB36.MachineStatus?.value == 2
                  ? 'Đang gia công'
                  : 'OFF'}
              </div>
              <div>
                OEE: <span>{machineKB36?.oee ? machineKB36.oee : '---'}</span>%
              </div>
              <div>Tiến trình bảo trì máy</div>
              <ProgressBar
                timeDivided={(machineKB36.info?.motorOperationTime / 3600).toFixed(2)}
                timeDivisor={(machineKB36.info?.motorMaintenanceTime / 3600).toFixed(0)}
              />
            </div>
            <div className={css('machine-image')}>
              <img className="h-[100%]" src={`data:image/png;base64,${machineKB36.info?.machinePicture}`} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
