import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import authService from "../../services/auth.service";
import { toast } from "react-toastify";
import Datalist from "../datalist/datalist";
import classnames from "classnames";

const AddUserModal = ({ isOpen, onClose, isEditMode, vehId, onSubmit }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.user);
  const [roles, setRoles] = useState([]);
  const [hasTyped, setHasTyped] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [errorCheckPass, setErrorCheckPass] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [data, setData] = useState({
    email: "",
    password: "",
    nameRole: "",
    username: "",
    address: "",
    note: "",
    phoneNumber: "",
    role_id: "",
    passWordAgain: "",
  });

  const fetchData = async () => {};

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    const fetchDataRoles = async () => {
      const resuft = await authService.fetchDataRoles();
      if (resuft) {
        setRoles(resuft);
      }
    };
    if (isEditMode) {
      fetchData();
    }
    if (isEditMode === false) {
    }
    fetchDataRoles();
  }, [vehId, isEditMode]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      setErrorText("Định dạng email không hợp lệ");
    } else {
      setErrorText("");
    }
  };

  const handleAdd = async () => {
    try {
       // Kiểm tra mật khẩu không trùng khớp
    if (data.password !== data.passWordAgain) {
      //setHasTyped(true);
      setErrorCheckPass("Mật khẩu không trùng khớp");
      return ;
    } else {
      setErrorCheckPass("");
    }
      if (!isEditMode) {
        const created = await authService.signUp(data);
        if (created) {
          onClose();
          onSubmit();
        }
      } else {
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
            <span className="modal-react-header-content">Thêm người dùng</span>
            <i
              onClick={onClose}
              style={{ cursor: "pointer" }}
              className="bi bi-x-lg modal-react-header-content"></i>
          </div>
          <div className="modal-react-content">
            <form className="row g-2">
              <div className="col-md-6">
                <label htmlFor="inputEmail4" className="form-label">
                  Tên đăng nhập
                </label>
                <input
                  placeholder="Nhập tên đăng nhập..."
                  type="text"
                  className="form-control"
                  name="username"
                  value={data?.username}
                  onChange={handleChange}
                  id="inputEmail4"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputPassword4" className="form-label">
                  Mật khẩu{" "}
                </label>
                <input
                  placeholder="Nhập mật khẩu..."
                  type="password"
                  className={`form-control ${errorCheckPass && hasTyped ? 'border-b-2 border-red-500' : ''}`}
                  id="inputPassword4"
                  name="password"
                  value={data?.password}
                  onChange={handleChange}
                />
                {errorCheckPass && (
                  <span className="text-red-500 text-sm">{errorCheckPass}</span>
                )}
              </div>
              <div className="col-md-6">
                <label htmlFor="inputPassword4" className="form-label">
                  Nhập lại mật khẩu{" "}
                </label>
                <input
                  placeholder="Nhập lại mật khẩu..."
                  type="password"
                  className={`form-control ${errorCheckPass && hasTyped ? 'border-b-2 border-red-500' : ''}`}
                  id="inputPassword4"
                  name="passWordAgain"
                  value={data?.passWordAgain}
                  onChange={handleChange}
                />
                {errorCheckPass &&  (
                  <span className="text-red-500 text-sm">{errorCheckPass}</span>
                )}
              </div>
              <div className="col-md-6">
                <label htmlFor="inputPassword4" className="form-label">
                  Email{" "}
                </label>
                <input
                  placeholder="Nhập email..."
                  type="email"
                  className={`form-control ${errorText && hasTyped ? 'border-b-2 border-red-500' : ''}`}
                  id="inputPassword4"
                  name="email"
                  value={data?.email}
                  onChange={handleChange}
                />
                {errorText && hasTyped && (
                  <span className="text-red-500 text-sm">{errorText}</span>
                )}
              </div>
              <div className="col-md-6">
                <label htmlFor="inputPassword4" className="form-label">
                  Số điện thoại{" "}
                </label>
                <input
                  placeholder="Nhập số điện thoại..."
                  type="text"
                  className="form-control"
                  id="inputPassword4"
                  name="phoneNumber"
                  value={data?.phoneNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputPassword4" className="form-label">
                  Đơn vị công tác{" "}
                </label>
                <input
                  placeholder="Nhập đơn vị công tác..."
                  type="text"
                  className="form-control"
                  id="inputPassword4"
                  name="address"
                  value={data?.address}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputPassword4" className="form-label">
                  Ghi chú{" "}
                </label>
                <textarea
                  placeholder="Nhập ghi chú..."
                  type="text"
                  className="form-control"
                  id="inputPassword4"
                  name="note"
                  value={data.note}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="unit" className="form-label">
                  Quyền người dùng
                </label>
                <Datalist
                  options={roles.map((item) => ({
                    id: item.Id,
                    code: item.Id,
                    label: item.Name,
                  }))}
                  onSelect={(id, label) => setData({ ...data, role_id: id })}
                  initialValue={{
                    id: data.role_id,
                    label: data?.role_id,
                  }}
                />
              </div>
              <div className="col-12 group-button-modal">
                <div onClick={onClose} className="button-back">
                  Đóng
                </div>
                <div className="button-action" onClick={handleAdd}>
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
export default AddUserModal;
