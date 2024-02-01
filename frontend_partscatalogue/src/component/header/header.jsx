// ExampleComponent.jsx

import React, { useState, useEffect } from 'react';
import Images from '../../assets/images/images';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from '../../redux/authSlice';
import componentService from '../../services/component.service';
import { fetchDataSuccess } from "../../redux/cartPartSlice";
import EditAccoutInfo from '../../component/modal/editAccoutInfo';
import ChangePassword from '../../component/modal/changePassword';
// menu chức năng tạo dữ liệu trên website
const MENU_DATA = [
  { name: 'Đơn vị', link: '/home/unitvehicles' },
  { name: 'Thương hiệu', link: '/home/trademark' },
  { name: 'Phân khúc', link: '/home/listsegment' },
  { name: 'Tên xe', link: '/home/sysvehicle' },
  { name: 'Bộ phận xe', link: '/home/sysvehicleParts' },
  { name: 'Đơn vị tính', link: '/home/listunit' },
  { name: 'Linh kiện', link: '/home/syscomponent' },
  { name: 'Cụm linh kiện', link: '/home/syspackagecomponent' },
  { name: 'BOM cụm', link: '/home/syspackagebom' },
  { name: 'BOM xe', link: '/home/sysvehiclebom' },
  { name: 'File SVG', link: '/home/managefilesvg' },
  { name: 'Tài liệu xe', link: '/home/pdfofcar' },
]
// Functional Component
const Header = ({ name, isFromSearch, isCard }) => {
  console.log("isFromSearch", isFromSearch)
  const user = useSelector((state) => state.auth.user);
  const carts = useSelector((state) => state.carts);
  const [openModalAccountInfo, setOpenModalAccountInfo] = useState(false);
  const [openModalChangePass, setOpenModalChangePass] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async (e) => {
    e.preventDefault();
    navigate("/")
    await dispatch(logout());
  }
  const fetchData = async () => {
    const resuft = await componentService.getSUMSaveParts();
    dispatch(fetchDataSuccess(resuft))
  }
  useEffect(() => {
    fetchData();
  }, [])
  const handleSaveCom = () => {
    navigate("/home/accessorysave")
  }
  return (
    <div>
      <div className="header" style={{ display: 'flex', position: "fixed", top: "0px", width: "100%", background: '#00529c', padding: '10px 0px', zIndex: '9999' }}>
        <div style={{ flex: '30%', padding: '10px 20px', display: 'flex', alignItems: 'center' }} className="wrap-logo">
          <div style={{ cursor: 'pointer' }} onClick={() => navigate('/home')}>
            <img style={{ padding: '10px', borderRadius: '15px', width: '170px', background: 'white' }} src={Images.logoThaco} alt="" />
          </div>
          <div style={{ textShadow: '0 0 20px #ccdbfe, 10px -10px 30px #97abfe, -20px -20px 40px #6393ff, 20px -40px 50px #2d67ec, -20px -60px 60px #053bcd, 0 -80px 70px #973716, 10px -90px 80px #451b0e', fontWeight: 600, fontSize: '20px', color: '#fffcd8', marginLeft: '10px' }}>Parts Catalogue</div>
        </div>
        <div style={{ flex: '70%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingRight: '20px' }} className="wrap-CN">
          <div className="wrap-nn" style={{ display: 'flex', color: 'white', alignItems: 'center' }}>
            <div className="item-search">
              {/* {user && (
                <form className="d-flex">
                  <input style={{ fontSize: '14px', minWidth: '500px', maxHeight: "40px" }} className="form-control me-1" type="search" placeholder="Tìm kiếm" aria-label="Search" />

                  <div className="dropdown" style={{ fontSize: "14px", fontFamily: `"Lato", Arial, sans-serif`, float: 'right', marginLeft: '5px' }}>
                    <button style={{ outline: "none" }} className="dropbtn d-flex align-items-center search-height">
                      <i className="bi bi-search" />
                      <div style={{ width: "70px" }}>Tìm kiếm</div>
                      <i className='dropdown-toggle' />
                    </button>
                    <div className="dropdown-content">
                      <li className="dropdown-item" href="#">Tên xe</li>
                      <li className="dropdown-item" onClick={() => navigate('/home/ressearchaccesory')}>Linh kiện</li>
                    </div>
                  </div>

                </form>
              )} */}
              {isFromSearch && (
                <form className="d-flex">
                  <input style={{ fontSize: '14px', minWidth: '500px', maxHeight: "40px" }} className="form-control me-1" type="search" placeholder="Tìm kiếm" aria-label="Search" />

                  <div className="dropdown" style={{ fontSize: "14px", fontFamily: `"Lato", Arial, sans-serif`, float: 'right', marginLeft: '5px' }}>
                    <button style={{ outline: "none" }} className="dropbtn d-flex align-items-center search-height">
                      <i className="bi bi-search" />
                      <div style={{ width: "70px" }}>Tìm kiếm</div>
                      <i className='dropdown-toggle' />
                    </button>
                    <div className="dropdown-content">
                      <li className="dropdown-item" href="#">Tên xe</li>
                      <li className="dropdown-item" onClick={() => navigate('/home/ressearchaccesory')}>Linh kiện</li>
                    </div>
                  </div>

                </form>
              )}

            </div>
          </div>
          <div className="cnc" style={{ color: 'white', display: 'flex', alignItems: 'center' }} >
            {
              isCard && (
                <button style={{ padding: '4px 7px', background: 'white', color: 'black', borderRadius: '8px', marginLeft: '5px', border: "none", outline: "none" }} onClick={handleSaveCom}>
                  <i style={{ marginRight: '2px', fontSize: '16px' }} className="bi bi-cart4"></i>
                  <span style={{ fontSize: '15px', fontWeight: 700, color: '#F18E00' }} >{carts?.quality}</span>
                </button>
              )
            }
            <div style={{ marginLeft: '10px', display: 'flex', alignItems: 'center' }} className="language">
              <img style={{ width: '35px', marginLeft: '25px' }} src={Images.iconVN} alt="" />
              <div className="dropdown" style={{ fontSize: "14px", fontFamily: `"Lato", Arial, sans-serif` }}>
                <button style={{ paddingLeft: '5px' }} className="dropbtn d-flex align-items-center none-outline" >
                  <span style={{ marginRight: '5px' }}>TIẾNG VIỆT</span>

                  <i className='dropdown-toggle' />
                </button>
                <div className="dropdown-content">
                  <div className='title-lange'>NGÔN NGỮ</div>
                  <hr className="dropdown-divider add" />
                  <li style={{ display: 'flex', alignItems: 'center' }} className="dropdown-item" href="#"><img style={{ width: '25px', height: '20px' }} src={Images.iconVN} alt="" />  <span style={{ marginLeft: '5px' }}>TIẾNG VIỆT</span></li>
                  <li style={{ display: 'flex', alignItems: 'center' }} className="dropdown-item" href="#"><img style={{ width: '25px', height: '20px' }} src={Images.iconENGLISH} alt="" />  <span style={{ marginLeft: '5px' }}>ENGLISH</span></li>
                </div>
              </div>

            </div>
            {user && (
              <div style={{ marginLeft: '10px', display: 'flex', alignItems: 'center' }} className="account">
                <div className="dropdown" style={{ fontSize: "14px", fontFamily: `"Lato", Arial, sans-serif`, float: 'right' }}>
                  <button style={{ outline: 'none' }} className="dropbtn d-flex align-items-center">
                    <span style={{ marginRight: '5px' }} className="user-avatar user-avatar-md">
                      <img style={{ width: '40px' }} alt="avatar" src={Images.iconUSERDEFINE} className="rounded-circle" />
                    </span>
                    <span style={{ marginRight: '5px' }}>{user?.data?.UserName.toUpperCase()}</span>
                    <i className='dropdown-toggle' />
                  </button>

                  <div className="dropdown-content">
                    <li className="dropdown-item" onClick={() => navigate('/home/listAccount')} href="#">Quản lý tài khoản</li>
                    <li className="dropdown-item" onClick={() => setOpenModalAccountInfo(true)}>Thông tin tài khoản</li>
                    <li className="dropdown-item" onClick={() => setOpenModalChangePass(true)}>Đổi mật khẩu</li>
                    {
                      user && (<li className="dropdown-item dropdown-lv2 " href="#">
                        <div className="parent-level-2">
                          <i style={{ marginRight: '5px' }} className='dropdown-toggle' />
                          <span>Cài đặt dữ liệu</span>
                        </div>
                        <div className="dropdown-content-lv2">
                          {MENU_DATA.map(item => <div onClick={() => navigate(item.link)} key={item.name} className="dropdown-item " href="#">{item.name}</div>)}
                        </div>
                      </li>)
                    }
                    <li className="dropdown-item" href="#" onClick={handleLogout}>Đăng xuất</li>
                  </div>

                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <EditAccoutInfo
        isOpen={openModalAccountInfo}
        onClose={() => setOpenModalAccountInfo(false)}
      ></EditAccoutInfo>
      <ChangePassword
        isOpen={openModalChangePass}
        onClose={() => setOpenModalChangePass(false)}
      ></ChangePassword>
    </div>
  );
};

export default Header;
