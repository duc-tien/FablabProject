// ----------------------------------START LOCAL LIBRARY ---------------------------------------------
import style from './Warehouse.module.scss';
import { listAreaFake, listMachineFake } from '~/utils/fakeData';
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

function Warehouse() {
  const [load, setLoad] = useState(false);
  const [listArea, setListArea] = useState([]);
  const [listMachine, setListMachine] = useState([]);
  const [currentMachine, setCurrentMachine] = useState('');
  const [currentArea, setCurrentArea] = useState('');
  const [listError, setListError] = useState([]);
  const [errorNote, setErrorNote] = useState([]);
  const [dateError, setDateError] = useState('');
  useEffect(() => {
    setListArea(listAreaFake);
  }, []);

  const getListMachineOfProject = async (selectedOption) => {
    setCurrentArea(selectedOption);
    const templistMachine = listMachineFake.filter((x) => x.areaId == selectedOption.areaId);
    setListMachine(templistMachine);
    setCurrentMachine('');
  };

  const handleChange = (selectedOption) => {
    setCurrentMachine(selectedOption);
  };

  const checkInput = () => {
    if (!currentArea) {
      alert('Vui lòng chọn Khu vực ');
      return false;
    }

    if (!currentMachine) {
      alert('Vui lòng chọn máy');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    const checkResult = checkInput();
    if (checkResult) {
      setLoad(true);
      const res = await postProject({});
      setLoad(false);
      if (res) {
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

  return (
    <div className={css('container')}>
      <div className={css('record-error')}>
        <h1 className="font-bold text-[20px]">Xác nhận chi tiết hoàn thành</h1>
        <div className="select-area flex">
          <span className="flex h-[32px] leading-[32px] min-w-[120px]">Chọn dự án</span>
          <div className="w-[360px]">
            <Select
              value={currentArea}
              onChange={getListMachineOfProject}
              options={listArea?.map((option) => ({
                ...option,
                value: option.areaId,
                label: `${option.areaName}`,
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
              value={currentMachine}
              onChange={handleChange}
              options={listMachine?.map((option) => ({
                ...option,
                value: option.machineId,
                label: ` ${option.machineName}`,
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

export default Warehouse;
