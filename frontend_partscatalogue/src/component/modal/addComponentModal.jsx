import React, { useEffect, useState } from "react";
import ComponentService from "../../services/component.service";
import Datalist from "../datalist/datalist";
import { toast } from "react-toastify";
const AddComponentModal = ({ isOpen, onClose, onSubmit }) => {
  const [partCar, setPartCar] = useState({
    comNameVN: "",
    comNameEN: "",
    unit_id: "",
    comCode:""
  });
  const [listUnit, setListUnit] = useState([]);
  const [image, setImage] = useState(null);
  const [selectedValue, setSelectedValue] = useState('');
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleSelect = (value) => {
    setSelectedValue(value);
    setDropdownOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const listVehicle = await ComponentService.getUnitComs();
      if (listVehicle) {
        setListUnit(listVehicle);
      }
    };
    fetchData();
  }, []);

  const handleImageChange = (e) => {
    // Xử lý khi người dùng chọn hình ảnh
    const file = e.target.files[0];
    setImage(file);
  };

  const handleChange = (e) => {
    setPartCar({ ...partCar, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const createUnitCom = await ComponentService.createUnitCom(partCar);
      if (createUnitCom) {
        onClose();
        toast.success("THÊM BỘ PHẬN THÀNH CÔNG", {
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
            <span className="modal-react-header-content">Thêm Linh Kiện</span>
            <i
              onClick={onClose}
              style={{ cursor: "pointer" }}
              className="bi bi-x-lg modal-react-header-content"></i>
          </div>
          
          <div className="modal-react-content">
            
            <form className="row g-2">
            <div className="col-md-12">
              <label htmlFor="unit" className="form-label">Tên đơn vị linh kiện</label>
              <Datalist
               options={listUnit.map((item) => ({
                 id: item.UNI_ID,
                 code:item.UNI_CODE,
                 label: item.UNI_NAME,
               }))}
                onSelect={(id, label) => {
                 setPartCar({ ...partCar,unit_id: id });
               }}
             />
            </div>
            <div className="col-md-12">
                <label htmlFor="inputPassword4" className="form-label">
                  Mã linh kiện{" "}
                </label>
                <input
                  placeholder="Nhập mã linh kiện ..."
                  type="text"
                  className="form-control"
                  id="inputPassword4"
                  name="comCode"
                  value={partCar?.comCode}
                  onChange={handleChange}
                />
            </div>
              <div className="col-md-5">
                <label htmlFor="inputEmail4" className="form-label">
                  Tên linh kiện tiếng việt
                </label>
                <input
                  placeholder="Nhập tên linh kiện..."
                  type="text"
                  className="form-control"
                  name="comNameVN"
                  value={partCar?.comNameVN}
                  onChange={handleChange}
                  id="inputEmail4"
                />
              </div>
              <div className="col-md-5">
                <label htmlFor="inputPassword4" className="form-label">
                  Tên linh kiện tiếng anh{" "}
                </label>
                <input
                  placeholder="Nhập tên linh kiện..."
                  type="text"
                  className="form-control"
                  id="inputPassword4"
                  name="comNameEN"
                  value={partCar?.comNameEN}
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

export default AddComponentModal;
