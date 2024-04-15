// ----------------------------------START LOCAL LIBRARY ---------------------------------------------
import style from './WorkerPage.module.scss';
import { addHobby, deleteHobby } from '~/redux/hobbySlice';
import ModalLogin from '~/components/ModalLogin/ModalLogin';
import instance from '~/utils/api';
import Alert from '~/components/Alert';
import { listWorkerFake } from '~/utils/fakeData';
// ----------------------------------START REACT LIBRARY---------------------------------------------
import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
// --------------------------------- END LIBRARY---------------------------------------------
const css = classNames.bind(style);

function WorkerPage() {
  const [alert, setAlert] = useState({ isAlert: false, content: '' });
  const [base64Image, setBase64Image] = useState('');
  const [listWorker, setListWorker] = useState([]);
  const [infoWorkerModify, setInfoWorkerModify] = useState();
  const [infoWorkerAdd, setInfoWorkerAdd] = useState({
    workerId: '',
    workerName: '',
    area: '',
    avatar: '',
  });
  const [isOpen, setISOpen] = useState(false);
  const [imgURL, setImgURL] = useState('');

  const cancelAlert = () => {
    setAlert({
      isAlert: false,
      content: '',
    });
  };
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64Data = reader.result;
        setBase64Image(base64Data);
      };

      reader.readAsDataURL(file);
    }
  };
  const getListWorker = () => {
    setListWorker(listWorkerFake);
  };

  const handleChangeInfoWorker = () => {
    console.log(infoWorkerModify);
  };
  const createInfoWorker = (key, data) => {
    setInfoWorkerAdd((prev) => {
      return {
        ...prev,
        [key]: data,
      };
    });
  };
  const handleAddWorker = () => {
    console.log(infoWorkerAdd);
  };

  return (
    <div className={css('container')}>
      <div className={css('manage-worker')}>
        <div className={css('add-worker')}>
          <span>Thêm thông tin công nhân</span>
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
          <img className={css('mini-img')} src={base64Image} />
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
            <th>Ảnh công nhân</th>
          </tr>
        </thead>
        <tbody>
          {listWorker?.map((worker, index) => {
            return (
              <tr>
                <td>{worker.workerId}</td>
                <td>{worker.workerName}</td>
                <td>{worker.area}</td>
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
      {alert.isAlert && <Alert content={alert.content} onClose={cancelAlert} />}
    </div>
  );
}

export default WorkerPage;
