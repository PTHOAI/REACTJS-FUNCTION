import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faImage, faTimes } from "@fortawesome/free-solid-svg-icons";
import componentService from "../../services/component.service";
import Datalist from "../datalist/datalist";
import { toast } from "react-toastify";

const UpdateSavePartModal = ({ isOpen, onClose, onSubmit,Id }) => {
  const [data, setData] = useState({
    quantity: "",
    note: "",
  });
  useEffect(() => {
    const fetchData = async () => {
        if(Id){
      const detail = await componentService.getDetailSaveParts(Id);
      if (detail) {
        setData({...data, quantity: detail.QUANTITY , note: detail.NOTE});
      }
    }
    };
    fetchData();
  }, [Id]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const created = await componentService.updateSaveParts(Id,data);
      if (created ) {
        onClose();
        onSubmit();
        toast.success("CẬP NHẬP LƯU TRỮ LINH KIỆN THÀNH CÔNG", {
          theme: "colored",
        });
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message, {
          theme: "colored",
        });
      }
    }
  };

  return (
    <div
      style={{ display: isOpen ? "block" : "none" }}
      className="wrap-modal-react">
      <div className="modal-react">
        <div
          style={{ width: "800px", height: "auto" }}
          className="box-modal-react">
          <div className="modal-react-header">
            <span className="modal-react-header-content">
              Cập nhập lưu trữ linh kiện
            </span>
            <i
              onClick={onClose}
              style={{ cursor: "pointer" }}
              className="bi bi-x-lg modal-react-header-content"></i>
          </div>
          <div className="modal-react-content">
            <form className="row g-2">
              <div className="col-md-6 row">
                <label htmlFor="inputEmail4" className="form-label">
                  Số lượng:{" "}
                </label>
                <input
                  type="number"
                  name="quantity"
                  placeholder="Nhập số lượng"
                  value={data?.quantity || ""}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 hover:text-black"
                />
              </div>
              <div className="col-md-12">
                <label htmlFor="inputPassword4" className="form-label">
                  Ghi chú{" "}
                </label>
                <textarea
                  placeholder="Nhập tên bộ phận ..."
                  type="text"
                  className="form-control"
                  id="inputPassword4"
                  name="note"
                  value={data?.note}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 group-button-modal">
                <div onClick={onClose} className="button-back">
                  Đóng
                </div>
                <div className="button-action" onClick={handleSubmit}>
                  Lưu
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateSavePartModal;
