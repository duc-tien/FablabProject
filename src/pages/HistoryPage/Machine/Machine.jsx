// ----------------------------------START LOCAL LIBRARY ---------------------------------------------
import style from './Machine.module.scss';
import { addHobby, deleteHobby } from '~/redux/hobbySlice';
import ModalLogin from '~/components/ModalLogin/ModalLogin';
import { getMachine, getDetail, getWorker } from '~/services/getServices';
import Alert from '~/components/Alert';

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

  useEffect(() => {
    const getDataInit = async () => {
      const res = await getMachine();
      setListMCInit(res);
    };
    getDataInit();
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
  const getHistoryOfMachine = async (machine) => {
    const resultCheck = checkInput();

    if (resultCheck) {
      setCurrentMachineInfo(machine);
      const history = await getDetail({ machineId: machine.machineId });
      let alterHistory = [];
      for (const value of history) {
        const [worker] = await getWorker(value.workerId);
        alterHistory = [...alterHistory, { ...value, workerName: worker.workerName }];
      }

      if (startDate && endDate) {
        setHistoryOfMachine((prev) => {
          const filter = alterHistory.filter((e) => {
            const compareTime = new Date(e.startTime);
            const dateBefore = new Date(startDate);
            const dateAfter = new Date(endDate);
            const result = compareTime >= dateBefore && compareTime <= dateAfter;
            return result;
          });
          return filter;
        });
      } else {
        setHistoryOfMachine(alterHistory);
      }
    }
  };
  const handleChange = (selectedOption) => {
    setCurrentMachine(selectedOption);
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
        <div className={css('select-title')}>Chọn máy</div>

        <div style={{ width: '220px' }}>
          <Select
            value={currentMachine}
            onChange={handleChange}
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
        <button onClick={() => getHistoryOfMachine(currentMachine)}>Truy xuất</button>
      </div>
      <h1>Thông tin truy xuất</h1>
      <div className={css('info-machine')}>
        <span>Mã máy :</span>
        <span>{currentMachineInfo?.machineId}</span>
        <span>Tên máy :</span>
        <span>{currentMachineInfo?.machineName}</span>
      </div>
      <table className={css('table-detail')}>
        <thead>
          <tr>
            <th>Mã chi tiết</th>
            {/* <th>Tên chi tiết</th> */}
            <th>Mã nhân viên</th>
            {/* <th>Tên nhân viên</th> */}
            <th>Thời điểm gia công</th>
            <th>Thời gian gia công</th>
          </tr>
        </thead>
        <tbody>
          {historyOfMachine?.map((e, index) => {
            return (
              <tr key={index}>
                <td>{e.detailId}</td>
                {/* <td>{e.detailName}</td> */}
                <td>{e.workerId}</td>
                {/* <td>{e.workerName}</td> */}
                <td>{e.startTime}</td>
                <td>{`00:00:00`}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {alert.isAlert && <Alert content={alert.content} onClose={cancelAlert} />}
    </div>
  );
}

export default Machine;

{
  /* <select
          className={css('select-input')}
          value={currentMachine}
          onChange={(e) => setCurrentMachine(e.target.value)}
        >
          {listMCInit?.map((machine, index) => {
            return (
              <option
                key={index}
                value={JSON.stringify(machine)}
              >{`${machine.machineId} (${machine.machineName})`}</option>
            );
          })}
        </select> */
}

// const infoMachine = JSON.parse(currentMachine);
// const history = await getDetail({ machineId: infoMachine.machineId });
