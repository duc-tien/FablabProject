import exceljs from "exceljs";
import { saveAs } from "file-saver";

const saveExcel = (headers,data) => {
    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet("My Sheet");
    const fileExtension = ".xlsx";

    worksheet.columns = headers;
    data.map((e) => {
      worksheet.addRow(e);
    });
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "example" + fileExtension);
    });
  };

  export default saveExcel