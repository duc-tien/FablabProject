// ----------------------------------START LOCAL LIBRARY ---------------------------------------------
import style from './Worker.module.scss';
import { addHobby, deleteHobby } from '~/redux/hobbySlice';
import ModalLogin from '~/components/ModalLogin/ModalLogin';
import instance from '~/utils/api';
import Loading from '~/components/Loading';
import { postProject } from '~/services/postServices';
import { listWorkerFake } from '~/utils/fakeData';
// ----------------------------------START REACT LIBRARY---------------------------------------------
import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
// --------------------------------- END LIBRARY---------------------------------------------
const css = classNames.bind(style);

function Worker() {
  const [load, setLoad] = useState(false);
  const [listWorker, setListWorker] = useState([]);
  const [infoWorkerModify, setInfoWorkerModify] = useState();
  const [infoWorkerAdd, setInfoWorkerAdd] = useState({
    workerId: '',
    workerName: '',
    area: '',
    avatar: '',
    rfid: '',
  });
  useEffect(() => {
    setListWorker(listWorkerFake);
  }, []);
  const [isOpen, setISOpen] = useState(false);
  const [imgURL, setImgURL] = useState('');

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64Data = reader.result;
        setInfoWorkerAdd((prev) => {
          return { ...prev, avatar: base64Data };
        });
      };

      reader.readAsDataURL(file);
    }
  };
  const getListWorker = () => {
    // setListWorker(listWorkerFake);
  };

  const handleChangeInfoWorker = async () => {
    if (infoWorkerModify) {
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
      alert('Vui lòng chọn công nhân muốn thay đổi thông tin');
    }
  };
  const handleDeleteWorker = () => {
    const isConfirmed = confirm(`Bạn muốn xóa công nhân này?`);
    console.log(isConfirmed);
    if (isConfirmed) {
      const newList = [...listWorker];
      newList.shift();
      setListWorker(newList);
    }
  };
  const createInfoWorker = (key, data) => {
    setInfoWorkerAdd((prev) => {
      return {
        ...prev,
        [key]: data,
      };
    });
  };
  const handleAddWorker = async () => {
    let count = 0;
    for (let value of Object.values(infoWorkerAdd)) {
      if (!value) count++;
    }
    if (count != 0) {
      alert('Vui lòng nhập đầy đủ thông tin');
    } else {
      setLoad(true);
      const res = await postProject({});
      setListWorker((prev) => {
        return [...prev, infoWorkerAdd];
      });
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
    }
  };

  const deleteClientFromList = (index) => {
    setListClient((prev) => {
      let tempListClient = [...prev];
      tempListClient.splice(index, 1);
      return tempListClient;
    });
  };

  return (
    <div className={css('container')}>
      <div className={css('manage-worker')}>
        <div className={css('add-worker')}>
          <span>Thêm công nhân</span>
          <div className={css('worker-field')}>Mã định danh:</div>
          <input
            value={infoWorkerAdd?.workerId}
            onChange={(e) => createInfoWorker('workerId', e.target.value)}
            className={css('worker-info')}
            type="text"
          />
          <div className={css('worker-field')}>Tên công nhân:</div>
          <input
            value={infoWorkerAdd?.workerName}
            onChange={(e) => createInfoWorker('workerName', e.target.value)}
            className={css('worker-info')}
            type="text"
          />
          <div className={css('worker-field')}>Khu vực:</div>
          <input
            value={infoWorkerAdd?.area}
            onChange={(e) => createInfoWorker('area', e.target.value)}
            className={css('worker-info')}
            type="text"
          />
          <div className={css('worker-field')}>Mã RFID:</div>
          <input
            value={infoWorkerAdd?.rfid}
            onChange={(e) => createInfoWorker('rfid', e.target.value)}
            className={css('worker-info')}
            type="text"
          />

          <div onClick={() => handleAddWorker()} className={css('btn-save')}>
            Thêm mới
          </div>
        </div>
        <div className={css('add-worker-avatar')}>
          <span className={css('avatar-field')}>Ảnh đại diện</span>
          <label className={css('avatar-input')} htmlFor="avatar">
            Tải ảnh
          </label>
          <input type="file" hidden id="avatar" onChange={handleFileInputChange} />
          <img className={css('mini-img')} src={infoWorkerAdd?.avatar} />
        </div>
        <div className={css('delete-worker')}>
          <span>Chỉnh sửa thông tin công nhân</span>
          <div className={css('worker-field')}>Mã định danh:</div>
          <input
            readOnly
            style={{ backgroundColor: '#EAEBEF' }}
            className={css('worker-info')}
            type="text"
            value={infoWorkerModify?.workerId}
          />
          <div className={css('worker-field')}>Tên công nhân:</div>
          <input
            readOnly
            style={{ backgroundColor: '#EAEBEF' }}
            className={css('worker-info')}
            type="text"
            value={infoWorkerModify?.workerName}
          />
          <div className={css('worker-field')}>Khu vực:</div>
          <input
            className={css('worker-info')}
            type="text"
            value={infoWorkerModify?.area}
            onChange={(e) => {
              setInfoWorkerModify((prev) => {
                return {
                  ...prev,
                  area: e.target.value,
                };
              });
            }}
          />
          <div className={css('worker-field')}>Mã RFID:</div>
          <input
            value={infoWorkerModify?.rfid}
            onChange={(e) => {
              setInfoWorkerModify((prev) => {
                return {
                  ...prev,
                  rfid: e.target.value,
                };
              });
            }}
            className={css('worker-info')}
            type="text"
          />
          <div onClick={handleChangeInfoWorker} className={css('btn-save')}>
            Lưu thay đổi
          </div>
        </div>
      </div>

      <div className={css('title')}>
        <span>Danh sách công nhân</span>
        <span onClick={() => getListWorker()}>Xem danh sách</span>
      </div>
      <table className={css('table-detail')}>
        <thead>
          <tr>
            <th>Mã định danh</th>
            <th>Họ và tên</th>
            <th>Khu vực</th>
            <th>Mã RFID</th>
            <th>Ảnh công nhân</th>
          </tr>
        </thead>
        <tbody>
          {listWorker?.map((worker, index) => {
            return (
              <tr key={index}>
                <td>{worker.workerId}</td>
                <td>{worker.workerName}</td>
                <td>{worker.area}</td>
                <td>{worker.rfid}</td>
                <td
                  className={css('view-avatar')}
                  onClick={() => {
                    setImgURL(worker.avatar);
                    setISOpen(true);
                  }}
                >
                  <b>Xem chi tiết</b>
                </td>
                <td>
                  <FontAwesomeIcon
                    onClick={() => setInfoWorkerModify(worker)}
                    icon={faPen}
                    className={css('icon-pen')}
                  />
                  <FontAwesomeIcon
                    onClick={() => handleDeleteWorker(worker)}
                    icon={faTrash}
                    className={css('icon-pen')}
                  />
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

export default Worker;
