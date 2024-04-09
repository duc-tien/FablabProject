// ----------------------------------START LOCAL LIBRARY ---------------------------------------------
import style from './Employee.module.scss';
import { addHobby, deleteHobby } from '~/redux/hobbySlice';
import ModalLogin from '~/components/ModalLogin/ModalLogin';
import { getWorker, getDetail, getMachine } from '~/services/getServices';
import Alert from '~/components/Alert';
// ----------------------------------START REACT LIBRARY---------------------------------------------
import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
// --------------------------------- END LIBRARY---------------------------------------------
const css = classNames.bind(style);

function Employee() {
  const [alert, setAlert] = useState({ isAlert: false, content: '' });
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [listWorkerInit, setListWorkerInit] = useState([]);
  const [currentWorker, setCurrentWorker] = useState('');
  const [currentWorkerInfo, setCurrentWorkerInfo] = useState({});
  const [historyOfWorker, setHistoryOfWorker] = useState([]);

  useEffect(() => {
    const getDataInit = async () => {
      const res = await getWorker();
      setListWorkerInit(res);
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
    if (!currentWorker) {
      setAlert({
        isAlert: true,
        content: 'Vui lòng chọn nhân viên muốn tra cứu',
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

  const getHistoryOfWorker = async (worker) => {
    const checkResult = checkInput();
    if (checkResult) {
      setCurrentWorkerInfo(worker);
      const history = await getDetail({ workerId: worker.workerId });
      let alterHistory = [];
      for (const value of history) {
        const [machine] = await getMachine(value.machineId);
        alterHistory = [...alterHistory, { ...value, machineName: machine.machineName }];
      }

      if (startDate && endDate) {
        setHistoryOfWorker((prev) => {
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
        setHistoryOfWorker(alterHistory);
      }
    }
  };
  const handleChange = (selectedOption) => {
    setCurrentWorker(selectedOption);
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
        <div className={css('select-title')}>Chọn nhân viên</div>

        <div style={{ width: '220px' }}>
          <Select
            value={currentWorker}
            onChange={handleChange}
            options={listWorkerInit?.map((option) => ({
              ...option,
              value: option.workerId,
              label: `${option.workerId}---${option.workerName}`,
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
        <button onClick={() => getHistoryOfWorker(currentWorker)}>Truy xuất</button>
      </div>
      <h1>Thông tin truy xuất</h1>
      <div className={css('info-worker')}>
        <span>Mã nhân viên:</span>
        <span>{currentWorkerInfo?.workerId}</span>
        <span>Tên nhân viên:</span>
        <span>{currentWorkerInfo?.workerName}</span>
      </div>
      <table className={css('table-detail')}>
        <thead>
          <tr>
            <th>Mã chi tiết</th>
            {/* <th>Tên chi tiết</th> */}
            <th>Vị trí máy</th>
            {/* <th>Tên máy</th> */}
            <th>Thời điểm gia công</th>
            <th>Thời gian gia công</th>
          </tr>
        </thead>
        <tbody>
          {historyOfWorker?.map((e, index) => {
            return (
              <tr key={index}>
                <td>{e.detailId}</td>
                {/* <td>{e.detailName}</td> */}
                <td>{e.machineId}</td>
                {/* <td>{e.machineName}</td> */}
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

export default Employee;

{
  /* <select
          value={currentWorker}
          onChange={(e) => setCurrentWorker(e.target.value)}
          className={css('select-input')}
        >
          {listWorkerInit?.map((wk, index) => {
            return <option key={index} value={JSON.stringify(wk)}>{`${wk.workerId} - ${wk.workerName}`}</option>;
          })}
        </select> */
}

// const infoWorker = JSON.parse(currentWorker);
// const history = await getDetail({ workerId: infoWorker.workerId });
