// ----------------------------------START LOCAL LIBRARY ---------------------------------------------
import style from './Machine.module.scss';
import { addHobby, deleteHobby } from '~/redux/hobbySlice';
import ModalLogin from '~/components/ModalLogin/ModalLogin';
import { getMachine, getDetail, getWorker } from '~/services/getServices';
import Alert from '~/components/Alert';
import { listDetailFake, listMachineFake, listProjectFake, stage, oeeFake } from '~/utils/fakeData';
import Recharts from '~/components/Recharts';
import saveExcel from '~/utils/saveExcel';
// ----------------------------------START REACT LIBRARY---------------------------------------------
import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
// --------------------------------- END LIBRARY---------------------------------------------
const css = classNames.bind(style);

function Machine() {
  const [alert, setAlert] = useState({ isAlert: false, content: '' });
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [listMCInit, setListMCInit] = useState([]);
  const [currentMachine, setCurrentMachine] = useState('');
  const [currentMachineInfo, setCurrentMachineInfo] = useState({});
  const [historyOfMachine, setHistoryOfMachine] = useState([]);
  const [dataoee, setDataoee] = useState([]);
  const [curInfo, setCurInfo] = useState();
  const [view, setView] = useState();
  const retrieve = [
    {
      value: 1,
      label: 'Lịch sử sản xuất',
    },
    {
      value: 2,
      label: 'Dữ liệu OEE, Năng lượng',
    },
  ];

  useEffect(() => {
    setListMCInit(listMachineFake);
    setDataoee(oeeFake);
  }, []);

  const checkInput = () => {
    if (!startDate && !endDate) {
      setAlert({
        isAlert: true,
        content: 'Vui lòng chọn thời gian muốn tra cứu',
      });
      return false;
    }
    if (!currentMachine) {
      setAlert({
        isAlert: true,
        content: 'Vui lòng chọn máy muốn tra cứu',
      });
      return false;
    }
    return true;
  };

  const cancelAlert = () => {
    setAlert({
      isAlert: false,
      content: '',
    });
  };

  const getHistoryOfMachine = async (machine, info) => {
    // const resultCheck = checkInput();

    if (true) {
      setCurrentMachineInfo(machine);
      setView(info.value);
      const history = stage.filter((x) => x.machineId == machine.machineId);
      setHistoryOfMachine(history);

      //   if (startDate && endDate) {
      //     setHistoryOfMachine((prev) => {
      //       const filter = history.filter((e) => {
      //         const compareTime = new Date(e.startProcessTime);
      //         const dateBefore = new Date(startDate);
      //         dateBefore.setHours(7, 0, 0);
      //         const dateAfter = new Date(endDate);
      //         dateAfter.setHours(18, 0, 0);
      //         const result = compareTime >= dateBefore && compareTime <= dateAfter;
      //         return result;
      //       });
      //       return filter;
      //     });
      //   } else {
      //     setHistoryOfMachine(history);
      //   }
    }
  };
  const handleChangeMachine = (selectedOption) => {
    setCurrentMachine(selectedOption);
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
      name = `Dữ liệu OEE, Năng lượng máy ${currentMachineInfo.machineId}-${currentMachineInfo.machineName}`;
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
        <span>{currentMachineInfo?.machineId}</span>
        <span>Tên máy :</span>
        <span>{currentMachineInfo?.machineName}</span>
        <button onClick={saveFileExcel}>Xuat excel</button>
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
                  <td>{e.startProcessTime}</td>
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
          <Recharts data={dataoee} />
          <div style={{ textAlign: 'center', fontSize: '18px', marginBottom: '40px' }}>
            Đồ thị năng lượng theo thời gian
          </div>
          <table className={css('table-detail')}>
            <thead>
              <tr>
                <th>Thời gian</th>
                <th>OEE(%)</th>
                <th>Năng lượng</th>
              </tr>
            </thead>
            <tbody>
              {dataoee?.map((e, index) => {
                return (
                  <tr key={index}>
                    <td>{e.timeStamp}</td>
                    <td>{e.oee}</td>
                    <td>{e.energy}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {alert.isAlert && <Alert content={alert.content} onClose={cancelAlert} />}
    </div>
  );
}

export default Machine;
