// ----------------------------------START LOCAL LIBRARY ---------------------------------------------
import style from './OrderPage.module.scss';
import { addHobby, deleteHobby } from '~/redux/hobbySlice';
import ModalLogin from '~/components/ModalLogin/ModalLogin';
import instance from '~/utils/api';

// ----------------------------------START REACT LIBRARY---------------------------------------------
import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// --------------------------------- END LIBRARY---------------------------------------------
const css = classNames.bind(style);

function OrderPage() {
  return (
    <div className={css('container')}>
      <div className={css('form-area')}>
        <div className={css('form-title')}>Tên khách hàng</div>
        <input className={css('form-input')} type="text" />
        <div className={css('form-title')}>Email</div>
        <input className={css('form-input')} type="text" />
        <div className={css('form-title')}>Ngày tạo</div>
        <input className={css('form-input')} type="date" />
      </div>
      <div className={css('form-area')}>
        <div className={css('form-title')}>Số điện thoại</div>
        <input className={css('form-input')} type="text" />
        <div className={css('form-title')}>Tên sản phẩm</div>
        <input className={css('form-input')} type="text" />
        <div className={css('form-title')}>Kỳ vọng</div>
        <input className={css('form-input')} type="date" />
      </div>
      <button className={css('button-add')}>Thêm mới</button>
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
          <tr>
            <td>Nguyễn A</td>
            <td>0603545035</td>
            <td>bku@hcmut.edu.vn</td>
            <td>Dự án Demo</td>
            <td>21-02-2024</td>
            <td>28-02-2024</td>
            <td>Xóa</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default OrderPage;
