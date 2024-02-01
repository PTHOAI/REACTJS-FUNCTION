import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import VehicleService from "../../services/vehicle.service";
import { toast } from "react-toastify";
import Datalist from '../datalist/datalist';

const AddSegmentModal = ({ isOpen, onClose, isEditMode, vehId, onSubmit }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.user);
  const [groupCars, setGroupCars] = useState([]);
  const [listTradeMark, setListTradeMark] = useState([]);
  const [data, setData] = useState({
    name_vn: "",
    name_en:"",
    department_id:"",
    trademarkId:"",
    segCode:""
  });

  const fetchData = async () =>{ 
    let result
    if(vehId){
         result = await VehicleService.fetchUnitCar(vehId)
    }
    if(result){
    setData({...data,code : result?.CODE,name_vn: result?.NAME_VN, name_en: result?.NAME_EN})
    }
}

    useEffect(()=>{
        const fetchDataUnitCar = async ()=>{
            const listUnitCar = await VehicleService.fetchListUnitCar();
            setGroupCars(listUnitCar);
            if (data?.department_id) {
                const listTradeMark = await VehicleService.fetchListTradeMarkOfGroup(data?.department_id);
                setListTradeMark(listTradeMark);
              }  
        } 
       
      if(isEditMode){
        fetchData()
      }
      if(isEditMode === false){
        setData({...data,code : "",name_vn: "", name_en: ""})
      }
      fetchDataUnitCar();
    },[vehId,isEditMode,data?.department_id])

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleAddunitCar = async () => {
    try {
      if(!isEditMode){
      const createSegmentCar = await VehicleService.createSegment(data);
      if (createSegmentCar) {
        onSubmit();
        onClose();
      }}
      else{
        const updateSegmentCar = await VehicleService.updateUnitCar(vehId,data);
        if (updateSegmentCar) {
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
            <span className="modal-react-header-content">Thêm phân khúc xe</span>
            <i onClick={onClose} style={{ cursor: 'pointer' }} className="bi bi-x-lg modal-react-header-content"></i>
          </div>
          <div className="modal-react-content">
            <form className="row g-2">
              <div className="col-md-6">
                <label htmlFor="inputEmail4" className="form-label">Mã phân khúc xe</label>
                <input placeholder="Nhập mã thương hiệu xe..." type="text" className="form-control" name="segCode" value={data?.segCode} onChange={handleChange} id="inputEmail4" />
              </div>            
              <div className="col-md-6">
                <label htmlFor="name_VN" className="form-label">Tên tiếng Việt </label>
                <input placeholder="Nhập tên tiếng Việt..." type="text" className="form-control" id="name_VN" name="name_vn" value={data?.name_vn} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label htmlFor="name_EN" className="form-label">Tên Tiếng Anh </label>
                <input placeholder="Nhập tên tiếng Anh..." type="text" className="form-control" id="name_EN" name="name_vn" />
              </div>
              <div className="col-md-6">
                <label htmlFor="unit" className="form-label">Đơn vị</label>
                <Datalist
                  options={groupCars.map((item) => ({
                    id: item.ID,
                    code: item.CODE,
                    label: item.NAME_VN,
                  }))}
                  onSelect={(id, label) => setData({ ...data, department_id: id })}
                  initialValue={{ id: data.department_id, label: data?.department_id }}
                />
              </div>
              <div className="col-md-12">
                <label htmlFor="brand" className="form-label">Thương hiệu</label>
                <Datalist
                  options={listTradeMark?.map((item) => ({
                    id: item?.VEM_ID,
                    code: item?.VEM_CODE,
                    label: item?.VEM_NAME,
                  }))}
                  //defaultValue={selectedTradeMark ? selectedTradeMark.label : ""}
                  initialValue={{ id: data.trademarkId, label: data?.nametradeMark }}
                  onSelect={(id, label) => setData({ ...data, trademarkId: id })}
                 // vehId={vehId}
                />
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
export default AddSegmentModal;
