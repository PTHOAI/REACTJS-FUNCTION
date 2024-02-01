import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import VehicleService from "../../services/vehicle.service";
import { toast } from "react-toastify";
import Datalist from '../datalist/datalist';
import SelectOptionSingle, {VALUE_SELECT,SETVALUESELECT} from "../../component/selectOptionSingle/selectOptionSingle";
const AddTradeMarkModal = ({ isOpen, onClose, isEditMode, vehId, onSubmit }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.user);
  const [groupCars, setGroupCars] = useState([]);
  const [carData, setcarData] = useState({
    vem_code: "",
    vem_name:"",
    department_id:"",
  });
  const DATA_SL_UNIT = [];

  groupCars.map(item => DATA_SL_UNIT.push({code:item.CODE, name:item.NAME_VN}))
  const fetchData = async () =>{ 
    let result
    if(vehId){
         result = await VehicleService.fetchUnitCar(vehId)
    }
    if(result){
    setcarData({...carData,vem_code : result?.CODE,vem_name: result?.NAME_VN, name_en: result?.NAME_EN})
    }
}

    useEffect(()=>{
        const fetchDataUnitCar = async ()=>{
            const listUnitCar = await VehicleService.fetchListUnitCar();
            console.log("listUnitCar",listUnitCar)
            setGroupCars(listUnitCar);
        }   
      if(isEditMode){
        fetchData()
      }
      if(isEditMode === false){
        setcarData({...carData,code : "",name_vn: "", name_en: ""})
      }
      fetchDataUnitCar();
    },[vehId,isEditMode])

  const handleChange = (e) => {
    setcarData({ ...carData, [e.target.name]: e.target.value });
  };

  const handleAddunitCar = async () => {
    let id = "";
    groupCars.map((item) => {
      if(item.CODE == VALUE_SELECT['select-unit1'].code){
        id = item.ID
      }
    })
    // xử lý dữ liệu lấy id select trước khi call API 
    try {
      if(!isEditMode){
      const createUnitCar = await VehicleService.createTradeMark({ ...carData, department_id: id });
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
            <span className="modal-react-header-content">Thêm thương hiệu xe</span>
            <i onClick={onClose} style={{ cursor: 'pointer' }} className="bi bi-x-lg modal-react-header-content"></i>
          </div>
          <div className="modal-react-content">
            <form className="row g-2">
              <div className="col-md-6">
                <label htmlFor="inputEmail4" className="form-label">Mã thương hiệu xe</label>
                <input placeholder="Nhập mã thương hiệu xe..." type="text" className="form-control" name="vem_code" value={carData?.vem_code} onChange={handleChange} id="inputEmail4" />
              </div>            
              <div className="col-md-6">
                <label htmlFor="inputPassword4" className="form-label">Tên thương hiệu xe </label>
                <input placeholder="Nhập tên thương hiệu xe..." type="text" className="form-control" id="inputPassword4" name="vem_name" value={carData?.vem_name} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label htmlFor="fileLOGO" className="form-label">Logo</label>
                <input className="form-control" type="file" id="fileLOGO" />
              </div>
              <div className="col-md-6">
                <label htmlFor="unit" className="form-label">Đơn vị</label>
                {/* <Datalist
                  options={groupCars.map((item) => ({
                    id: item.ID,
                    code: item.CODE,
                    label: item.NAME_VN,
                  }))}
                  onSelect={(id, label) => setcarData({ ...carData, department_id: id })}
                  initialValue={{ id: carData.department_id, label: carData?.department_id }}
                /> */}
                <SelectOptionSingle idSetValue= 'select-value-unit1' id='select-unit1' valueSelect = {DATA_SL_UNIT}></SelectOptionSingle>
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
}
export default AddTradeMarkModal;
