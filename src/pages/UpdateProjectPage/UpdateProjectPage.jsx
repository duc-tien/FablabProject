// ----------------------------------START LOCAL LIBRARY ---------------------------------------------
import style from './UpdateProjectPage.module.scss';
import { addDetailToList } from '~/redux/projectSlice';
import ModalLogin from '~/components/ModalLogin/ModalLogin';
import hubConnection from '~/utils/hubConnection';
import Alert from '~/components/Alert';
import Loading from '~/components/Loading';
import { postProject } from '~/services/postServices';
// ----------------------------------START REACT LIBRARY---------------------------------------------
import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as XLSX from 'xlsx';

// --------------------------------- END LIBRARY---------------------------------------------
const css = classNames.bind(style);

function UpdateProjectPage() {
  // useEffect(() => {
  //   hubConnection.start();
  //   hubConnection.connection.send('SendAllTag');
  //   hubConnection.connection.on('GetAll', (msg) => {
  //     console.log('alltag object:', JSON.parse(msg));
  //   });

  //   hubConnection.connection.on('TagChanged', (msg) => {
  //     console.log('Tagchange object:', JSON.parse(msg));
  //   });
  //   return () => {
  //     hubConnection.connection.off('TagChanged');
  //     hubConnection.connection.off('GetAll');
  //   };
  // }, [hubConnection.connection]);
  const [alert, setAlert] = useState({ isAlert: false, content: '' });
  const [load, setLoad] = useState(false);
  const [dataExcel, setDataExcel] = useState([]);
  const [imgURL, setImgURL] = useState('');
  const [isOpen, setISOpen] = useState(false);
  const excelCol = [
    'Mã dự án',
    'Tên dự án',
    'Ngày bắt đầu',
    'Kỳ vọng',
    'Mã chi tiết',
    'Tên chi tiết',
    'Ảnh chi tiết',
    'Công đoạn',
  ];

  const cancelAlert = () => {
    setAlert({
      isAlert: false,
      content: '',
    });
  };

  const modifyKeyObject = (data) => {
    const modifyData = data.map((e) => {
      // creat new key
      e.projectId = e['Mã dự án'];
      e.projectName = e['Tên dự án'];
      e.startDate = e['Ngày bắt đầu'];
      e.endDate = e['Kỳ vọng'];
      e.detailName = e['Tên chi tiết'];
      e.detailId = e['Mã chi tiết'];
      e.imgURL = e['Ảnh chi tiết'];
      e.state = e['Công đoạn'];
      // delete old key
      delete e['Mã dự án'];
      delete e['Tên dự án'];
      delete e['Ngày bắt đầu'];
      delete e['Kỳ vọng'];
      delete e['Tên chi tiết'];
      delete e['Mã chi tiết'];
      delete e['Ảnh chi tiết'];
      delete e['Công đoạn'];
      return e;
    });
    return modifyData;
  };
  const handleUpload = (e) => {
    const fileName = e.target.files[0].name;
    const fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
    if (fileExtension == 'xlsx' || fileExtension == 'csv') {
      const reader = new FileReader();
      reader.readAsBinaryString(e.target.files[0]);
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parseData = XLSX.utils.sheet_to_json(sheet);

        //Sửa key cho mảng dữ liệu excel

        let count = 0;
        for (const key in parseData[0]) {
          if (excelCol.includes(key)) count++;
        }
        const newParseData = modifyKeyObject(parseData);
        if (count == excelCol.length) {
          setDataExcel(newParseData);
        } else {
          setAlert({
            isAlert: true,
            content: 'Các trường dữ liệu không đúng định dạng, vui lòng kiểm tra lại',
          });
          setDataExcel([]);
        }
      };
    } else {
      setAlert({
        isAlert: true,
        content: 'File phải có dạng .xlsx hoặc .csv, vui lòng kiểm tra lại',
      });
    }
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

  const saveToDb = async () => {
    if (dataExcel.length > 0) {
      let tempProject = {
        projectId: dataExcel[0].projectId,
        projectName: dataExcel[0].projectName,
        startDate: dataExcel[0].startDate,
        endDate: dataExcel[0].endDate,
        note: 'string',
        oderId: 'OD240327002',
        details: [],
      };
      for (const value of dataExcel) {
        const imgBase64 = await fetchImage(value.imgURL);
        tempProject.details = [
          ...tempProject.details,
          {
            detailId: value.detailId,
            detailName: value.detailName,
            fileData: imgBase64,
          },
        ];
      }

      //post api ...
      setLoad(true);
      const res = await postProject(tempProject);
      setLoad(false);
      if (res == tempProject.projectId) {
        setAlert({
          isAlert: true,
          content: 'Cập nhật thành công',
        });
      } else {
        setAlert({
          isAlert: true,
          content: 'Cập nhật không thành công',
        });
      }
    } else {
      setAlert({
        isAlert: true,
        content: 'Vui lòng nhập dữ liệu',
      });
    }
  };

  return (
    <div className={css('project')}>
      <div className={css('project-info')}>
        <h1>Cập nhật chi tiết dự án</h1>
        <label htmlFor="importExcel">Nhập dữ liệu</label>
        <input type="file" id="importExcel" hidden onChange={(e) => handleUpload(e)} />
      </div>
      <div className={css('info-project')}>
        <span className={css('info-project-title')}>Mã dự án:</span>
        <span>{dataExcel[0]?.projectId} </span>
        <span className={css('info-project-title')}>Tên dự án:</span>
        <span>{dataExcel[0]?.projectName} </span>
      </div>
      <div className={css('project-table')}>
        <table className={css('table-detail')}>
          <thead>
            <tr>
              <th>Mã chi tiết</th>
              <th>Tên chi tiết</th>
              <th>Ngày ban hành</th>
              <th>Kỳ vọng</th>
              <th>Công đoạn</th>
              <th>Ảnh chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {dataExcel?.map((data, index) => {
              return (
                <tr key={index}>
                  <td>{data.detailId}</td>
                  <td>{data.detailName}</td>
                  <td>{data.startDate}</td>
                  <td>{data.endDate}</td>
                  <td>{data.state}</td>
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
          <button onClick={() => saveToDb()}>Lưu</button>
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
      {alert.isAlert && <Alert content={alert.content} onClose={cancelAlert} />}
      {load && <Loading />}
    </div>
  );
}

export default UpdateProjectPage;
