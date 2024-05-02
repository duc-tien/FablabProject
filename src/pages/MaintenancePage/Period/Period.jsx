// ----------------------------------START LOCAL LIBRARY ---------------------------------------------
import style from './Period.module.scss';
import { listAreaFake, listMachineFake } from '~/utils/fakeData';
import { getArea, getMachine } from '~/services/getServices';
import { putMaintenance } from '~/services/putServices';
// ----------------------------------START REACT LIBRARY---------------------------------------------
import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import Loading from '~/components/Loading';
import { postProject } from '~/services/postServices';
// --------------------------------- END LIBRARY---------------------------------------------
const css = classNames.bind(style);

function Period() {
  const [load, setLoad] = useState(false);
  const [listAreaInit, setListAreaInit] = useState([]);
  const [listMCInit, setListMCInit] = useState([]);
  const [currentMachine, setCurrentMachine] = useState('');
  const [currentArea, setCurrentArea] = useState('');
  const [timeMaintenance, setTimeMaintenance] = useState('');

  useEffect(() => {
    const getDataInit = async () => {
      const res = await getArea();
      setListAreaInit(res);
    };
    getDataInit();
  }, []);

  const getListMachineOfProject = async (selectedOption) => {
    setCurrentArea(selectedOption);
    const res = await getMachine(selectedOption.areaId);
    setListMCInit(res);
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
    if (!timeMaintenance) {
      alert('Vui lòng đặt thời gian bảo trì');
      return false;
    }
    if (isNaN(Number(timeMaintenance))) {
      alert('Thời gian đặt phải có định dạng số');
      return false;
    }
    return true;
  };
  const checkInputForReset = () => {
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
      const time = Number(timeMaintenance) * 3600;
      const dataPut = {
        machineId: currentMachine.machineId,
        motorOperationTime: currentMachine.motorOperationTime,
        motorMaintenanceTime: time,
      };
      const res = await putMaintenance(dataPut);
      setLoad(false);
      if (res == currentMachine.machineId) {
        setTimeout(() => {
          alert('Cập nhật thành công');
        }, 50);
      } else {
        setTimeout(() => {
          alert('Cập nhật không thành công');
        }, 50);
      }
    }
  };

  const handleReset = async () => {
    const checkResult = checkInputForReset();
    if (checkResult) {
      setLoad(true);
      const dataPut = {
        machineId: currentMachine.machineId,
        motorOperationTime: 0,
        motorMaintenanceTime: currentMachine.motorMaintenanceTime,
      };
      const res = await putMaintenance(dataPut);
      setLoad(false);
      if (res == currentMachine.machineId) {
        setTimeout(() => {
          alert('Cập nhật thành công');
        }, 50);
      } else {
        setTimeout(() => {
          alert('Cập nhật không thành công');
        }, 50);
      }
    }
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
              options={listAreaInit?.map((option) => ({
                ...option,
                value: option.areaId,
                label: `${option.description}`,
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
              options={listMCInit?.map((option) => ({
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
              value={timeMaintenance}
              onChange={(e) => setTimeMaintenance(e.target.value)}
              style={{ borderBottom: '1px solid #ccc' }}
              className=" text-[18px] h-[32px] w-[280px] leading-[22px] p-[4px] outline-0 text-center"
              type="text"
            />
            <span className="inline-block min-w-12 ml-[8px]">Giờ</span>
          </div>
        </div>

        <div
          onClick={() => handleSubmit()}
          className="h-[36px] text-[18px] leading-[36px] text-center font-bold cursor-pointer bg-[#99CFEB] mt-[16px]"
        >
          Đặt lại thời gian bảo trì
        </div>
        <div
          onClick={() => handleReset()}
          className="h-[36px] text-[18px] leading-[36px] text-center font-bold cursor-pointer bg-[#99CFEB] mt-[16px]"
        >
          Đặt lại thời gian vận hành
        </div>
      </div>
      {load && <Loading />}
    </div>
  );
}

export default Period;
