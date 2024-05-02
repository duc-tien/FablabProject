// ----------------------------------START LOCAL LIBRARY ---------------------------------------------
import style from './Machine.module.scss';
import { getArea, getMachine, getMachineDetailLog, getMachineError, getMachineOEE } from '~/services/getServices';
import { listDetailFake, listMachineFake, listProjectFake, stage, oeeFake } from '~/utils/fakeData';
import Recharts from '~/components/Recharts';
import saveExcel from '~/utils/saveExcel';
import calculateTime from '~/utils/calculateTime';
import Loading from '~/components/Loading';
import { postProject } from '~/services/postServices';
// ----------------------------------START REACT LIBRARY---------------------------------------------
import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import moment from 'moment';

// --------------------------------- END LIBRARY---------------------------------------------
const css = classNames.bind(style);

function Machine() {
  const [load, setLoad] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [listAreaInit, setListAreaInit] = useState([]);
  const [listMCInit, setListMCInit] = useState([]);
  const [currentArea, setCurrentArea] = useState('');
  const [currentMachine, setCurrentMachine] = useState('');
  const [currentMachineInfo, setCurrentMachineInfo] = useState({});
  const [historyOfMachine, setHistoryOfMachine] = useState([]);
  const [dataoee, setDataoee] = useState([]);
  const [dataError, setDataError] = useState([]);
  const [curInfo, setCurInfo] = useState();
  const [view, setView] = useState();
  const retrieve = [
    {
      value: 1,
      label: 'Lịch sử sản xuất',
    },
    {
      value: 2,
      label: 'Dữ liệu OEE',
    },
    {
      value: 3,
      label: 'Dữ liệu lỗi',
    },
  ];

  useEffect(() => {
    const getDataInit = async () => {
      const res = await getArea();
      setListAreaInit(res);
    };
    getDataInit();
    setDataoee(oeeFake);
    const today = moment().format('YYYY-MM-DD');
    const sevenDaysAgo = moment().subtract(7, 'days').format('YYYY-MM-DD');

    setStartDate(sevenDaysAgo);
    setEndDate(today);
  }, []);

  const checkInput = () => {
    if (!currentMachine) {
      alert('Vui lòng chọn máy muốn tra cứu');
      return false;
    }
    if (!curInfo) {
      alert('Vui lòng chọn thông tin muốn tra cứu');
      return false;
    }
    return true;
  };

  const getHistoryOfMachine = async (machine, info) => {
    const resultCheck = checkInput();

    if (resultCheck) {
      setLoad(true);

      // switch (info.value) {
      // case 1: {
      const resLog = await getMachineDetailLog(machine.machineId, `${startDate} 00:00:01`, `${endDate} 23:59:59`);

      const history = resLog.map((e) => {
        const processTime = calculateTime(e.startTagging, e.endTagging, 0);
        let newStartTagging = e.startTagging.replace(/-/g, '/');
        newStartTagging = newStartTagging.replace('T', ' ');
        newStartTagging = newStartTagging.substring(0, 19);
        return {
          ...e,
          processTime: processTime,
          startTagging: newStartTagging,
        };
      });

      setHistoryOfMachine(history);
      // break;
      // }
      // case 2: {
      const resOEE = await getMachineOEE(machine.machineId, `${startDate} 00:00:01`, `${endDate} 23:59:59`);
      const historyOEE = resOEE.map((e) => {
        let newTimeStamp = e.timeStamp.replace(/-/g, '/');
        newTimeStamp = newTimeStamp.replace('T', ' ');
        newTimeStamp = newTimeStamp.substring(0, 19);
        return {
          ...e,
          timeStamp: newTimeStamp,
        };
      });

      setDataoee(historyOEE);
      // break;
      // }
      // case 3: {
      const resError = await getMachineError(machine.machineId, `${startDate} 00:00:01`, `${endDate} 23:59:59`);
      const historyError = resError.map((e) => {
        let newErrorTime = e.errorTime.replace(/-/g, '/');
        newErrorTime = newErrorTime.replace('T', ' ');
        newErrorTime = newErrorTime.substring(0, 11);
        return {
          ...e,
          errorTime: newErrorTime,
        };
      });

      setDataError(historyError);
      // break;
      // }
      // }

      setView(info.value);

      setLoad(false);
    }
  };
  const handleChangeMachine = (selectedOption) => {
    setCurrentMachine(selectedOption);
  };
  const handleChangeArea = async (selectedOption) => {
    setCurrentArea(selectedOption);
    const res = await getMachine(selectedOption.areaId);
    setListMCInit(res);
    setCurrentMachine('');
  };
  const handleChangeInfo = (selectedOption) => {
    setCurInfo(selectedOption);
  };

  const saveFileExcel = () => {
    let data, headers, name;
    if (view == 1) {
      data = historyOfMachine.map((e) => {
        return {
          detailId: e.detailId,
          workerId: e.workerId,
          startProcessTime: e.startProcessTime,
          processTime: e.processTime,
        };
      });

      headers = [
        { header: 'Mã chi tiết', key: 'detailId', width: 20 },
        { header: 'Mã nhân viên', key: 'workerId', width: 20 },
        { header: 'Thời điểm gia công', key: 'startProcessTime', width: 20 },
        { header: 'Thời gian gia công', key: 'processTime', width: 20 },
      ];

      name = `Lịch sử máy ${currentMachineInfo.machineId}-${currentMachineInfo.machineName}`;
    } else {
      data = dataoee;
      headers = [
        { header: 'Thời gian', key: 'timeStamp', width: 20 },
        { header: 'OEE', key: 'oee', width: 20 },
        { header: 'Năng lượng', key: 'energy', width: 20 },
      ];
      name = `Dữ liệu OEE máy ${currentMachineInfo.machineId}-${currentMachineInfo.machineName}`;
    }

    saveExcel(headers, data, name);
  };
  return (
    <div className={css('container')}>
      <div className={css('select-area')}>
        <div className={css('select-title')}>Từ ngày:</div>
        <input
          className={css('select-input')}
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <div className={css('select-title')}>Đến ngày:</div>
        <input
          className={css('select-input')}
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <div className={css('select-area')}>
        <div className={css('select-title')}>Chọn khu vực</div>
        <div style={{ width: '220px' }}>
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
        <div className={css('select-title')}>Chọn máy</div>
        <div style={{ width: '220px' }}>
          <Select
            value={currentMachine}
            onChange={handleChangeMachine}
            options={listMCInit?.map((option) => ({
              ...option,
              value: option.machineId,
              label: `${option.machineId}---${option.machineName}`,
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
      <div className={css('select-area')}>
        <div style={{ width: '180px' }} className={css('select-title')}>
          Chọn thông tin truy xuất
        </div>
        <div style={{ width: '220px' }}>
          <Select
            value={curInfo}
            onChange={handleChangeInfo}
            options={retrieve}
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
        <button onClick={() => getHistoryOfMachine(currentMachine, curInfo)}>Truy xuất</button>
      </div>

      <h1>Thông tin truy xuất</h1>
      <div className={css('info-machine')}>
        <span>Mã máy :</span>
        <span>{historyOfMachine[0]?.machineId}</span>
        <span>Tên máy :</span>
        <span>{historyOfMachine[0]?.machineName}</span>
        <button onClick={saveFileExcel}>Xuất excel</button>
      </div>
      {view == 1 && (
        <table className={css('table-detail')}>
          <thead>
            <tr>
              <th>Mã chi tiết</th>
              <th>Mã nhân viên</th>
              <th>Thời điểm gia công</th>
              <th>Thời gian gia công</th>
            </tr>
          </thead>
          <tbody>
            {historyOfMachine?.map((e, index) => {
              return (
                <tr key={index}>
                  <td>{e.detailId}</td>
                  <td>{e.workerId}</td>
                  <td>{e.startTagging}</td>
                  <td>{e.processTime}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {view == 2 && (
        <div>
          <Recharts data={dataoee} />
          <div style={{ textAlign: 'center', fontSize: '18px', marginBottom: '40px' }}>
            Đồ thị OEE(%) theo thời gian
          </div>
          <table className={css('table-detail')}>
            <thead>
              <tr>
                <th>Thời gian</th>
                <th>OEE(%)</th>
              </tr>
            </thead>
            <tbody>
              {dataoee?.map((e, index) => {
                return (
                  <tr key={index}>
                    <td>{e.timeStamp}</td>
                    <td>{e.oee}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {view == 3 && (
        <div>
          <table className={css('table-detail')}>
            <thead>
              <tr>
                <th>Thời gian</th>
                <th>Lỗi ghi chú</th>
              </tr>
            </thead>
            <tbody>
              {dataError?.map((e, index) => {
                return (
                  <tr key={index}>
                    <td>{e.errorTime}</td>
                    <td>{e.errorName}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {load && <Loading />}
    </div>
  );
}

export default Machine;
