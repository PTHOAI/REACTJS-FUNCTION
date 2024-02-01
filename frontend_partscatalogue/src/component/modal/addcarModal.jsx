import React, { useEffect, useState } from "react";
import Datalist from '../datalist/datalist';
import { useDispatch, useSelector } from "react-redux";
import VehicleService from "../../services/vehicle.service";
import { toast } from "react-toastify";

const AddCarModal = ({ isOpen, onClose, isEditMode, vehId, showModal }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.user);
  const [selectedImage, setSelectedImage] = useState(null);
  const [groupCars, setGroupCars] = useState([]);
  const [listTradeMark, setListTradeMark] = useState([]);
  const [listSegment, setListSegment] = useState([]);
  const [carData, setcarData] = useState({
    description: "",
    groupId: "",
    codeCar: "",
    codeCatalog: "",
    trademarkId: "",
    segmentId: "",
    img: null,
    pdf_HDSD: null,
    pdf_Catalog: null,
    pdf_BDSD: null,
    nameCar: "",
    activated:"",
    nameGroup:"",
    nametradeMark:"",
    nameSegment:''
  });

  useEffect(() => {
    const fetchData = async () => {
      const listUnitCar = await VehicleService.fetchListUnitCar();
      setGroupCars(listUnitCar);
      if (carData?.groupId) {
        const listTradeMark = await VehicleService.fetchListTradeMarkOfGroup(carData?.groupId);
        setListTradeMark(listTradeMark);
      }
      if (carData.trademarkId) {
        const listSegment = await VehicleService.fetchListSegmentOfTradeMark(carData?.trademarkId);
        setListSegment(listSegment);
      }
    };
    fetchData();
  }, [carData.groupId, carData.trademarkId]);

  const fetchData = async () =>{
    let vehicle
    if(vehId){
     vehicle = await VehicleService.fetchDetailVehicle(vehId);
    }
    if(vehicle){
      setcarData({
       ...carData,
        codeCar: vehicle?.VEH_CODE,
        nameCar: vehicle?.VEH_NAME,
        description: vehicle?.VEH_NOTE,
        activated: vehicle?.IS_ACTIVE,
        groupId: vehicle?.VehicleModel?.Departments?.ID,
        trademarkId: vehicle?.VehicleModel?.VEM_ID,
        segmentId: vehicle?.Segment?.ID_SEGMENT,
        nameGroup:vehicle?.VehicleModel?.Departments?.NAME_VN  ,
        nametradeMark:vehicle?.VehicleModel?.VEM_NAME,
        nameSegment:vehicle?.Segment?.NAME_VN ? vehicle?.Segment?.NAME_VN :" "
      });
    }
  }

  useEffect(() => { 
    if(isEditMode){
      fetchData()
    }
    if(!isEditMode){
      setcarData({...carData, codeCar: "",
        nameCar:"" ,
        description: "",
        activated:"" ,
        groupId: "",
        trademarkId:"" ,
        segmentId: "",
        nameGroup:"" ,
        nametradeMark:"",
        nameSegment:""})
    }

  }, [vehId, isEditMode]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    setcarData({ ...carData, img: file });
  };

  const handleFileChange = (type) => (event) => {
    const file = event.target.files[0];
    setcarData({ ...carData, [type]: file });
  };

  const handleChange = (e) => {
    setcarData({ ...carData, [e.target.name]: e.target.value });
  };

  const handleAddCar = async () => {
    try {
      const createCar = await VehicleService.createCar(carData.pdf_Catalog, carData.pdf_BDSD, carData.pdf_HDSD, carData.img, carData);
      if (createCar) {
        onClose();
        toast.success("THÊM XE THÀNH CÔNG", {
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
  const handleCloseModal = () => {
    onClose();// Reset state when closing the modal
  };

  return (
    <div style={{ display: isOpen ? 'block' : 'none' }} className='wrap-modal-react'>
      <div className="modal-react">
        <div style={{ width: '800px' }} className="box-modal-react">
          <div className="modal-react-header">
            <span className="modal-react-header-content">Thêm xe</span>
            <i onClick={handleCloseModal} style={{ cursor: 'pointer' }} className="bi bi-x-lg modal-react-header-content"></i>
          </div>
          <div className="modal-react-content">
            <form className="row g-3">
              <div className="col-md-2">
                <label htmlFor="inputEmail4" className="form-label">Mã xe</label>
                <input placeholder="Nhập mã xe..." type="text" className="form-control" name="codeCar" value={carData?.codeCar} onChange={handleChange} id="inputEmail4" />
              </div>
              <div className="col-md-5">
                <label htmlFor="inputPassword4" className="form-label">Tên xe</label>
                <input placeholder="Nhập tên xe..." type="text" className="form-control" id="inputPassword4" name="nameCar" value={carData?.nameCar} onChange={handleChange} />
              </div>
              <div className="col-md-5">
                <label htmlFor="unit" className="form-label">Đơn vị</label>
                <Datalist
                  options={groupCars.map((item) => ({
                    id: item.ID,
                    code: item.CODE,
                    label: item.NAME_VN,
                  }))}
                  onSelect={(id, label) => setcarData({ ...carData, groupId: id })}
                  initialValue={{ id: carData.groupId, label: carData?.nameGroup }}
                  isEditMode={isEditMode}
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
                  initialValue={{ id: carData.trademarkId, label: carData?.nametradeMark }}
                  onSelect={(id, label) => setcarData({ ...carData, trademarkId: id })}
                  isEditMode={isEditMode}
                />
              </div>
              <div className="col-md-12">
                <label htmlFor="segment" className="form-label">Phân khúc</label>
                <Datalist
                  options={listSegment?.map((item) => ({
                    id: item?.ID_SEGMENT,
                    code: item?.SEG_CODE,
                    label: item?.NAME_VN,
                  }))}
                 // defaultValue={selectedSegMent ? selectedSegMent.label : ""}
                  initialValue={{ id: carData.segmentId, label: carData?.nameSegment }}
                  onSelect={(id, label) => setcarData({ ...carData, segmentId: id })}
                  isEditMode={isEditMode}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputPassword4" className="form-label">Hình xe</label>
                <input className="form-control" type="file" id="fileHDSD" onChange={handleImageChange} />
                {selectedImage && (
                  <div className="show-image-import">
                    <img className='image-import' src={URL.createObjectURL(selectedImage)} alt="" />
                  </div>
                )}
              </div>
              <div className="col-md-6">
                <label htmlFor="inputPassword4" className="form-label">Hướng dẫn sử dụng</label>
                <input className="form-control" type="file" id="fileHDSD" onChange={handleFileChange('pdf_HDSD')} />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputPassword4" className="form-label">Bảo dưỡng sửa chữa</label>
                <input className="form-control" type="file" id="fileBDSC" onChange={handleFileChange('pdf_BDSD')} />
              </div>
              <div style={{ display: 'flex' }} className="col-6">
                <div className="form-check form-switch check-group1">
                  <input className="form-check-input" type="checkbox" checked={carData?.activated} id="ab" onChange={(e)=>{setcarData({...carData,activated: e.target.value})}} />
                  <label className="form-check-label check-label-cus" htmlFor="ab">Kích hoạt</label>
                </div>
              </div>
              <div className="col-md-12">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">Ghi chú</label>
                <textarea className="form-control" id="exampleFormControlTextarea1" name="description" value={carData?.description} onChange={handleChange} rows="2"></textarea>
              </div>
              <div className="col-12 group-button-modal">
                <div onClick={handleCloseModal} className='button-back'>Đóng</div>
                <div className='button-action' onClick={handleAddCar}>Lưu</div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCarModal;
