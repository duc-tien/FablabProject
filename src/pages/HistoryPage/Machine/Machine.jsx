// ----------------------------------START LOCAL LIBRARY ---------------------------------------------
import style from './Machine.module.scss';
import { addHobby, deleteHobby } from '~/redux/hobbySlice';
import ModalLogin from '~/components/ModalLogin/ModalLogin';
import instance from '~/utils/api';

// ----------------------------------START REACT LIBRARY---------------------------------------------
import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// --------------------------------- END LIBRARY---------------------------------------------
const css = classNames.bind(style);

function Machine() {
  return (
    <div className={css('container')}>
      <div className={css('select-area')}>
        <div className={css('select-title')}>Từ ngày:</div>
        <input className={css('select-input')} type="date" />
        <div className={css('select-title')}>Đến ngày:</div>
        <input className={css('select-input')} type="date" />
        <div className={css('select-title')}>Chọn máy</div>
        <select className={css('select-input')} name="" id="">
          <option value="">MC01-Máy số 1</option>
          <option value="">MC02-Máy số 2</option>
        </select>
        <button>Truy xuất</button>
      </div>
      <h1>Thông tin truy xuất</h1>
      <table className={css('table-detail')}>
        <thead>
          <tr>
            <th>Mã máy</th>
            <th>Tên máy</th>
            <th>Mã chi tiết</th>
            <th>Tên chi tiết</th>
            <th>Người thi hành</th>
            <th>Thời gian </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>MC-01</td>
            <td>Máy số 1</td>
            <td>fb01-abc</td>
            <td>Chi tiết 1</td>
            <td>Nguyễn A</td>
            <td>09:05:00 28-02-2024</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Machine;
