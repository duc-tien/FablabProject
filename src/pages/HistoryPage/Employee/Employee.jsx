// ----------------------------------START LOCAL LIBRARY ---------------------------------------------
import style from './Employee.module.scss';
import { getWorker, getWorkerLog } from '~/services/getServices';
import { listWorkerFake, stage } from '~/utils/fakeData';
import noUser from '~/assets/imgs/noUser.jpg';
import saveExcel from '~/utils/saveExcel';
import calculateTime from '~/utils/calculateTime';
import Loading from '~/components/Loading';
import { formatTimeFull, formatTimeWithOnlyDate } from '~/utils/formatTime';

// ----------------------------------START REACT LIBRARY---------------------------------------------
import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import moment from 'moment';
import { faL } from '@fortawesome/free-solid-svg-icons';
// --------------------------------- END LIBRARY---------------------------------------------
const css = classNames.bind(style);

function Employee() {
  const [enableExport, setEnableExport] = useState(false);
  const [load, setLoad] = useState(false);
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
    const today = moment().format('YYYY-MM-DD');
    const sevenDaysAgo = moment().subtract(7, 'days').format('YYYY-MM-DD');

    setStartDate(sevenDaysAgo);
    setEndDate(today);
  }, []);

  const checkInput = () => {
    if (!currentWorker) {
      alert('Vui lòng chọn nhân viên muốn tra cứu');

      return false;
    }
    return true;
  };

  const getHistoryOfWorker = async (worker) => {
    const checkResult = checkInput();
    if (checkResult) {
      setLoad(true);
      const res = await getWorkerLog(worker.workerId, `${startDate} 00:00:01`, `${endDate} 23:59:59`);
      const history = res.map((e) => {
        const processTime = calculateTime(e.startTagging, e.endTagging, 0);
        let newStartTagging = formatTimeFull(e.startTagging);
        return {
          ...e,
          processTime: processTime,
          startTagging: newStartTagging,
        };
      });
      setHistoryOfWorker(history);
      setCurrentWorkerInfo(worker);
      setLoad(false);
      setEnableExport(true);
    }
  };
  const handleChange = (selectedOption) => {
    setCurrentWorker(selectedOption);
  };
  const saveFileExcel = () => {
    let data, headers, name;
    data = historyOfWorker.map((e) => {
      return {
        detailId: e.detailId,
        machine: `${e.machineId} • ${e.machineName}`,
        startProcessTime: e.startTagging,
        processTime: e.processTime,
      };
    });

    headers = [
      { header: 'Mã chi tiết', key: 'detailId', width: 20 },
      { header: 'Vị trí máy', key: 'machine', width: 35 },
      { header: 'Thời điểm gia công', key: 'startProcessTime', width: 20 },
      { header: 'Thời gian gia công', key: 'processTime', width: 20 },
    ];

    name = `Lịch sử làm việc ${currentWorkerInfo.workerId}-${currentWorkerInfo.workerName} (${startDate} đến ${endDate})`;

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
        <div className={css('select-title')}>Chọn công nhân </div>

        <div style={{ width: '280px' }}>
          <Select
            value={currentWorker}
            onChange={handleChange}
            options={listWorkerInit?.map((option) => ({
              ...option,
              value: option.workerId,
              label: `${option.workerId} • ${option.workerName}`,
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
        <img src={`data:image/png;base64,${currentWorkerInfo?.fileData}`} className={css('worker-avatar')}></img>
        <div className={css('worker-info')}>
          <div>{currentWorkerInfo?.workerName}</div>
          <div>
            <b>Mã định danh :</b> {currentWorkerInfo?.workerId}
          </div>
          <div>
            <b>Khu vực:</b> {currentWorkerInfo.noteArea}
          </div>
        </div>
      </div>
      <div className={css('export-excel')}>{enableExport && <button onClick={saveFileExcel}>Xuất excel</button>}</div>
      <table className={css('table-detail')}>
        <thead>
          <tr>
            <th>Mã chi tiết</th>
            <th>Vị trí máy</th>
            <th>Thời điểm gia công</th>
            <th>Thời gian gia công</th>
          </tr>
        </thead>
        <tbody>
          {historyOfWorker?.map((e, index) => {
            return (
              <tr key={index}>
                <td>{e.detailId}</td>
                <td>{`${e.machineId} • ${e.machineName}`}</td>
                <td>{e.startTagging}</td>
                <td>{e.processTime}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {load && <Loading />}
    </div>
  );
}

export default Employee;
