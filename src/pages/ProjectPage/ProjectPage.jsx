// ----------------------------------START LOCAL LIBRARY ---------------------------------------------
import style from './ProjectPage.module.scss';
import { addHobby, deleteHobby } from '~/redux/hobbySlice';
import ModalLogin from '~/components/ModalLogin/ModalLogin';
import instance from '~/utils/api';

// ----------------------------------START REACT LIBRARY---------------------------------------------
import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// --------------------------------- END LIBRARY---------------------------------------------
const css = classNames.bind(style);

function ProjectPage() {
  return (
    <div className={css('project')}>
      <div className={css('project-info')}>
        <div className={css('project-info-select')}>
          <div>
            <span>Tên dự án</span>
            <select name="" id="">
              <option value="">FB-01</option>
            </select>
          </div>
          <button>Truy xuất</button>
        </div>
        <div className={css('project-info-detail')}>
          <h1>Thông tin chi tiết</h1>
          <div>Mã dự án: FB01</div>
          <div>Tên dự án: Dự án Demo</div>
          <div>Trạng thái: đang gia công</div>
        </div>
      </div>
      <div className={css('project-table')}>
        <table className={css('table-detail')}>
          <thead>
            <tr>
              <th>Mã chi tiết</th>
              <th>Tên chi tiết</th>
              <th>Ngày ban hành</th>
              <th>Kỳ vọng</th>
              <th>Trạng thái</th>
              <th>Thời gian hoàn thành</th>
              <th>Ảnh chi tiết</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>fb01-abc</td>
              <td>Chi tiết 1</td>
              <td>20-02-2024</td>
              <td>28-02-2024</td>
              <td>hoàn thành</td>
              <td>28-02-2024</td>
              <td>Xem chi tiết</td>
            </tr>
            <tr>
              <td>fb01-abc</td>
              <td>Chi tiết 1</td>
              <td>20-02-2024</td>
              <td>28-02-2024</td>
              <td>hoàn thành</td>
              <td>28-02-2024</td>
              <td>Xem chi tiết</td>
            </tr>
            <tr>
              <td>fb01-abc</td>
              <td>Chi tiết 1</td>
              <td>20-02-2024</td>
              <td>28-02-2024</td>
              <td>hoàn thành</td>
              <td>28-02-2024</td>
              <td>Xem chi tiết</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProjectPage;
