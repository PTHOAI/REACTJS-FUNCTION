import React, { useEffect, useState } from "react";

const ChangePassword = ({ isOpen, onClose }) => {

    return (
        <div style={{ display: isOpen ? 'block' : 'none' }} className='wrap-modal-react'>
            <div className="modal-react">
                <div style={{ width: '800px', height: 'auto' }} className="box-modal-react">
                    <div className="modal-react-header">
                        <span className="modal-react-header-content">Thay đổi mật khẩu</span>
                        <i onClick={onClose} style={{ cursor: 'pointer' }} className="bi bi-x-lg modal-react-header-content"></i>
                    </div>
                    <div className="modal-react-content">
                        <form className="row g-2">
                            <div className="col-md-12">
                                <label htmlFor="userNa,e" className="form-label">Mật khẩu hiện tại </label>
                                <input placeholder="Nhập mật khẩu hiện tại..." type="password" className="form-control" id="userNa,e" name="quality"/>
                            </div>
                            <div className="col-md-12">
                                <label htmlFor="email" className="form-label">Mật khẩu mới </label>
                                <input placeholder="Nhập mật khẩu mới..." type="password" className="form-control" id="email" name="quality"/>
                            </div>
                            <div className="col-md-12">
                                <label htmlFor="number-phone" className="form-label">Nhập lại mật khẩu </label>
                                <input placeholder="Nhập lại mật khẩu mới..." type="password" className="form-control" id="number-phone" name="quality"/>
                            </div>
                            
                            <div className="col-12 group-button-modal">
                                <div onClick={onClose} className='button-back'>Đóng</div>
                                <div className='button-action' >Lưu</div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ChangePassword;
