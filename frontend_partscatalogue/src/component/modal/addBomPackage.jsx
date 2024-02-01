import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ComponentService from "../../services/component.service";
import { toast } from "react-toastify";
import Datalist from '../datalist/datalist';
import componentService from "../../services/component.service";

const AddBomPackageModal = ({ isOpen, onClose, isEditMode, vehId, onSubmit }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.user);
  const [partentPkcoms, setPartentPkcoms] = useState([]);
  const [listUnit, setListUnit] = useState([]);
  const [data, setData] = useState({
    com_id: "",
    quality:"",
    pkCom_id:"",
    decription:"",
  });

  const fetchData = async () =>{ 
    let result
    if(vehId){
        // result = await VehicleService.fetchUnitCar(vehId)
    }
   
}

    useEffect(()=>{
        const fetchDataPkcoms = async ()=>{
            const list = await componentService.getALLPKCom();
            setPartentPkcoms(list);
            const listUnit= await ComponentService.getALLCom();
            if (listUnit) {
              setListUnit(listUnit);
            }
        }   
      if(isEditMode){
        fetchData()
      }
      if(isEditMode === false){
        setData({...data,code : "",name_vn: "", name_en: ""})
      }
      fetchDataPkcoms();
    },[vehId,isEditMode])

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleAddunitCar = async () => {
    try {
      if(!isEditMode){
      const createPkCom = await ComponentService.createPkBOM(data);
      if (createPkCom) {
        onSubmit();
        onClose();
      }}
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
            <span className="modal-react-header-content">Thêm BOM cụm</span>
            <i onClick={onClose} style={{ cursor: 'pointer' }} className="bi bi-x-lg modal-react-header-content"></i>
          </div>
          <div className="modal-react-content">
            <form className="row g-2">         
              <div className="col-md-12">
              <label htmlFor="unit" className="form-label">linh kiện</label>
              <Datalist
               options={listUnit.map((item) => ({
                 id: item.COM_ID,
                 code:item.COM_CODE,
                 label: item.COM_NAME_VN,
               }))}
                onSelect={(id, label) => {
                 setData({ ...data,com_id: id });
               }}
             />
            </div>
              <div className="col-md-6">
                <label htmlFor="unit" className="form-label">Cụm</label>
                <Datalist
                  options={partentPkcoms.map((item) => ({
                    id: item.PAG_ID,
                    code: item.PAG_CODE,
                    label: item.PAG_NAME_VN,
                  }))}
                  onSelect={(id, label) => setData({ ...data, pkCom_id: id })}
                 // initialValue={{ id: carData.department_id, label: carData?.department_id }}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputPassword4" className="form-label">Số lượng </label>
                <input placeholder="Nhập số lượng..." type="text" className="form-control" id="inputPassword4" name="quality" value={data?.quality} onChange={handleChange} />
              </div>   
              <div className="col-md-12">
                <label htmlFor="inputPassword4" className="form-label">Ghi chú </label>
                <textarea placeholder="Nhập ghi chú..." type="text" className="form-control" id="inputPassword4" name="decription" value={data?.decription} onChange={handleChange} />
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
export default AddBomPackageModal;
