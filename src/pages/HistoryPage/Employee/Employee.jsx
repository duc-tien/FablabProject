// ----------------------------------START LOCAL LIBRARY ---------------------------------------------
import style from './Employee.module.scss';
import { addHobby, deleteHobby } from '~/redux/hobbySlice';
import ModalLogin from '~/components/ModalLogin/ModalLogin';
import { getWorker, getDetail, getMachine } from '~/services/getServices';
import Alert from '~/components/Alert';
import { listWorkerFake, stage } from '~/utils/fakeData';
import noUser from '~/assets/imgs/noUser.jpg';
import saveExcel from '~/utils/saveExcel';
import calculateTime from '~/utils/calculateTime';
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
  const url = '';

  useEffect(() => {
    setListWorkerInit(listWorkerFake);
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
    // const checkResult = checkInput();
    if (true) {
      setCurrentWorkerInfo(worker);
      const tempHistory = stage.filter((x) => x.workerId == worker.workerId);
      const history = tempHistory.map((e) => {
        const processTime = calculateTime(e.startProcessTime, e.endProcessTime, 0);
        return {
          ...e,
          processTime: processTime,
        };
      });
      setHistoryOfWorker(history);

      // if (startDate && endDate) {
      //   setHistoryOfWorker((prev) => {
      //     const filter = alterHistory.filter((e) => {
      //       const compareTime = new Date(e.startTime);
      //       const dateBefore = new Date(startDate);
      //       dateBefore.setHours(7, 0, 0);
      //       const dateAfter = new Date(endDate);
      //       dateAfter.setHours(18, 0, 0);
      //       const result = compareTime >= dateBefore && compareTime <= dateAfter;
      //       return result;
      //     });
      //     return filter;
      //   });
      // } else {
      //   setHistoryOfWorker(alterHistory);
      // }
    }
  };
  const handleChange = (selectedOption) => {
    setCurrentWorker(selectedOption);
  };
  const saveFileExcel = () => {
    let data, headers, name;
    if (true) {
      data = historyOfWorker.map((e) => {
        return {
          detailId: e.detailId,
          machineId: e.machineId,
          startProcessTime: e.startProcessTime,
          processTime: e.processTime,
        };
      });

      headers = [
        { header: 'Mã chi tiết', key: 'detailId', width: 20 },
        { header: 'Vị trí máy', key: 'machineId', width: 20 },
        { header: 'Thời điểm gia công', key: 'startProcessTime', width: 20 },
        { header: 'Thời gian gia công', key: 'processTime', width: 20 },
      ];

      name = `Lịch sử làm việc ${currentWorkerInfo.workerId}-${currentWorkerInfo.workerName} từ ${startDate} đến ${endDate}`;
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
      <div className={css('info-container')}>
        <img src={currentWorkerInfo?.avatar || noUser} className={css('worker-avatar')}></img>
        <div className={css('worker-info')}>
          <div>{currentWorkerInfo?.workerName}</div>
          <div>
            <b>Mã định danh :</b> {currentWorkerInfo?.workerId}
          </div>
          <div>
            <b>Khu vực:</b> {currentWorkerInfo.area}
          </div>
        </div>
      </div>
      <div className={css('export-excel')}>
        <button onClick={saveFileExcel}>Xuất excel</button>
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
                <td>{e.machineLabel}</td>
                {/* <td>{e.machineName}</td> */}
                <td>{e.startProcessTime}</td>
                <td>{e.processTime}</td>
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
