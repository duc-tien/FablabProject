// ----------------------------------START LOCAL LIBRARY ---------------------------------------------
import style from './ComfirmDetail.module.scss';
import { listAreaFake, listMachineFake } from '~/utils/fakeData';
import { putDetail } from '~/services/putServices';
import { getProject, getListDetail } from '~/services/getServices';
// ----------------------------------START REACT LIBRARY---------------------------------------------
import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loading from '~/components/Loading';
import { postProject } from '~/services/postServices';
// --------------------------------- END LIBRARY---------------------------------------------
const css = classNames.bind(style);

function ComfirmDetail() {
  const [load, setLoad] = useState(false);
  const [listProject, setListProject] = useState([]);
  const [listDetail, setListDetail] = useState([]);
  const [currentDetail, setCurrentDetail] = useState('');
  const [currentProject, setCurrentProject] = useState('');
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
      alert('Vui lòng chọn Khu vực ');
      return false;
    }

    if (!currentDetail) {
      alert('Vui lòng chọn máy');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    const checkResult = checkInput();
    if (checkResult) {
      setLoad(true);
      const res = await putDetail({ detailId: currentDetail.detailId });
      setLoad(false);
      if (res == currentDetail.detailId) {
        setTimeout(() => {
          alert('Cập nhật thành công');
        }, 50);
      } else {
        setTimeout(() => {
          alert('Cập nhật không thành công');
        }, 50);
      }
    } else {
      alert('Vui lòng thực hiện việc ghi lỗi trước');
    }
  };

  const handleChange = (selectedOption) => {
    setCurrentDetail(selectedOption);
  };

  return (
    <div className={css('container')}>
      <div className={css('record-error')}>
        <h1 className="font-bold text-[20px]">Xác nhận chi tiết hoàn thành</h1>
        <div className="select-area flex">
          <span className="flex h-[32px] leading-[32px] min-w-[120px]">Chọn dự án</span>
          <div className="w-[360px]">
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
        </div>
        <div className="select-machine flex">
          <span className="flex h-[32px] leading-[32px] min-w-[120px]">Chọn chi tiết</span>
          <div className="w-[360px]">
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
        </div>

        <div
          onClick={() => handleSubmit()}
          className="h-[36px] text-[18px] leading-[36px] text-center font-bold bg-[#99CFEB] cursor-pointer mt-[16px]  "
        >
          Xác nhận hoàn thành
        </div>
      </div>

      {load && <Loading />}
    </div>
  );
}

export default ComfirmDetail;
