// ----------------------------------START LOCAL LIBRARY ---------------------------------------------
import style from './UpdateProject.module.scss';
import hubConnection from '~/utils/hubConnection';
import Loading from '~/components/Loading';
import { postProject } from '~/services/postServices';
// ----------------------------------START REACT LIBRARY---------------------------------------------
import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as XLSX from 'xlsx';

// --------------------------------- END LIBRARY---------------------------------------------
const css = classNames.bind(style);

function UpdateProject() {
  useEffect(() => {
    hubConnection.start();
  }, [hubConnection.connection]);
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
      e.stage = e['Công đoạn'];
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
          alert('Các trường dữ liệu không đúng định dạng, vui lòng kiểm tra lại');
          setDataExcel([]);
        }
      };
    } else {
      alert('File phải có dạng .xlsx hoặc .csv, vui lòng kiểm tra lại');
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
          const index = base64String.indexOf(',');
          const newbase64 = base64String.substring(index + 1);
          resolve(newbase64);
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
        details: [],
      };
      for (const value of dataExcel) {
        const imgBase64 = await fetchImage(value.imgURL);
        tempProject.details = [
          ...tempProject.details,
          {
            detailId: value.detailId,
            detailName: value.detailName,
            startTimePre: value.startDate,
            endTimePre: value.endDate,
            noteLog: value.stage,
            fileData: imgBase64,
          },
        ];
      }

      //post api ...
      setLoad(true);
      const res = await postProject(tempProject);
      setLoad(false);
      if (res == tempProject.projectId) {
        setTimeout(() => {
          alert('Cập nhật thành công');
        }, 50);
      } else {
        setTimeout(() => {
          alert('Cập nhật không thành công');
        }, 50);
      }
    } else {
      alert('Vui lòng nhập dữ liệu');
    }
  };

  const sendSignalR = async () => {
    const machine = 'TSH1390';
    let data = {};
    for (let i = 0; i < dataExcel.length; i++) {
      const key = `MCT${i + 1}`;
      data[key] = dataExcel[i].detailId;
    }
    hubConnection.connection.send('SendCommand', machine, JSON.stringify(data));
  };
  return (
    <div className={css('project')}>
      <div className={css('project-input')}>
        <h1>Cập nhật chi tiết dự án</h1>
        <label htmlFor="importExcel">Nhập dữ liệu</label>
        <input type="file" id="importExcel" hidden onChange={(e) => handleUpload(e)} />
      </div>
      <div className={css('project-info')}>
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
                  <td>{data.stage}</td>
                  <td
                    onClick={() => {
                      setImgURL(data.imgURL);
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
          <button onClick={() => sendSignalR()}>Gửi mqtt</button>
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
      {load && <Loading />}
    </div>
  );
}

export default UpdateProject;
