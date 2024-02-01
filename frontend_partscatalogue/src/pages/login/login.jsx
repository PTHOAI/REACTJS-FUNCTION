import React from 'react';
import "./../../assets/css/login.css";
import Images from '../../assets/images/images';
import LanguageLogin from '../../component/login/language'
import FormLogin from '../../component/login/form'
import FooterLogin from "../../component/login/footer"
import { useState } from 'react';


function PageLogin() {
  const [valueLan, setvalueLan] = useState("VN");
  const updateLanguage = (lan) => {
    setvalueLan(lan)
  }
  return (
    <div className="wrap" style={{ marginTop: "78px"}}>

      {/* start header */}
     {/* <div className="header" style={{display: 'flex', background: '#00529c', padding: '10px 0px'}}>
          <div style={{flex: '20%', padding: '10px 20px', display: 'flex', alignItems: 'center'}} className="wrap-logo">
            <img style={{padding: '10px', borderRadius: '15px', width: '170px', background: 'white'}} src={Images.logoThaco} alt="" />
            <div style={{textShadow: '0 0 20px #ccdbfe, 10px -10px 30px #97abfe, -20px -20px 40px #6393ff, 20px -40px 50px #2d67ec, -20px -60px 60px #053bcd, 0 -80px 70px #973716, 10px -90px 80px #451b0e', fontWeight: 600, fontSize: '20px', color: '#fffcd8', marginLeft: '10px'}}>Part Catalogue</div>
          </div>
          <div style={{flex: '80%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingRight: '20px'}} className="wrap-CN">
            <div className="wrap-nn" style={{display: 'flex', color: 'white', alignItems: 'center'}}>
            </div>
            <LanguageLogin getLanguage={(e) => updateLanguage(e)} ></LanguageLogin>
          </div>
  </div> */}

      {/* end header */}

      {/* start content */}
      <FormLogin language = {valueLan}></FormLogin>
    {/* end content */}

      {/* start footer */}
      {/* and header */}

    </div>
    
  );
}

export default PageLogin;