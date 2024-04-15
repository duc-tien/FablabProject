// ----------------------------------START LOCAL LIBRARY ---------------------------------------------
import style from './Detail.module.scss';
import { addHobby, deleteHobby } from '~/redux/hobbySlice';
import ModalLogin from '~/components/ModalLogin/ModalLogin';
import { getDetail, getMachine, getProject, getWorker } from '~/services/getServices';
import Alert from '~/components/Alert';
import { listProjectFake, listDetailFake, stage } from '~/utils/fakeData';
import saveExcel from '~/utils/saveExcel';
// ----------------------------------START REACT LIBRARY---------------------------------------------
import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { list } from 'postcss';
import Select from 'react-select';

// --------------------------------- END LIBRARY---------------------------------------------
const css = classNames.bind(style);

function Detail() {
  const [alert, setAlert] = useState({ isAlert: false, content: '' });

  const [listProject, setListProject] = useState([]);
  const [listDetail, setListDetail] = useState([]);
  const [currentDetail, setCurrentDetail] = useState('');
  const [currentProject, setCurrentProject] = useState('');
  const [infoDetail, setInfoDetail] = useState({});
  const [stageDetail, setStageDetail] = useState([]);
  useEffect(() => {
    setListProject(listProjectFake);
  }, []);

  const cancelAlert = () => {
    setAlert({
      isAlert: false,
      content: '',
    });
  };
  const getListDetailOfProject = async (selectedOption) => {
    setCurrentProject(selectedOption);
    const tempListDetail = listDetailFake.filter((x) => x.projectId == selectedOption.projectId);
    setListDetail(tempListDetail);
    setCurrentDetail('');
  };

  const checkInput = () => {
    if (!currentProject) {
      setAlert({
        isAlert: true,
        content: 'Vui lòng chọn dự án muốn tra cứu',
      });
      return false;
    }

    if (!currentDetail) {
      setAlert({
        isAlert: true,
        content: 'Vui lòng chọn chi tiết muốn tra cứu',
      });
      return false;
    }
    return true;
  };

  const getInfoDetail = async (detail) => {
    const checkResult = checkInput();
    const stageOfDetail = stage.filter((x) => x.detailId == detail.detailId);
    console.log(stageOfDetail);
    setStageDetail(stageOfDetail);
    if (checkResult) {
      setInfoDetail(() => {
        return {
          ...detail,
          projectName: currentProject.projectName,
        };
      });
    }
  };

  const handleChange = (selectedOption) => {
    setCurrentDetail(selectedOption);
  };

  const saveFileExcel = () => {
    const data = stageDetail.map((e) => {
      return {
        detailId: e.detailId,
        machineId: e.machineId,
        workerId: e.workerId,
        processTime: e.processTime,
      };
    });

    const headers = [
      { header: 'Mã chi tiết', key: 'detailId', width: 20 },
      { header: 'Vị trí máy', key: 'machineId', width: 20 },
      { header: 'Mã công nhân', key: 'workerId', width: 20 },
      { header: 'Thời gian gian công', key: 'processTime', width: 20 },
    ];

    saveExcel(headers, data);
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
              label: `${option.projectId}---${option.projectName}`,
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
              label: `${option.detailId}---${option.detailName}`,
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
          <span>{infoDetail.startTime}</span>
        </div>
        <div className={css('info-detail')}>
          <span>Tên chi tiết:</span>
          <span>{infoDetail?.detailName}</span>
          <span>Tên dự án:</span>
          <span>{infoDetail?.projectName}</span>
          <span>Thời gian dự kiến kết thúc:</span>
          <span>{infoDetail?.endTime}</span>
        </div>
        <div className={css('info-detail')}>
          <span>Công đoạn dự kiến:</span>
          <span>{infoDetail?.stage}</span>
        </div>
        <div className={css('info-detail')}>
          <span>Công đoạn đã qua:</span>
        </div>
      </div>
      <table className={css('table-detail')}>
        <thead>
          <tr>
            <th>Vị trí máy</th>
            <th>Công nhân</th>
            <th>Thời điểm gia công</th>
            <th>Thời gian gia công</th>
          </tr>
        </thead>
        <tbody>
          {stageDetail?.map((e, index) => {
            return (
              <tr key={index}>
                <td>{e.machineLabel}</td>
                <td>{e.workerId}</td>
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

export default Detail;

{
  /* <select
          className={css('select-input')}
          value={currentProject}
          onChange={(e) => getListDetailOfProject(e.target.value)}
        >
          <option hidden value="">
            Select option...
          </option>
          {listProject?.map((project, index) => {
            return (
              <option key={index} value={project.projectId}>
                {`${project.projectId}--${project.projectName}`}
              </option>
            );
          })}
        </select> */
}

{
  /* <select
          className={css('select-input')}
          value={currentDetail}
          onChange={(e) => setCurrentDetail(e.target.value)}
        >
          <option hidden value="">
            Select option...
          </option>
          {listDetail?.map((detail, index) => {
            return (
              <option key={index} value={JSON.stringify(detail)}>{`${detail.detailId}--${detail.detailName}`}</option>
            );
          })}
        </select> */
}

// const alterDetail = JSON.parse(currentDetail);
// const [machine] = await getMachine(alterDetail.machineId);
// const [worker] = await getWorker(alterDetail.workerId);
// const [project] = await getProject(alterDetail.projectId);
