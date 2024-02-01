import ExcelJS from 'exceljs';

export function extractString(str) {
    let parts  ='';
    if(str) {
     parts = str.split('.');
    }
    if (parts.length > 1) {
      return parts[parts.length - 1];
    }
    return str;
  }

export function layKyTuTu15(str) {
    // Sử dụng phương thức substring để lấy ký tự từ vị trí thứ 15 trở đi
    return str?.substring(15);
  }
export function formatISODateToDateString(isoDateString) {
    if (isoDateString ==='') {
      return ""; // Trả về null nếu không hợp lệ
    }
    
    const dateObject = new Date(isoDateString);
  
    // Kiểm tra nếu dateObject không hợp lệ
  
    const formattedDate = `${dateObject.getDate().toString().padStart(2, '0')}-${(dateObject.getMonth() + 1).toString().padStart(2, '0')}-${dateObject.getFullYear()}`;
    
    return formattedDate;
  }
export  function formatDateTime(dateTimeString) {
    const originalDate = new Date(dateTimeString);
    
    // Định dạng lại chuỗi ngày và giờ phút
    const formattedDate = `${originalDate.toLocaleDateString()} ${originalDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}`;
  
    return formattedDate;
  }
  export const exportToExcel = async (sheetName, columns, data, fileName) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(sheetName);
    const headerStyle = {
      font: { bold: true, color: { argb: 'FFFFFF' } },
      fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: '002d72' } },
    };
    const titleRow = worksheet.addRow(['Tập đoàn Thaco Auto']);
    titleRow.height = 30; 
    titleRow.getCell(1).alignment = { vertical: 'middle', horizontal: 'center' }; 
    titleRow.getCell(1).font = { size: 18, color: { argb: '002d72' } }; 
    worksheet.addRow(columns).eachCell((cell) => {
      cell.style = headerStyle;
    });
    data.forEach((item, index) => {
      worksheet.addRow([index + 1, item?.COM?.COM_CODE, item?.COM?.COM_NAME_VN, item?.QUANTITY, item?.PAG_NAME_VN, item?.vehicle?.Vehicle?.VEH_NAME, formatDateTime(item?.CREATED_DATE), item?.NOTE]);
    });
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  

 