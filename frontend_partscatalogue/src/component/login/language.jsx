import React from 'react';
import { useState } from 'react';
import Images from '../../assets/images/images';
import {TYPE_LANGUAGE} from "../../assets/language/defineLanguage";
import "./../../assets/css/main.css";
import $ from 'jquery';

function LanguageLogin (props) {
    console.log('con')
    const [titleLN, settitleLN] = useState("NGÔN NGỮ");
    const [TypeLanguage, setTypeLanguage] = useState("VN");
    const handleLanguage = (language) => {
        
        setTypeLanguage(language)
        if (language == "VN") {
            settitleLN("NGÔN NGỮ");
        }else {
            settitleLN("LANGUAGE");
        }
        // props.callPageLogin("ok đen to parent")
        if (TypeLanguage != language) {
            props.getLanguage(language) 
        }
        
    }
    

    return (
        <div className="cnc" style={{color: 'white', display: 'flex', alignItems: 'center'}}>
            {/* <img style={{width: '35px', marginLeft: '50px'}} src={Images[`icon${ TypeLanguage == "TIẾNG VIỆT" ? "VN" : TypeLanguage}`]} alt="" />
            <button className="btn btn-dark dropdown-toggle cus-font" style={{fontSize: '14px !important', background: '#00529c', border: 'none'}}  data-bs-toggle="dropdown" aria-expanded="false">
            {TypeLanguage == "VN" ? "TIẾNG VIỆT" : TypeLanguage}
            </button>
            <ul className="dropdown-menu dropdown-menu-dark" style={{fontSize: '14px'}}>
            <li><span style={{padding: '0px 20px', fontWeight: 600, color: '#00000078'}} className="title-drop" href="#">{titleLN}</span></li>
            <li><hr className="dropdown-divider" /></li>
            {TYPE_LANGUAGE.map(language => <li  key={language}> <a onClick={() => handleLanguage(language)} style={{padding: '0px 10px', display: 'flex', alignItems: 'center'}} className="dropdown-item" href="#"><img style={{width: '25px', height: '20px', marginLeft: '10px'}} src={Images[`icon${language}`]} alt="" />  <span style={{marginLeft: '5px'}}>{language == "VN" ? "TIẾNG VIỆT" : language}</span></a></li>)}
           
            </ul> */}

            <img style={{width: '35px', marginLeft: '25px'}} src={Images[`icon${ TypeLanguage == "TIẾNG VIỆT" ? "VN" : TypeLanguage}`]} alt="" />
                <div className="dropdown" style={{fontSize: "14px", fontFamily:`"Lato", Arial, sans-serif`}}>
                  <button style={{paddingLeft:'5px'}} className="dropbtn d-flex align-items-center none-outline" >
                    <span style={{marginRight:'5px'}}>{TypeLanguage == "VN" ? "TIẾNG VIỆT" : TypeLanguage}</span>
                    <i className='dropdown-toggle'/>
                  </button>
                  <div className="dropdown-content">
                    <div className='title-lange'>{titleLN}</div>
                    <hr className="dropdown-divider add" />
                    {/* <a  style={{display: 'flex', alignItems: 'center'}} className="dropdown-item" href="#"><img style={{width: '25px', height: '20px'}} src={Images.iconVN} alt="" />  <span style={{marginLeft: '5px'}}>TIẾNG VIỆT</span></a>
                    <a style={{display: 'flex', alignItems: 'center'}} className="dropdown-item" href="#"><img style={{width: '25px', height: '20px'}} src={Images.iconENGLISH} alt="" />  <span style={{marginLeft: '5px'}}>ENGLISH</span></a> */}
                    {TYPE_LANGUAGE.map(language => <a key={language} onClick={() => handleLanguage(language)} style={{display: 'flex', alignItems: 'center'}} className="dropdown-item" href="#"><img style={{width: '25px', height: '20px'}} src={Images[`icon${language}`]} alt="" />  <span style={{marginLeft: '5px'}}>{language == "VN" ? "TIẾNG VIỆT" : language}</span></a>)}
                  </div>
                </div>
        </div>
    )
}

export default LanguageLogin