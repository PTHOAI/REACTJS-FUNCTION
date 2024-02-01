// ExampleComponent.jsx

import React from 'react';

// Functional Component

const Footer = ({ name }) => {

  return (
    <div id="footer" style={{fontSize:'14px', background: '#00529c', position:'relative'}}>
    <div className="wrap-footer" style={{display: 'flex', color: 'white', padding: '10px 20px'}}>
    <div style={{flex: '50%', display: 'flex', alignItems: 'center'}} className="GT">
        <span>Website chuyên cung cấp mã số linh kiện phụ tùng cho tất cả dòng xe thuộc THACO AUTO sản xuất</span>
    </div>
    <div style={{flex: '50%', justifyContent: 'flex-end', display: 'flex', alignItems: 'center'}} className="Conect">
        <div className="wrap-conect">
        <div className="address">
            <i className="bi bi-geo-alt-fill"  style={{marginRight: "5px"}}/>
            <span>KCN THACO Chu Lai, Xã Tam Hiệp, Huyện Núi Thành, Tỉnh Quảng Nam</span>
        </div>
        <div className="phone" style={{marginTop: '10px'}}>
            <i className="bi bi-envelope-at-fill" style={{marginRight: "5px"}} />
            <span>rd-cntt@thaco.com.vn</span>
        </div>
        </div>
    </div>
    </div>
    <div style={{background: 'black', color: '#6c757d', textAlign: 'center', padding: '10px'}} className="BQ">© 2023 BẢN QUYỀN CỦA THACO AUTO</div>
</div>
  );
};

export default Footer;
