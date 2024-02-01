import React, { useState } from "react";
import $ from 'jquery';
let VALUE_SELECT = {};
let SETVALUESELECT = (id, idselect, value) => {
    $(`#${id}`).val(value.name);
    VALUE_SELECT[idselect] = { name: value.name, code: value.code }
}
function SelectOptionSingle(props) {
    let valueRender = props.valueSelect;
    let getID = props.id;
    let getIDInput = props.idSetValue
    const [valueInput, setValueInput] = useState({ ValChange: '', ValInput: '', Code: '' });
    const dataRender = valueRender.filter(item => item.name.toUpperCase().includes(valueInput.ValChange.toUpperCase()))
    VALUE_SELECT[getID] = { name: valueInput.ValInput, code: valueInput.Code }
    const abc = (id) => {
        $(`#${id}`).show();
    }
    const abcd = (a, id, code) => {
        $(`#${id}`).hide();
        if (a != valueInput.ValInput) {
            setValueInput({ ...valueInput, ValInput: a, Code: code });
        }
        if (props.onChange) {
            setTimeout(() => {
                props.onChange()
            }, 200)
        }
    }
    const ec = (e, id) => {
        let code = '';
        if (e.target.value != valueInput.ValInput || e.target.value != valueInput.ValChange) {
            if (e.target.value == "") {
                code = ''
            }
            setValueInput({ ...valueInput, ValInput: e.target.value, ValChange: e.target.value, Code: code })
        }

    }
    const def = (id) => {
        setTimeout(() => {
            $(`#${id}`).hide();
        }, 200)
    }

    return (
        <div className="wrap-dropdown">
            <input id={getIDInput} onBlur={() => def(getID)} onFocus={() => abc(getID)} onChange={e => ec(e, getID)} value={valueInput.ValInput} className="input-select" type="text" placeholder="Chọn...." />
            <ul id={getID} className="item-select-option scroll-cus">
                {
                    dataRender.map((item, index) => <li className={item.name === valueInput.ValInput ? "sl-active" : ""} onClick={() => abcd(item.name, getID, item.code)} style={{ display: "flex", justifyContent: 'space-between' }} key={item.code}><span>{item.name}</span> <span>{item.code}</span></li>)
                }
            </ul>
        </div>
    )
}


export { VALUE_SELECT, SETVALUESELECT };
export default SelectOptionSingle
