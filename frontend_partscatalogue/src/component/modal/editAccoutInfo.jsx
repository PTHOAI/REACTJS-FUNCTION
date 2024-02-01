import React, { useEffect, useState } from "react";

const EditAccoutInfo = ({ isOpen, onClose }) => {

    return (
        <div style={{ display: isOpen ? 'block' : 'none' }} className='wrap-modal-react'>
            <div className="modal-react">
                <div style={{ width: '800px', height: 'auto' }} className="box-modal-react">
                    <div className="modal-react-header">
                        <span className="modal-react-header-content">Thông tin tài khoản</span>
                        <i onClick={onClose} style={{ cursor: 'pointer' }} className="bi bi-x-lg modal-react-header-content"></i>
                    </div>
                    <div className="modal-react-content">
                        <form className="row g-2">
                            <div className="col-md-6">
                                <label htmlFor="username" className="form-label">Tên đăng nhập </label>
                                <input placeholder="Nhập tên đăng nhập..." type="text" className="form-control" id="username" name="quality"/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="email" className="form-label">Email </label>
                                <input placeholder="Nhập email..." type="text" className="form-control" id="email" name="quality"/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="number-phone" className="form-label">SĐT </label>
                                <input placeholder="Nhập sđt..." type="text" className="form-control" id="number-phone" name="quality"/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="address" className="form-label">Địa chỉ </label>
                                <input placeholder="Nhập địa chỉ..." type="text" className="form-control" id="address" name="quality"/>
                            </div>
                            <div className="col-md-12">
                                <label htmlFor="note" className="form-label">Ghi chú </label>
                                <textarea placeholder="Nhập ghi chú..." type="text" className="form-control" id="note" name="decription" />
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
export default EditAccoutInfo;
