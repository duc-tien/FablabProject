// ----------------------------------START LOCAL LIBRARY ---------------------------------------------
import style from './Project.module.scss';
import { getDetail, getMachine, getProject, getWorker } from '~/services/getServices';
import { listProjectFake, listDetailFake, stage } from '~/utils/fakeData';
import Loading from '~/components/Loading';
import saveExcel from '~/utils/saveExcel';
import { postProject } from '~/services/postServices';
// ----------------------------------START REACT LIBRARY---------------------------------------------
import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { list } from 'postcss';
import Select from 'react-select';

// --------------------------------- END LIBRARY---------------------------------------------
const css = classNames.bind(style);

function Project() {
  const [load, setLoad] = useState(false);
  const [imgURL, setImgURL] = useState('');
  const [isOpen, setISOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [listDetailFilter, setListDetailFilter] = useState([]);
  const [listProject, setListProject] = useState([]);
  const [currentProject, setCurrentProject] = useState('');
  const [currentProjectInfo, setCurrentProjectInfo] = useState({});
  useEffect(() => {
    setListProject(listProjectFake);
  }, []);

  const getDetailOfProject = async (project) => {
    const checkResult = checkInput();
    if (checkResult) {
      setLoad(true);
      await postProject({});
      const tempListDetail = listDetailFake.filter((x) => x.projectId == project.projectId);
      setListDetailFilter(tempListDetail);
      setCurrentProjectInfo(project);
      setLoad(false);
    }
  };
  const handleChange = (selectedOption) => {
    setCurrentProject(selectedOption);
  };

  const checkInput = () => {
    if (!currentProject) {
      alert('Vui lòng chọn dự án muốn tra cứu');

      return false;
    }
    return true;
  };
  const saveFileExcel = () => {};
  return (
    <div className={css('container')}>
      <div className={css('select-area')}>
        <div className={css('select-title')}>Chọn dự án:</div>

        <div style={{ width: '280px' }}>
          <Select
            value={currentProject}
            onChange={handleChange}
            options={listProject?.map((option) => ({
              ...option,
              value: option.projectId,
              label: `${option.projectId}---${option.projectName}`,
            }))}
            isSearchable={false}
            menuPlacement="auto"
            maxMenuHeight={320} // Thiết lập chiều cao tối đa của menu
          />
        </div>

        <button onClick={() => getDetailOfProject(currentProject)}>Truy xuất</button>
      </div>
      <h1>Thông tin truy xuất</h1>
      <div className={css('info-detail-area')}>
        <div className={css('info-detail')}>
          <span>Mã dự án:</span>
          <span>{currentProjectInfo?.projectId}</span>
          <span>Tên dự án:</span>
          <span>{currentProjectInfo?.projectName}</span>
          <button onClick={saveFileExcel}>Xuất excel</button>
        </div>
      </div>
      <table className={css('table-detail')}>
        <thead>
          <tr>
            <th>Mã chi tiết</th>
            <th>Ngày ban hành</th>
            <th>Kỳ vọng</th>
            <th>Trạng thái</th>
            <th>Ảnh chi tiết</th>
          </tr>
        </thead>
        <tbody>
          {listDetailFilter?.map((detail, index) => {
            return (
              <tr key={index}>
                <td>{detail.detailId}</td>
                <td>{detail.startTime}</td>
                <td>{detail.endTime}</td>
                <td>{detail.detailStatus}</td>
                <td>Xem chi tiết</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {isOpen && (
        <div
          onClick={() => {
            setISOpen(false);
          }}
          className={css('lightbox')}
        >
          <img src={imgURL} alt="" />
        </div>
      )}
      {load && <Loading />}
    </div>
  );
}

export default Project;
