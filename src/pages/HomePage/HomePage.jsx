// ----------------------------------START LOCAL LIBRARY ---------------------------------------------
import style from './HomePage.module.scss';
import machine1 from '~/assets/imgs/machine1.png';
import machine2 from '~/assets/imgs/machine2.png';
import ProgressBar from '~/components/ProgressBar';
import { stage } from '~/utils/fakeData';
import calculateSumTime from '~/utils/calculateSumTime';
import hubConnection from '~/utils/hubConnection';
import { getArea, getMachine, getWorker, getMachineDetailLog } from '~/services/getServices';

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
  const [machineTSH1390, setMachineTSH1390] = useState({});

  useEffect(() => {
    hubConnection.start();
  }, [hubConnection.connection]);

  useEffect(() => {
    const getMachineInit = async () => {
      const [mcERL, mcTSH1390] = await getMachine('area1');
      getDataDisplayForTSH1390(mcTSH1390);
    };

    setTimeout(() => {
      getMachineInit();
    }, 50);
  }, []);

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
      const [worker] = await getWorker(tempDataDisplay.MaterialCodeProducting.operatorid);

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

  useEffect(() => {
    const myTimeout = setTimeout(() => {
      getWorkTime();
      calculateOeeTSH1390();
    }, 1000);
    return () => clearTimeout(myTimeout);
  }, [workTime]);

  const calculateOeeTSH1390 = () => {
    let start = new Date(machineTSH1390.MaterialCodeProducting.timestamp);
    let end = new Date(machineTSH1390.MaterialCodeDone.timestamp);
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
              <div className="font-bold text-[18px] mb-[8px]">MC01-May so 1</div>
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
