import React from 'react';
import {mapObject} from "../../assets/methods/mapObject"
import {LANGUAGES} from "../../assets/language/defineLanguage"
function FooterLogin (props) {
    var language =  props.language
    var translatePage = {}
    mapObject(LANGUAGES, (type, value)=> {
        if(type == language) {
            translatePage = value.LOGIN
        }
    })
    // console.log("abc:", language)
    // console.log("okha:", translatePage)
    return (
        <div id="footer" style={{position: 'fixed', bottom: '0px', width: '100%', background: '#00529c'}}>
            <div className="wrap-footer" style={{display: 'flex', color: 'white', marginTop: '15px', padding: '10px 20px'}}>
            <div style={{flex: '50%', display: 'flex', alignItems: 'center'}} className="GT">
                <span>{translatePage.footer.about}</span>
            </div>
            <div style={{flex: '50%', justifyContent: 'flex-end', display: 'flex', alignItems: 'center'}} className="Conect">
                <div className="wrap-conect">
                <div className="address">
                    <i className="bi bi-geo-alt-fill"  style={{marginRight: "5px"}}/>
                    <span>{translatePage.footer.contact.address}</span>
                </div>
                <div className="phone" style={{marginTop: '10px'}}>
                    <i className="bi bi-telephone-fill" style={{marginRight: "5px"}} />
                    <span>{translatePage.footer.contact.phone}</span>
                </div>
                </div>
            </div>
            </div>
            <div style={{background: 'black', color: '#6c757d', textAlign: 'center', padding: '10px'}} className="BQ">{translatePage.footer.copyRight}</div>
        </div>
    )
}

export default FooterLogin