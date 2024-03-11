// ----------------------------------START LOCAL LIBRARY ---------------------------------------------
import style from './UpdateProjectPage.module.scss';
import { addHobby, deleteHobby } from '~/redux/hobbySlice';
import ModalLogin from '~/components/ModalLogin/ModalLogin';
import instance from '~/utils/api';

// ----------------------------------START REACT LIBRARY---------------------------------------------
import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as XLSX from 'xlsx';

// --------------------------------- END LIBRARY---------------------------------------------
const css = classNames.bind(style);

function UpdateProjectPage() {
  const [dataExcel, setDataExcel] = useState([]);
  const [imgURL, setImgURL] = useState('');
  const [isOpen, setISOpen] = useState(false);

  const handleUpload = (e) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parseData = XLSX.utils.sheet_to_json(sheet);

      setDataExcel(parseData);
    };
  };
  const fetchImage = async (imageURL) => {
    try {
      const response = await fetch(imageURL);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      return new Promise((resolve, reject) => {
        reader.onloadend = () => {
          const base64String = reader.result;
          resolve(base64String);
        };
        reader.onerror = reject;
      });
    } catch (error) {
      console.error('Error converting image to Base64:', error);
      throw error;
    }
  };

  const handlebase64 = async () => {
    if (dataExcel) {
      for (const value of dataExcel) {
        const imgBase64 = await fetchImage(value['Ảnh chi tiết']);
        value['Ảnh chi tiết'] = imgBase64;
        console.log(value);
      }
    }
  };

  return (
    <div className={css('project')}>
      <div className={css('project-info')}>
        <h1>Cập nhật chi tiết dự án</h1>
        <label htmlFor="importExcel">Import Excel</label>
        <input type="file" id="importExcel" hidden onChange={(e) => handleUpload(e)} />
      </div>
      <div className={css('project-table')}>
        <table className={css('table-detail')}>
          <thead>
            <tr>
              <th>Mã dự án</th>
              <th>Tên dự án</th>
              <th>Mã chi tiết</th>
              <th>Tên chi tiết</th>
              <th>Ngày ban hành</th>
              <th>Kỳ vọng</th>
              <th>Ảnh chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {dataExcel.map((data, index) => {
              return (
                <tr key={index}>
                  <td>{data['Mã dự án']}</td>
                  <td>{data['Tên dự án']}</td>
                  <td>{data['Mã chi tiết']}</td>
                  <td>{data['Tên chi tiết']}</td>
                  <td>{data['Ngày ban hành']}</td>
                  <td>{data['Kỳ vọng']}</td>
                  <td
                    onClick={() => {
                      setImgURL(data['Ảnh chi tiết']);
                      setISOpen(true);
                    }}
                  >
                    Xem chi tiết
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className={css('button-update')}>
          <button>Hủy</button>
          <button>Lưu</button>
        </div>
      </div>
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
    </div>
  );
}

export default UpdateProjectPage;
