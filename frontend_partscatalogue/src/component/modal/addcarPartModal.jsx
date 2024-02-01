import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faImage, faTimes } from "@fortawesome/free-solid-svg-icons";
import vehicleService from "../../services/vehicle.service";
import Datalist from "../datalist/datalist";
import { toast } from "react-toastify";

const AddCarPartModal = ({ isOpen, onClose, onSubmit }) => {
  const [partCar, setPartCar] = useState({
    partNameVN: "",
    partNameEN: "",
    idCar: "",
    img: "",
    nameCar: "",
  });
  const [listVehicle, setListVehicle] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const listVehicle = await vehicleService.fetchlistVehicle();
      if (listVehicle) {
        setListVehicle(listVehicle);
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
    try{
    const createCarPart = await vehicleService.createCarPart(partCar);
    if (createCarPart) {
      onClose();
      toast.success("THÊM BỘ PHẬN THÀNH CÔNG", {
        theme: "colored",
      });
    }
  }catch(error){
    if (error.response) {
      toast.error(error.response.data.message, {
        theme: "colored",
      });
    }
  }
  };

  return (
    <div style={{ display: isOpen ? 'block' : 'none' }} className='wrap-modal-react'>
    <div className="modal-react">
      <div style={{ width: '800px',height:'auto' }} className="box-modal-react">
        <div className="modal-react-header">
          <span className="modal-react-header-content">Thêm bộ phận xe</span>
          <i onClick={onClose} style={{ cursor: 'pointer' }} className="bi bi-x-lg modal-react-header-content"></i>
        </div>
        <div className="modal-react-content">
          <form className="row g-2">
            <div className="col-md-5">
              <label htmlFor="inputEmail4" className="form-label">Tên bộ phận tiếng việt</label>
              <input placeholder="Nhập tên bộ phận..." type="text" className="form-control" name="partNameVN" value={partCar?.partNameVN} onChange={handleChange} id="inputEmail4" />
            </div>            
            <div className="col-md-5">
              <label htmlFor="inputPassword4" className="form-label">Tên bộ phận tiếng anh </label>
              <input placeholder="Nhập tên bộ phận ..." type="text" className="form-control" id="inputPassword4" name="partNameEN" value={partCar?.partNameEN} onChange={handleChange} />
            </div>
            <div className="col-md-12">
              <label htmlFor="unit" className="form-label">Tên Xe</label>
              <Datalist
               options={listVehicle.map((item) => ({
                 id: item.VEH_ID,
                 code:item.VEH_CODE,
                 label: item.VEH_NAME,
               }))}
                onSelect={(id, label) => {
                 setPartCar({ ...partCar, idCar: id });
               }}
               initialValue={{ id: partCar.idCar, label: partCar?.nameCar }}
             />
            </div>
            <div className="col-12 group-button-modal">
              <div onClick={onClose} className='button-back'>Đóng</div>
              <div className='button-action' onClick={handleSubmit}>Lưu</div>
            </div>            
          </form>
        </div>
      </div>
    </div>
  </div>
  );
};

export default AddCarPartModal;
