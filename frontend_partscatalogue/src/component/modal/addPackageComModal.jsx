import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ComponentService from "../../services/component.service";
import { toast } from "react-toastify";
import Datalist from '../datalist/datalist';
import componentService from "../../services/component.service";

const AddPackageComModal = ({ isOpen, onClose, isEditMode, vehId, onSubmit }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.user);
  const [partentPkcoms, setPartentPkcoms] = useState([]);
  const [listUnit, setListUnit] = useState([]);
  const [data, setData] = useState({
    comPkCode: "",
    comPkNameEN: "",
    comPkNameVN: "",
    unit_id: "",
    pkParent_id: "",
    decription: "",
    ncc: "",
  });

  const fetchData = async () => {
    let result
    if (vehId) {
      // result = await VehicleService.fetchUnitCar(vehId)
    }
    if (result) {
      setData({ ...data, code: result?.CODE, name_vn: result?.NAME_VN, name_en: result?.NAME_EN })
    }
  }

  useEffect(() => {
    const fetchDataPkcoms = async () => {
      const list = await componentService.getALLPKCom();
      setPartentPkcoms(list);
      const listUnit = await ComponentService.getUnitComs();
      if (listUnit) {
        setListUnit(listUnit);
      }
    }
    if (isEditMode) {
      fetchData()
    }
    if (isEditMode === false) {
      setData({ ...data, code: "", name_vn: "", name_en: "" })
    }
    fetchDataPkcoms();
  }, [vehId, isEditMode])

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handlePkCom = async () => {
    try {
      if (!isEditMode) {
        const createPkCom = await ComponentService.createPkCom(data);
        if (createPkCom) {
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
        <div style={{ width: '800px', height: 'auto' }} className="box-modal-react">
          <div className="modal-react-header">
            <span className="modal-react-header-content">Thêm cụm linh kiện</span>
            <i onClick={onClose} style={{ cursor: 'pointer' }} className="bi bi-x-lg modal-react-header-content"></i>
          </div>
          <div className="modal-react-content">
            <form className="row g-2">
              <div className="col-md-6">
                <label htmlFor="inputEmail4" className="form-label">Mã cụm </label>
                <input placeholder="Nhập mã thương hiệu xe..." type="text" className="form-control" name="comPkCode" value={data?.comPkCode} onChange={handleChange} id="inputEmail4" />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputPassword4" className="form-label">Tên cụm tiếng việt </label>
                <input placeholder="Nhập tên cụm inh kiện..." type="text" className="form-control" id="inputPassword4" name="comPkNameVN" value={data?.comPkNameVN} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputPassword4" className="form-label">Tên cụm tiếng anh </label>
                <input placeholder="Nhập tên cụm inh kiện..." type="text" className="form-control" id="inputPassword4" name="comPkNameEN" value={data?.comPkNameEN} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputPassword4" className="form-label">Nhà cung cấp </label>
                <input placeholder="Nhập tên nhà cung cấp..." type="text" className="form-control" id="inputPassword4" name="ncc" value={data?.ncc} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label htmlFor="unit" className="form-label">Cụm cha</label>
                <Datalist
                  options={partentPkcoms.map((item) => ({
                    id: item.PAG_ID,
                    code: item.PAG_CODE,
                    label: item.PAG_NAME_VN,
                  }))}
                  onSelect={(id, label) => setData({ ...data, pkParent_id: id })}
                // initialValue={{ id: carData.department_id, label: carData?.department_id }}
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="fileSVG" className="form-label">Hình ảnh cụm</label>
                <input className="form-control" type="file" id="fileSVG" />
              </div>

              <div className="col-md-12">
                <label htmlFor="inputPassword4" className="form-label">Ghi chú </label>
                <textarea placeholder="Nhập ghi chú..." type="text" className="form-control" id="inputPassword4" name="decription" value={data?.decription} onChange={handleChange} />
              </div>
              <div className="col-12 group-button-modal">
                <div onClick={onClose} className='button-back'>Đóng</div>
                <div className='button-action' onClick={handlePkCom}>Lưu</div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AddPackageComModal;
