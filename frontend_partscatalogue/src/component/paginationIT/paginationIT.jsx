import React, { useState } from "react";
function PaginationIT(props) {
    const List_Item_Total_Page = [10, 20, 100];
    const [valuePagination, setValuePagination] = useState({ valueTotalInPage: 10, TotalitemPage: Math.ceil(props.Total / 10), currentPage: 1 });
    var arrAutorenderNumberPage = [];
    var listRendernumberPage = [];
    const handSelect = (e) => {
        // ReturnValuePanigation()
        setValuePagination({ ...valuePagination, valueTotalInPage: e.target.value, TotalitemPage: Math.ceil(props.Total / e.target.value), currentPage: 1 })
        
    }

    for (let index = 1; index < valuePagination.TotalitemPage + 1; index++) {
        arrAutorenderNumberPage.push(index)
    }
    const ReturnValuePanigation = () => {
        props.valuePagination({ TotalItemInPage: parseInt(valuePagination.valueTotalInPage), NumberPage: valuePagination.currentPage })
    }
    const noAction = () => { }
    const returnListRendernumberPage = (value) => {
       
        if (11 + value > arrAutorenderNumberPage.length + 1) {
            for (let index = arrAutorenderNumberPage.length - 10; index < arrAutorenderNumberPage.length + 1; index++) {
                listRendernumberPage.push(index)
            }
        }else {
            for (let index = 1 + value; index < 11 + value; index++) {
                listRendernumberPage.push(index)
            }
        }
    }
    if (arrAutorenderNumberPage.length > 10) {
        returnListRendernumberPage(valuePagination.currentPage - 1)
    } else {
        listRendernumberPage = arrAutorenderNumberPage;
    }
    ReturnValuePanigation()
    const firstPa = () => {
        valuePagination.currentPage != 1 ? setValuePagination({ ...valuePagination, currentPage: 1 }) : noAction()
        // ReturnValuePanigation()
    }
    const backPa = () => {
        valuePagination.currentPage > 1 ? setValuePagination({ ...valuePagination, currentPage: valuePagination.currentPage > 1 ? valuePagination.currentPage - 1 : 1 }) : noAction()
        // ReturnValuePanigation()
    }
    const inscreasePa = () => {
        valuePagination.currentPage < arrAutorenderNumberPage.length ? setValuePagination({ ...valuePagination, currentPage: valuePagination.currentPage < arrAutorenderNumberPage.length ? valuePagination.currentPage + 1 : arrAutorenderNumberPage.length }) : noAction()
        // ReturnValuePanigation()
    }
    const lastPa = () => {
        valuePagination.currentPage < arrAutorenderNumberPage.length ? setValuePagination({ ...valuePagination, currentPage: arrAutorenderNumberPage.length }) : noAction()
        // ReturnValuePanigation()
    }
    const selectPa = (item) => {
        valuePagination.currentPage != item ? setValuePagination({ ...valuePagination, currentPage: item }) : noAction()
        // ReturnValuePanigation()
    }
    return (
        <div className='pagination-table'>
            <div className='total-table' >Tổng: <span>{props.Total}</span></div>
            <div className="Total-in-page">
                <div className='total-table' >Số phần tử / trang: <select
                    value={valuePagination.valueTotalInPage}
                    onChange={handSelect}
                    className="select-items-per-page">
                    {
                        List_Item_Total_Page.map(item => <option key={item} value={item}>{item}</option>)
                    }
                </select></div>
                <div className="pagination m-t-20">
                    <a href="#" onClick={() => firstPa()}>«</a>
                    <a href="#" onClick={() => backPa()}>‹</a>
                    {
                        listRendernumberPage.map((item, index) => <a onClick={() => selectPa(item)} className={item == valuePagination.currentPage ? 'selected' : ''} key={item} href="#">{item}</a>)
                    }
                    <a href="#" onClick={() => inscreasePa()}>›</a>
                    <a href="#" onClick={() => lastPa()}>»</a>

                </div>
            </div>
        </div>
    )
}

export default PaginationIT
