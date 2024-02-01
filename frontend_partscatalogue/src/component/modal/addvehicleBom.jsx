import React, { useEffect, useState } from "react";
import vehicleService from "../../services/vehicle.service";
import Datalist from "../datalist/datalist";
import { toast } from "react-toastify";
import componentService from "../../services/component.service";

const AddVehicleBomModal = ({ isOpen, onClose, onSubmit }) => {
  const [data, setData] = useState({
    idVehicle: "",
    idPackage: "",
    idPart: "",
    description: "",
  });
  const [listVehicle, setListVehicle] = useState([]);
  const [image, setImage] = useState(null);
  const [pkComs, setPkcoms] = useState([]);
  const [parts,setParts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const listVehicle = await vehicleService.fetchlistVehicle();
      if (listVehicle) {
        setListVehicle(listVehicle);
      }
      if(data?.idVehicle){
      const listPart = await vehicleService.getALLPart(data?.idVehicle);
      if(listPart){
        setParts(listPart)
      }
    }
      const listPkCom = await componentService.getALLPKCom();
      setPkcoms(listPkCom);   
    };
    fetchData();
  }, [data?.idVehicle]);

  const handleImageChange = (e) => {
    // Xử lý khi người dùng chọn hình ảnh
    const file = e.target.files[0];
    setImage(file);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const createVehicleBom = await componentService.createVehicleBom(data);
      if (createVehicleBom) {
        onClose();
        toast.success("THÊM BOM XE THÀNH CÔNG", {
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
              Thêm BOM xe
            </span>
            <i
              onClick={onClose}
              style={{ cursor: "pointer" }}
              className="bi bi-x-lg modal-react-header-content"></i>
          </div>
          <div className="modal-react-content">
            <form className="row g-2">
              <div className="col-md-12">
                <label htmlFor="unit" className="form-label">
                  Xe{" "}
                </label>
                <Datalist
                  options={listVehicle.map((item) => ({
                    id: item.VEH_ID,
                    code: item.VEH_CODE,
                    label: item.VEH_NAME,
                  }))}
                  onSelect={(id, label) => {
                    setData({ ...data, idVehicle: id });
                  }}
                />
              </div>
              <div className="col-md-12">
                <label htmlFor="unit" className="form-label">
                  Cụm{" "}
                </label>
                <Datalist
                  options={pkComs.map((item) => ({
                    id: item.PAG_ID,
                    code: item.PAG_CODE,
                    label: item.PAG_NAME_VN,
                  }))}
                  onSelect={(id, label) => {
                    setData({ ...data, idPackage: id });
                  }}
                />
              </div>
              <div className="col-md-12">
                <label htmlFor="unit" className="form-label">
                  Bộ phận{" "}
                </label>
                <Datalist
                  options={parts.map((item) => ({
                    id: item.ID,
                    code: item?.PAG_CODE,
                    label: item?.PART_NAME_VN,
                  }))}
                  onSelect={(id, label) => {
                    setData({ ...data, idPart: id });
                  }}
                />
              </div>
              <div className="col-md-12">
                <label htmlFor="inputPassword4" className="form-label">
                  Ghi chú{" "}
                </label>
                <textarea
                  placeholder="Nhập ghi chú..."
                  type="text"
                  className="form-control"
                  id="inputPassword4"
                  name="description"
                  value={data?.description}
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

export default AddVehicleBomModal;
