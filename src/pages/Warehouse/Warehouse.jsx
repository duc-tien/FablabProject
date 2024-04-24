// ----------------------------------START LOCAL LIBRARY ---------------------------------------------
import style from './Warehouse.module.scss';
import { listProjectFake, listDetailFake, stage } from '~/utils/fakeData';

import Alert from '~/components/Alert';
// ----------------------------------START REACT LIBRARY---------------------------------------------
import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { list } from 'postcss';
import Select from 'react-select';

// --------------------------------- END LIBRARY---------------------------------------------
const css = classNames.bind(style);

function Warehouse() {
  const [alert, setAlert] = useState({ isAlert: false, content: '' });
  const [listProject, setListProject] = useState([]);
  const [listDetail, setListDetail] = useState([]);
  const [currentDetail, setCurrentDetail] = useState('');
  const [currentProject, setCurrentProject] = useState('');
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

        <button onClick={() => getInfoDetail(currentDetail)}>Xác nhận hoàn thành</button>
      </div>

      {alert.isAlert && <Alert content={alert.content} onClose={cancelAlert} />}
    </div>
  );
}

export default Warehouse;

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
