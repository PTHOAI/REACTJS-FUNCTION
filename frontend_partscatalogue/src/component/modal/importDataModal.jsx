import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { DataTable } from "../../pages/manager/APIvehecleParts";
import ComponentService from "../../services/component.service";
import { toast } from "react-toastify";


const ImportModal = ({ isOpen, onClose, importedData ,type,handleSelectDataExist}) => {
  const [loading, setLoading] = useState(false);
  const [resultArray, setResultArray] = useState([]);
  const [selectData, setSelectData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      if (importedData && importedData.length > 0) {
        const keys = importedData[0];
        const arrayToObject = (array) => {
          const obj = {};
          keys.forEach((key, index) => {
            obj[key] = array[index];
          });
          return obj;
        };
        const dataArray = importedData.slice(1);
        const result = dataArray.map(arrayToObject);
        setResultArray(result);
        const data = JSON.stringify(importedData, null, 2);
        const parsedData = await JSON.parse(data);
        setSelectData(parsedData);
      }
    };
    fetchData();
  }, [importedData]);
  
  const handleSubmit = async () => {
    try {
      setLoading(true);
      let resultMessage = "";
      if (type === 'component') {
        const createListCom = await ComponentService.createListComponent(selectData);
        if (createListCom.length >0) {
          onClose();      
          resultMessage = "IMPORT FILE LINH KIỆN THÀNH CÔNG";
          if(resultMessage){
            handleSelectDataExist(createListCom)
          }
          toast.success(resultMessage, { theme: "colored" });
        } else {
          resultMessage = "IMPORT FILE LINH KIỆN KHÔNG THÀNH CÔNG";
          toast.error(resultMessage, { theme: "colored" });
        }
      }   
      if (type === 'packagecomponent') {
        const createListPackCom = await ComponentService.createListPackageComponent(selectData);
        if (createListPackCom.length >0) {
          onClose();
          resultMessage = "IMPORT FILE CỤM LINH KIỆN THÀNH CÔNG";
          toast.success(resultMessage, { theme: "colored" });
        } else {
          resultMessage = "IMPORT FILE CỤM LINH KIỆN KHÔNG THÀNH CÔNG";
          toast.error(resultMessage, { theme: "colored" });
        }
      }
      if (type === 'packagebom') {
        const createListPackBom = await ComponentService.createListPKBom(selectData);
        if (createListPackBom.length > 0) {
          onClose();
          resultMessage = "IMPORT FILE BOM CỤM  THÀNH CÔNG";
          toast.success(resultMessage, { theme: "colored" });
        } else {
          resultMessage = "IMPORT FILE BOM CỤM  KHÔNG THÀNH CÔNG";
          toast.error(resultMessage, { theme: "colored" });
        }
      }  
    } catch (err) {
      toast.error(`CÓ LỖI XẢY RA KHI IMPORT FILE LINH KIỆN ${err}`, { theme: "colored" });
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Imported Data Modal"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
          width: "40%",
          height: "auto",
          margin: "auto",
          padding: "20px",
          borderRadius: "8px",
        },
      }}>
      <div>
        <h2>Imported Data</h2>
        <span
          className="absolute top-0 right-0 m-2 cursor-pointer text-2xl"
          onClick={onClose}>
          &times;
        </span>
        <table className="table">
          <tbody>
            {selectData?.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((item, columnIndex) => (
                  <td key={columnIndex}>{item !== null ? item : ""}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>    
      <div className="flex  justify-end">
        <button
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
          type="button"
          onClick={handleSubmit}>
          Lưu
        </button>
      </div>
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex items-center text-white">
            <span className="mr-2">Đang xử lý...</span>
            <div className="animate-spin rounded-full border-t-4 border-b-4 border-white h-5 w-5"></div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ImportModal;
