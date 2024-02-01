import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import VehicleService from "../../services/vehicle.service";
import { toast } from "react-toastify";
import Datalist from '../datalist/datalist';

const AddUnitCarModal = ({ isOpen, onClose, isEditMode, vehId, onSubmit }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.user);
  const [carData, setcarData] = useState({
    code: "",
    name_vn:"",
    name_en:"",
  });

  const fetchData = async () =>{ 
    let result
    if(vehId){
         result = await VehicleService.fetchUnitCar(vehId)
    }
    if(result){
      setcarData({...carData,code : result?.CODE,name_vn: result?.NAME_VN, name_en: result?.NAME_EN})
    }
}

    useEffect(()=>{
      if(isEditMode){
        fetchData()
      }
      if(isEditMode === false){
        setcarData({...carData,code : "",name_vn: "", name_en: ""})
      }
    },[vehId,isEditMode])

  const handleChange = (e) => {
    setcarData({ ...carData, [e.target.name]: e.target.value });
  };

  const handleAddunitCar = async () => {
    try {
      if(!isEditMode){
      const createUnitCar = await VehicleService.createUnitVehicle(carData);
      if (createUnitCar) {
        onSubmit();
        onClose();
      }}
      else{
        const updateUnitCar = await VehicleService.updateUnitCar(vehId,carData);
        if (updateUnitCar) {
          onSubmit();
          onClose();
        }
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
    <div style={{ display: isOpen ? 'block' : 'none' }} className='wrap-modal-react'>
      <div className="modal-react">
        <div style={{ width: '800px',height:'auto' }} className="box-modal-react">
          <div className="modal-react-header">
            <span className="modal-react-header-content">Thêm đơn vị xe</span>
            <i onClick={onClose} style={{ cursor: 'pointer' }} className="bi bi-x-lg modal-react-header-content"></i>
          </div>
          <div className="modal-react-content">
            <form className="row g-2">
              <div className="col-md-5">
                <label htmlFor="inputEmail4" className="form-label">Mã đơn vị xe</label>
                <input placeholder="Nhập mã đơn vị xe..." type="text" className="form-control" name="code" value={carData?.code} onChange={handleChange} id="inputEmail4" />
              </div>
              <div className="col-md-5">
                <label htmlFor="inputPassword4" className="form-label">Tên đơn vị xe tiếng Việt </label>
                <input placeholder="Nhập tên đơn vị xe..." type="text" className="form-control" id="inputPassword4" name="name_vn" value={carData?.name_vn} onChange={handleChange} />
              </div>
              <div className="col-md-5">
                <label htmlFor="inputPassword4" className="form-label">Tên đơn vị xe tiếng Anh</label>
                <input placeholder="Nhập tên đơn vị xe..." type="text" className="form-control" id="inputPassword4" name="name_en" value={carData?.name_en} onChange={handleChange} />
              </div>
              <div className="col-12 group-button-modal">
                <div onClick={onClose} className='button-back'>Đóng</div>
                <div className='button-action' onClick={handleAddunitCar}>Lưu</div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddUnitCarModal;
