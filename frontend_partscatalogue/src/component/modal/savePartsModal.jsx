import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { DataTable } from "../../pages/manager/APIvehecleParts";
import ComponentService from "../../services/component.service";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {fetchDataSuccess } from "../../redux/cartPartSlice";

const SavePartsModal = ({ isOpen, onClose, selectedRows }) => {
  const dispatch = useDispatch();
  const [editedRows, setEditedRows] = useState({});
  const handleInputChange = (index, key, value) => {
    // Lưu trữ giá trị chỉnh sửa vào state
    setEditedRows((prevEditedRows) => ({
      ...prevEditedRows,
      [index]: {
        ...prevEditedRows[index],
        [key]: value,
      },
    }));
  };
  const handleSave = async () => {
    const updatedRows =  await selectedRows.map((item, index) => ({
      ...item,
      quantity: editedRows[index]?.quantity || item.quantity || 0, 
      note: editedRows[index]?.note || item.note || "",
    }));

    const result = await ComponentService.saveParts(updatedRows);
    if(result){
      toast.success("ĐÃ LƯU LINH KIỆN THÀNH CÔNG", {
        theme: "colored",
      });
        dispatch(fetchDataSuccess(updatedRows.length));
        onClose();
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
          height: "60%",
          margin: "auto",
          padding: "20px",
          borderRadius: "8px",
        },
      }}>
      <div>
        <h2>Lưu Trữ Linh Kiện</h2>
        <span
          className="absolute top-0 right-0 m-2 cursor-pointer text-2xl"
          onClick={onClose}>
          &times;
        </span>
        <table className="table">
          <thead style={{ backgroundColor: "#002d72" }}>
            <tr>
              <th>STT</th>
              <th>Mã linh kiện</th>
              <th>Tên linh kiện</th>
              <th style={{ width: "75px", textAlign: "center" }}>Số lượng</th>
              <th>Ghi chú</th>
            </tr>
          </thead>
          <tbody>
            {selectedRows?.length > 0 ? (
              selectedRows.map((item, index) => (
                <tr key={index} className="">
                  <td>{index + 1}</td>
                  <td>{item?.COM_CODE}</td>
                  <td>{item?.COM_NAME_VN}</td>
                  <td>
                    <input
                      type="number"
                      value={editedRows[index]?.quantity || ""}
                      onChange={(e) =>
                        handleInputChange(index, "quantity", e.target.value)
                      }
                      className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 hover:text-black"
                    />
                  </td>
                  <td>
                    <textarea
                      value={editedRows[index]?.note || ""}
                      onChange={(e) =>
                        handleInputChange(index, "note", e.target.value)
                      }
                      className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 resize-y hover:text-black"
                    />
                  </td>
                  <td>
                    <div className="wrap-action-item"></div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  Không tìm thấy kết quả cần tìm
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex  justify-end">
        <button
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
          type="button"
           onClick={handleSave}
        >
          Lưu
        </button>
      </div>
      {/* {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex items-center text-white">
            <span className="mr-2">Đang xử lý...</span>
            <div className="animate-spin rounded-full border-t-4 border-b-4 border-white h-5 w-5"></div>
          </div>
        </div>
      )} */}
    </Modal>
  );
};

export default SavePartsModal;
