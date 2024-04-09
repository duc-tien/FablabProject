// ----------------------------------START LOCAL LIBRARY ---------------------------------------------
import style from './OrderPage.module.scss';
import { addHobby, deleteHobby } from '~/redux/hobbySlice';
import ModalLogin from '~/components/ModalLogin/ModalLogin';
import instance from '~/utils/api';
import Alert from '~/components/Alert';

// ----------------------------------START REACT LIBRARY---------------------------------------------
import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// --------------------------------- END LIBRARY---------------------------------------------
const css = classNames.bind(style);

function OrderPage() {
  const [alert, setAlert] = useState({ isAlert: false, content: '' });
  const [listClient, setListClient] = useState([]);
  const [infoClient, setInfoClient] = useState({
    nameclient: '',
    email: '',
    phone: '',
    nameproduct: '',
    startdate: '',
    enddate: '',
  });
  const [enableSubmit, setEnableSubmit] = useState(true);
  const updateClient = (value, key) => {
    setInfoClient((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };
  const cancelAlert = () => {
    setAlert({
      isAlert: false,
      content: '',
    });
  };
  const addClientToList = () => {
    let count = 0;
    for (let value of Object.values(infoClient)) {
      if (!value) count++;
    }
    if (count != 0) {
      setAlert({
        isAlert: true,
        content: 'Vui lòng nhập đầy đủ thông tin',
      });
    } else {
      setListClient((prev) => {
        return [...prev, infoClient];
      });
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
      <div className={css('form-area')}>
        <div className={css('form-title')}>Tên khách hàng</div>
        <input
          className={css('form-input')}
          type="text"
          value={infoClient?.nameclient}
          onChange={(e) => updateClient(e.target.value, 'nameclient')}
        />
        <div className={css('form-title')}>Email</div>
        <input
          className={css('form-input')}
          type="text"
          value={infoClient?.email}
          onChange={(e) => updateClient(e.target.value, 'email')}
        />
        <div className={css('form-title')}>Ngày tạo</div>
        <input
          className={css('form-input')}
          type="date"
          value={infoClient?.startdate}
          onChange={(e) => updateClient(e.target.value, 'startdate')}
        />
      </div>
      <div className={css('form-area')}>
        <div className={css('form-title')}>Số điện thoại</div>
        <input
          className={css('form-input')}
          type="text"
          value={infoClient?.phone}
          onChange={(e) => updateClient(e.target.value, 'phone')}
        />
        <div className={css('form-title')}>Tên sản phẩm</div>
        <input
          className={css('form-input')}
          type="text"
          value={infoClient?.nameproduct}
          onChange={(e) => updateClient(e.target.value, 'nameproduct')}
        />
        <div className={css('form-title')}>Kỳ vọng</div>
        <input
          className={css('form-input')}
          type="date"
          value={infoClient?.enddate}
          onChange={(e) => updateClient(e.target.value, 'enddate')}
        />
      </div>
      <button onClick={() => addClientToList()} className={css('button-add')}>
        Thêm mới
      </button>
      <table className={css('table-detail')}>
        <thead>
          <tr>
            <th>Tên khách hàng</th>
            <th>Số điện thoại</th>
            <th>Email</th>
            <th>Tên dự án </th>
            <th>Ngày tạo</th>
            <th>Kỳ vọng</th>
          </tr>
        </thead>
        <tbody>
          {listClient?.map((client, index) => {
            return (
              <tr key={index}>
                <td>{client.nameclient}</td>
                <td>{client.phone}</td>
                <td>{client.email}</td>
                <td>{client.nameproduct}</td>
                <td>{client.startdate}</td>
                <td>{client.enddate}</td>
                <td onClick={() => deleteClientFromList(index)}>Xóa</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {alert.isAlert && <Alert content={alert.content} onClose={cancelAlert} />}
    </div>
  );
}

export default OrderPage;
