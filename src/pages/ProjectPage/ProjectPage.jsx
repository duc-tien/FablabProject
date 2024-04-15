// ----------------------------------START LOCAL LIBRARY ---------------------------------------------
import style from './ProjectPage.module.scss';
import { addHobby, deleteHobby } from '~/redux/hobbySlice';
import ModalLogin from '~/components/ModalLogin/ModalLogin';
import { getProject, getDetail } from '~/services/getServices';
import Loading from '~/components/Loading';
import { listProjectFake, listDetailFake } from '~/utils/fakeData';
// ----------------------------------START REACT LIBRARY---------------------------------------------
import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
// --------------------------------- END LIBRARY---------------------------------------------
const css = classNames.bind(style);

function ProjectPage() {
  const [imgURL, setImgURL] = useState('');
  const [isOpen, setISOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [listDetailFilter, setListDetailFilter] = useState([]);
  const [listProject, setListProject] = useState([]);
  const [currentProject, setCurrentProject] = useState('');
  const [currentProjectInfo, setCurrentProjectInfo] = useState({});

  // useEffect(() => {
  //   let tempArr = [];
  //   for (let value of listDetail) {
  //     const nameproject = value.idproject;
  //     tempArr = [...tempArr, nameproject];
  //   }
  //   function removeDuplicates(data) {
  //     let unique = [];
  //     data.forEach((element) => {
  //       if (!unique.includes(element)) {
  //         unique.push(element);
  //       }
  //     });
  //     return unique;
  //   }
  //   setListProject((pre) => {
  //     return removeDuplicates(tempArr);
  //   });
  // }, []);

  // const handleDisplay = () => {
  //   let filter = listDetail.filter((item) => {
  //     return item.idproject == currentProject;
  //   });
  //   setListDetailFilter(filter);
  // };

  useEffect(() => {
    setListProject(listProjectFake);
  }, []);

  const getDetailOfProject = async (project) => {
    const tempListDetail = listDetailFake.filter((x) => x.projectId == project.projectId);
    setListDetailFilter(tempListDetail);
    setCurrentProjectInfo(project);
  };

  const handleChange = (selectedOption) => {
    setCurrentProject(selectedOption);
  };

  return (
    <div className={css('project')}>
      <div className={css('project-info')}>
        <div className={css('project-info-select')}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <span className={css('span')}>Chọn dự án</span>

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
                maxMenuHeight={150} // Thiết lập chiều cao tối đa của menu
              />
            </div>
          </div>
          <button onClick={() => getDetailOfProject(currentProject)}>Truy xuất</button>
        </div>
        <div className={css('project-info-detail')}>
          <h1>Thông tin chi tiết</h1>
          <div>Mã dự án: {currentProjectInfo?.projectId}</div>
          <div>Tên dự án: {currentProjectInfo?.projectName}</div>
        </div>
      </div>
      <div className={css('project-table')}>
        <table className={css('table-detail')}>
          <thead>
            <tr>
              <th>Mã chi tiết</th>
              <th>Ngày ban hành</th>
              <th>Kỳ vọng</th>
              <th>Trạng thái</th>
              <th>Thời gian gia công</th>
              <th>Thời điểm nhập kho</th>
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
                  <td>{detail.processTime}</td>
                  <td>Chưa nhập kho</td>
                  <td>Xem chi tiết</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

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
      {isLoading && <Loading />}
    </div>
  );
}

export default ProjectPage;

{
  /* <select
              value={currentProject}
              onChange={(e) => {
                setCurrentProject(e.target.value);
              }}
            >
              {listProject?.map((item, index) => {
                return (
                  <option key={index} value={item.projectId}>
                    {`${item.projectId}(${item.projectName})`}
                  </option>
                );
              })}
            </select> */
}
