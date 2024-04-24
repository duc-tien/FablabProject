// ----------------------------------START LOCAL LIBRARY ---------------------------------------------
import style from './Period.module.scss';
import { listAreaFake, listMachineFake } from '~/utils/fakeData';

// ----------------------------------START REACT LIBRARY---------------------------------------------
import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
// --------------------------------- END LIBRARY---------------------------------------------
const css = classNames.bind(style);

function Period() {
  const [listArea, setListArea] = useState([]);
  const [listMachine, setListMachine] = useState([]);
  const [currentMachine, setCurrentMachine] = useState('');
  const [currentArea, setCurrentArea] = useState('');

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

  return (
    <div className={css('container')}>
      <div className={css('setting-maintenance')}>
        <h1 className="font-bold text-[20px]">Đặt thời gian bảo trì định kỳ</h1>
        <div className="select-area flex">
          <span className="flex h-[32px] leading-[32px] min-w-[120px]">Chọn khu vực</span>
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
          <span className="flex h-[32px] leading-[32px] min-w-[120px]">Chọn máy</span>
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
        <div className="select-machine flex">
          <span className="flex h-[32px] leading-[32px] min-w-[120px]">Đặt thời gian</span>
          <div className="w-[360px]">
            <input
              style={{ borderBottom: '1px solid #ccc' }}
              className=" text-[18px] h-[32px] w-[280px] leading-[22px] p-[4px] outline-0 text-center"
              type="text"
            />
            <span className="inline-block min-w-12 ml-[8px]">Giờ</span>
          </div>
        </div>

        <div className="h-[36px] text-[18px] leading-[36px] text-center font-bold cursor-pointer bg-[#99CFEB] mt-[16px]">
          Xác nhận
        </div>
      </div>
    </div>
  );
}

export default Period;
