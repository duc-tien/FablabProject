// ----------------------------------START LOCAL LIBRARY ---------------------------------------------
import style from './MaintenancePage.module.scss';
import { getDetail, getMachine, getProject, getWorker } from '~/services/getServices';
import Alert from '~/components/Alert';
// ----------------------------------START REACT LIBRARY---------------------------------------------
import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { list } from 'postcss';
import Select from 'react-select';

// --------------------------------- END LIBRARY---------------------------------------------
const css = classNames.bind(style);

function MaintenancePage() {
  const [alert, setAlert] = useState({ isAlert: false, content: '' });

  const [listProject, setListProject] = useState([]);
  const [listDetail, setListDetail] = useState([]);
  const [currentDetail, setCurrentDetail] = useState('');
  const [currentProject, setCurrentProject] = useState('');
  const [infoDetail, setInfoDetail] = useState({});
  useEffect(() => {
    const getDataInit = async () => {
      const listPInit = await getProject();
      setListProject(listPInit);
    };
    getDataInit();
  }, []);

  const cancelAlert = () => {
    setAlert({
      isAlert: false,
      content: '',
    });
  };
  const getListDetailOfProject = async (selectedOption) => {
    setCurrentProject(selectedOption);
    const res = await getDetail({ prjId: selectedOption.projectId });
    setListDetail(res);
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
        content: 'Vui lòng chọn chi tiết muốn nhập kho',
      });
      return false;
    }
    return true;
  };

  const getInfoDetail = async (detail) => {
    const checkResult = checkInput();
    if (checkResult) {
      const [machine] = await getMachine(detail.machineId);
      const [worker] = await getWorker(detail.workerId);
      const [project] = await getProject(detail.projectId);

      setInfoDetail(() => {
        return {
          ...detail,
          machineName: machine.machineName,
          workerName: worker.workerName,
          projectName: project.projectName,
        };
      });
    }
  };

  const handleChange = (selectedOption) => {
    setCurrentDetail(selectedOption);
  };
  return (
    <div className={css('container')}>
      <div className={css('select-area')}>
        <div className={css('select-title')}>Chọn khu vực:</div>

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

        <div className={css('select-title')}>Chọn máy:</div>

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

        <button onClick={() => getInfoDetail(currentDetail)}>Xác nhận</button>
      </div>

      {alert.isAlert && <Alert content={alert.content} onClose={cancelAlert} />}
    </div>
  );
}

export default MaintenancePage;

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

// setCurrentProject(prjId);
// const res = await getDetail({ prjId });
// setListDetail(res);
