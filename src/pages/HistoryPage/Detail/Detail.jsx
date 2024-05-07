// ----------------------------------START LOCAL LIBRARY ---------------------------------------------
import style from './Detail.module.scss';
import { listProjectFake, listDetailFake, stage } from '~/utils/fakeData';
import saveExcel from '~/utils/saveExcel';
import calculateTime from '~/utils/calculateTime';
import Loading from '~/components/Loading';
import { getDetailLog, getProject, getListDetail } from '~/services/getServices';
import { formatTimeFull, formatTimeWithOnlyDate } from '~/utils/formatTime';

// ----------------------------------START REACT LIBRARY---------------------------------------------
import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { list } from 'postcss';
import Select from 'react-select';

// --------------------------------- END LIBRARY---------------------------------------------
const css = classNames.bind(style);

function Detail() {
  const [enableExport, setEnableExport] = useState(false);
  const [load, setLoad] = useState(false);
  const [listProject, setListProject] = useState([]);
  const [listDetail, setListDetail] = useState([]);
  const [currentDetail, setCurrentDetail] = useState('');
  const [currentProject, setCurrentProject] = useState('');
  const [infoDetail, setInfoDetail] = useState({});
  const [stageDetail, setStageDetail] = useState([]);
  useEffect(() => {
    const getDataInit = async () => {
      const res = await getProject();
      setListProject(res);
    };
    getDataInit();
  }, []);

  const getListDetailOfProject = async (selectedOption) => {
    setCurrentProject(selectedOption);
    const res = await getListDetail(selectedOption.projectId);
    setListDetail(res);
    setCurrentDetail('');
  };

  const checkInput = () => {
    if (!currentProject) {
      alert('Vui lòng chọn dự án ');
      return false;
    }

    if (!currentDetail) {
      alert('Vui lòng chọn chi tiết muốn tra cứu');
      return false;
    }
    return true;
  };

  const getInfoDetail = async (detail) => {
    const checkResult = checkInput();
    if (checkResult) {
      setLoad(true);
      const res = await getDetailLog(detail.detailId);

      const tempHistory = res.logForDetailFull.map((e) => {
        const processTime = calculateTime(e.startTagging, e.endTagging, 0);
        let newStartTagging = formatTimeFull(e.startTagging);
        return {
          ...e,
          processTime: processTime,
          startTagging: newStartTagging,
        };
      });

      let newStartTimePre = formatTimeWithOnlyDate(res.startTimePre);

      let newEndTimePre = formatTimeWithOnlyDate(res.endTimePre);

      let status;
      if (res.detailStatus == 0) status = 'Chưa gia công';
      if (res.detailStatus == 1) status = 'Gia công';
      if (res.detailStatus == 2) status = 'Hoàn thành gia công';

      const tempInfo = {
        ...res,
        startTimePre: newStartTimePre,
        endTimePre: newEndTimePre,
        logForDetailFull: tempHistory,
        detailStatus: status,
      };

      setInfoDetail(tempInfo);
      setLoad(false);
      setEnableExport(true);
    }
  };

  const handleChange = (selectedOption) => {
    setCurrentDetail(selectedOption);
  };

  const saveFileExcel = () => {
    const data = infoDetail.logForDetailFull.map((e) => {
      return {
        machine: `${e.machineId} • ${e.machineName}`,
        worker: `${e.workerId} • ${e.workerName}`,
        startProcessTime: e.startTagging,
        processTime: e.processTime,
      };
    });

    const headers = [
      { header: 'Vị trí máy', key: 'machine', width: 35 },
      { header: 'Nhân viên', key: 'worker', width: 35 },
      { header: 'Thời điểm gia công', key: 'startProcessTime', width: 20 },
      { header: 'Thời gian gia công', key: 'processTime', width: 20 },
    ];

    const name = `Công đoạn gia công của chi tiết ${infoDetail.detailId}`;
    saveExcel(headers, data, name);
  };
  return (
    <div className={css('container')}>
      <div className={css('select-area')}>
        <div className={css('select-title')}>Chọn dự án:</div>

        <div style={{ width: '280px' }}>
          <Select
            value={currentProject}
            onChange={getListDetailOfProject}
            options={listProject?.map((option) => ({
              ...option,
              value: option.projectId,
              label: `${option.projectId} • ${option.projectName}`,
            }))}
            isSearchable={false}
            menuPlacement="auto"
            maxMenuHeight={250}
            styles={{
              control: (control, state) => ({
                ...control,
                border: 'none',
                borderBottom: '1px solid #ccc',
              }),
            }}
          />
        </div>

        <div className={css('select-title')}>Chọn chi tiết:</div>

        <div style={{ width: '280px' }}>
          <Select
            value={currentDetail}
            onChange={handleChange}
            options={listDetail?.map((option) => ({
              ...option,
              value: option.detailId,
              label: `${option.detailId} • ${option.detailName}`,
            }))}
            isSearchable={false}
            menuPlacement="auto"
            maxMenuHeight={250}
            styles={{
              control: (control, state) => ({
                ...control,
                border: 'none',
                borderBottom: '1px solid #ccc',
              }),
            }}
          />
        </div>

        <button onClick={() => getInfoDetail(currentDetail)}>Truy xuất</button>
      </div>
      <h1>Thông tin truy xuất</h1>
      <div className={css('info-detail-area')}>
        <div className={css('info-detail')}>
          <span>Mã chi tiết:</span>
          <span>{infoDetail?.detailId}</span>
          <span>Mã dự án:</span>
          <span>{infoDetail?.projectId}</span>
          <span>Thời gian ban hành:</span>
          <span>{infoDetail.startTimePre}</span>
        </div>
        <div className={css('info-detail')}>
          <span>Tên chi tiết:</span>
          <span>{infoDetail?.detailName}</span>
          <span>Tên dự án:</span>
          <span>{infoDetail?.projectName}</span>
          <span>Thời gian dự kiến kết thúc:</span>
          <span>{infoDetail?.endTimePre}</span>
        </div>
        <div className={css('info-detail')}>
          <span>Trạng thái:</span>
          <span>{infoDetail?.detailStatus}</span>
        </div>
        <div className={css('info-detail')}>
          <span>Công đoạn dự kiến:</span>
          <span>{infoDetail?.noteLog}</span>
        </div>
        <div className={css('info-detail')}>
          <span>Công đoạn đã qua:</span>
          {enableExport && <button onClick={saveFileExcel}>Xuất excel</button>}
        </div>
      </div>
      <table className={css('table-detail')}>
        <thead>
          <tr>
            <th>Vị trí máy</th>
            <th>Nhân viên</th>
            <th>Thời điểm gia công</th>
            <th>Thời gian gia công</th>
          </tr>
        </thead>
        <tbody>
          {infoDetail.logForDetailFull?.map((e, index) => {
            return (
              <tr key={index}>
                <td>{`${e.machineId} • ${e.machineName}`}</td>
                <td>{`${e.workerId} • ${e.workerName}`}</td>
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

export default Detail;
