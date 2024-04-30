// ----------------------------------START LOCAL LIBRARY ---------------------------------------------
import style from './RecordError.module.scss';
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

function RecordError() {
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
    if (!dateError) {
      alert('Vui lòng chọn ngày ghi lỗi');
      return false;
    }
    if (!errorNote) {
      alert('Vui lòng chọn ngày ghi lỗi');
      return false;
    }
    return true;
  };
  const addError = () => {
    const checkResult = checkInput();
    if (checkResult) {
      setListError((prev) => {
        return [
          ...prev,
          {
            machineName: currentMachine.label,
            error: errorNote,
            date: dateError,
          },
        ];
      });
    }
  };

  const removeError = (index) => {
    const tempList = [...listError];
    tempList.splice(index, 1);
    setListError(tempList);
  };
  const handleSubmit = async () => {
    if (listError.length > 0) {
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
        <h1 className="font-bold text-[20px]">Báo lỗi máy</h1>
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
          <span className="flex h-[32px] leading-[32px] min-w-[120px]">Ghi chú lỗi</span>
          <div className="w-[360px]">
            <input
              style={{ borderBottom: '1px solid #ccc' }}
              value={errorNote}
              onChange={(e) => setErrorNote(e.target.value)}
              className=" text-[18px] h-[32px] w-[315px] leading-[22px] p-[4px] outline-0 "
              type="text"
            />
          </div>
        </div>
        <div className="select-machine flex">
          <span className="flex h-[32px] leading-[32px] min-w-[120px]">Thời gian</span>
          <div className="w-[360px]">
            <input
              style={{ borderBottom: '1px solid #ccc' }}
              value={dateError}
              onChange={(e) => setDateError(e.target.value)}
              className=" text-[18px] h-[32px] w-[315px] leading-[22px] p-[4px] outline-0 "
              type="date"
            />
          </div>
        </div>

        <div
          onClick={() => addError()}
          className="h-[36px] text-[18px] leading-[36px] text-center font-bold bg-[#99CFEB] cursor-pointer mt-[16px]  "
        >
          Thêm
        </div>
      </div>
      <table className={css('table-error')}>
        <thead>
          <tr>
            <th>Máy</th>
            <th>Thời gian</th>
            <th>Ghi chú lỗi</th>
          </tr>
        </thead>
        <tbody>
          {listError?.map((e, index) => {
            return (
              <tr>
                <td>{e.machineName}</td>
                <td>{e.date}</td>
                <td>{e.error}</td>
                <td>
                  <FontAwesomeIcon onClick={() => removeError(index)} icon={faTrash} className="cursor-pointer" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={css('button-update')}>
        <button onClick={handleSubmit}>Lưu</button>
      </div>
      {load && <Loading />}
    </div>
  );
}

export default RecordError;
