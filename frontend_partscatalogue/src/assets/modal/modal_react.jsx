import React, { useEffect, useState } from "react";
function ModalReact (props) {
   
    const [showmodal, setShowmodal] = useState(props.showModal);
    var isShow = props.showModal === showmodal ? false : true
    var widthMadal = props.width || '800px';
    return (
        <>
            <div style={{display: isShow ? 'block' :'none'}} className='wrap-modal-react'>
                <div className="modal-react">
                    <div style={{width: widthMadal}} className="box-modal-react">
                        <div className="modal-react-header">
                            <span className="modal-react-header-content">{props.titleModal}</span>
                            <i onClick={()=> setShowmodal(!showmodal)} style={{cursor:'pointer'}} className="bi bi-x-lg modal-react-header-content"></i>
                        </div>
                        <div className="modal-react-content">
                            {props.children || ''}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalReact;
