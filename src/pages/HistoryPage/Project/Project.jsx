// ----------------------------------START LOCAL LIBRARY ---------------------------------------------
import style from './Project.module.scss';
import { getProject, getListDetail, getDetailLog } from '~/services/getServices';
import { listProjectFake, listDetailFake, stage } from '~/utils/fakeData';
import Loading from '~/components/Loading';
import saveExcel from '~/utils/saveExcel';
import { postProject } from '~/services/postServices';
import calculateTime from '~/utils/calculateTime';
import calculateSumTime from '~/utils/calculateSumTime';
import { formatTimeFull, formatTimeWithOnlyDate } from '~/utils/formatTime';
// ----------------------------------START REACT LIBRARY---------------------------------------------
import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { list } from 'postcss';
import Select from 'react-select';

// --------------------------------- END LIBRARY---------------------------------------------
const css = classNames.bind(style);

function Project() {
  const [enableExport, setEnableExport] = useState(false);
  const [load, setLoad] = useState(false);
  const [imgURL, setImgURL] = useState('');
  const [isOpen, setISOpen] = useState(false);
  const [listDetailFilter, setListDetailFilter] = useState([]);
  const [listProject, setListProject] = useState([]);
  const [currentProject, setCurrentProject] = useState('');
  const [currentProjectInfo, setCurrentProjectInfo] = useState({});

  useEffect(() => {
    const getDataInit = async () => {
      const res = await getProject();
      setListProject(res);
    };
    getDataInit();
  }, []);

  const getDetailOfProject = async (project) => {
    const checkResult = checkInput();
    if (checkResult) {
      setLoad(true);
      const res = await getListDetail(project.projectId);
      let listDetailOfProject = [];
      for (let i = 0; i < res.length; i++) {
        const newStartTimePre = formatTimeWithOnlyDate(res[i].startTimePre);
        const newEndTimePre = formatTimeWithOnlyDate(res[i].endTimePre);

        let status;
        if (res[i].detailStatus == 0) status = 'Chưa gia công';
        if (res[i].detailStatus == 1) status = 'Gia công';
        if (res[i].detailStatus == 2) status = 'Hoàn thành gia công';

        const { logForDetailFull } = await getDetailLog(res[i].detailId);
        const listTimeStamp = logForDetailFull.map((e) => {
          return {
            startTimeStamp: e.startTagging,
            endTimeStamp: e.endTagging,
          };
        });
        let sumProcessTime_s;
        if (listTimeStamp.length > 0) {
          sumProcessTime_s = calculateSumTime(listTimeStamp);
        } else {
          sumProcessTime_s = 0;
        }
        const sumProcessTime_format = calculateTime('2024/01/01 00:00:00', '2024/01/01 00:00:00', sumProcessTime_s);

        let lastStage;
        if (res[i].detailStatus == 2) {
          lastStage = formatTimeFull(logForDetailFull[logForDetailFull.length - 1]?.endTagging);
        } else {
          lastStage = '';
        }

        listDetailOfProject = [
          ...listDetailOfProject,
          {
            ...res[i],
            startTimePre: newStartTimePre,
            endTimePre: newEndTimePre,
            detailStatus: status,
            sumProcessTime: sumProcessTime_format,
            completeTime: lastStage,
          },
        ];
      }

      setLoad(false);
      setEnableExport(true);
      setCurrentProjectInfo(project);
      setListDetailFilter(listDetailOfProject);
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
  const saveFileExcel = () => {
    let data, headers, name;
    data = listDetailFilter.map((e) => {
      return {
        detailId: e.detailId,
        startTimePre: e.startTimePre,
        endTimePre: e.endTimePre,
        detailStatus: e.detailStatus,
        sumProcessTime: e.sumProcessTime,
        completeTime: e.completeTime,
      };
    });
    headers = [
      { header: 'Mã chi tiết', key: 'detailId', width: 20 },
      { header: 'Ngày ban hành', key: 'startTimePre', width: 20 },
      { header: 'Ngày dự kiến kết thúc', key: 'endTimePre', width: 22 },
      { header: 'Trạng thái', key: 'detailStatus', width: 20 },
      { header: 'Tổng thời gian gia công', key: 'sumProcessTime', width: 22 },
      { header: 'Thời điểm hoàn thành', key: 'completeTime', width: 22 },
    ];

    name = `Chi tiết dự án ${currentProjectInfo?.projectId} ${currentProjectInfo?.projectName} `;

    saveExcel(headers, data, name);
  };
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
              label: `${option.projectId} • ${option.projectName}`,
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
          {enableExport && <button onClick={saveFileExcel}>Xuất excel</button>}
        </div>
      </div>
      <table className={css('table-detail')}>
        <thead>
          <tr>
            <th>Mã chi tiết</th>
            <th>Ngày ban hành</th>
            <th>Ngày dự kiến hoàn thành</th>
            <th>Trạng thái</th>
            <th>Tổng thời gian gia công</th>
            <th>Thời điểm hoàn thành</th>
            <th>Ảnh chi tiết</th>
          </tr>
        </thead>
        <tbody>
          {listDetailFilter?.map((detail, index) => {
            return (
              <tr key={index}>
                <td>{detail.detailId}</td>
                <td>{detail.startTimePre}</td>
                <td>{detail.endTimePre}</td>
                <td>{detail.detailStatus}</td>
                <td>{detail.sumProcessTime}</td>
                <td>{detail.completeTime}</td>
                <td
                  onClick={() => {
                    setImgURL(() => {
                      const base64img = `data:image/png;base64,${detail.detailPicture}`;
                      return base64img;
                    });
                    setISOpen(true);
                  }}
                >
                  Xem chi tiết
                </td>
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
