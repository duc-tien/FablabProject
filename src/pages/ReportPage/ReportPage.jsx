// ----------------------------------START LOCAL LIBRARY ---------------------------------------------
import style from './ReportPage.module.scss';
import { addHobby, deleteHobby } from '~/redux/hobbySlice';
import ModalLogin from '~/components/ModalLogin/ModalLogin';
import instance from '~/utils/api';
import Recharts from '~/components/Recharts';
import { data1, data2 } from '~/utils/fakeoee';
import { getMachine, getOEE } from '~/services/getServices';
import Alert from '~/components/Alert';
import BackToTop from '~/components/BackToTop';

// ----------------------------------START REACT LIBRARY---------------------------------------------
import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// --------------------------------- END LIBRARY---------------------------------------------
const css = classNames.bind(style);

function ReportPage() {
  const divRef = useRef(null);
  const [alert, setAlert] = useState({ isAlert: false, content: '' });
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [listMCInit, setListMCInit] = useState([]);
  const [currentMachine, setCurrentMachine] = useState('');
  const [showBackTop, setShowBackTop] = useState(false);
  const [dataoee, setDataoee] = useState([]);

  useEffect(() => {
    const getDataInit = async () => {
      const res = await getMachine();
      setListMCInit(res);
      setCurrentMachine(res[0].machineId);
    };
    getDataInit();
    setDataoee(data2);
  }, []);
  const cancelAlert = () => {
    setAlert({
      isAlert: false,
      content: '',
    });
  };
  const scrollToTop = () => {
    if (divRef.current) {
      divRef.current.scrollTop = 0;
    }
  };

  const handleScroll = (pos) => {
    if (pos > 0) {
      setShowBackTop(true);
    } else setShowBackTop(false);
  };
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

  const getHistoryOEE = async (machineId) => {
    const checkResult = checkInput();
    if (checkResult) {
      const history = await getOEE(machineId, startDate, endDate);
      history.map((e) => {
        return (e.oee = e.oee * 100);
      });
      setDataoee(history);
    }
  };
  return (
    <div ref={divRef} onScroll={(e) => handleScroll(e.target.scrollTop)} className={css('container')}>
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
        <select
          className={css('select-input')}
          value={currentMachine}
          onChange={(e) => setCurrentMachine(e.target.value)}
        >
          <option value="">MC01-Máy khoan </option>
          {listMCInit?.map((machine, index) => {
            return (
              <option key={index} value={machine.machineId}>{`${machine.machineId} (${machine.machineName})`}</option>
            );
          })}
        </select>
        <button onClick={() => getHistoryOEE(currentMachine)}>Tra cứu</button>
      </div>
      <Recharts data={dataoee} />
      <h1>Thông tin truy xuất</h1>
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
      {showBackTop && <BackToTop func={scrollToTop} />}
      {alert.isAlert && <Alert content={alert.content} onClose={cancelAlert} />}
    </div>
  );
}

export default ReportPage;
