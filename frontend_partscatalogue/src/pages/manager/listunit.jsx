import React, { useEffect, useState } from "react";
import PaginationIT from "../../component/paginationIT/paginationIT";
const TableTHead = [
    // dữ liệu tiêu đề table
    { name: "STT", with: "50px" },
    { name: "Mã đơn vị", with: "300px" },
    { name: "Tên đơn vị", with: "300px" },
    { name: "Ngày tạo", with: "200px" },
    { name: "Ghi chú" },
    { name: "Điều chỉnh", with: "100px" },
];
const DataTest = [
    // dữ liệu test
    { CODE: 'CUM', PAG_NAME: 'CỤM', CREATE_DATE: '23/01/2023', PAG_NOTE: '-' },
    { CODE: 'CAI', PAG_NAME: 'CÁI', CREATE_DATE: '23/01/2023', PAG_NOTE: '-' },
    { CODE: 'CHI', PAG_NAME: 'CHI TIẾT', CREATE_DATE: '23/01/2023', PAG_NOTE: '-' }

]
function Listunit(props) {
    const [listDelItem, setListDelItem] = useState([]);

    const handleCheckBox = (e, code) => {
        if (e.target.checked) {
            setListDelItem([...listDelItem, code]);
        } else {
            setListDelItem(listDelItem.filter((item) => item !== code));
        }
    };
    const getValuePagination = (value) => {
        console.log("value", value)
    }
    return (
        <div>
            <div
                style={{
                    padding: "20px",
                    marginTop: "75px",
                    minHeight: window.innerHeight - 188 + "px",
                }}>
                <div className="title-page">Danh sách đơn vị tính</div>
                <div className="wrap-table">
                    <div className="wrap-Action-Table">
                        <div className="fillter-table">
                            <div style={{ display: "flex" }}>
                                <div
                                    style={{
                                        display: "flex",
                                        marginRight: "20px",
                                        alignItems: "center",
                                    }}>
                                    <span className="title-date-time">Tìm kiếm: </span>
                                    <div
                                        className="wrap-search-item-table-parts"
                                        style={{ minWidth: "350px" }}>
                                        <input
                                            className="input-search-table"
                                            placeholder="Nhập để tìm kiếm nhanh"
                                            type="text"
                                        />
                                        <i
                                            className="bi bi-search icon-search-input-mm"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="Action-table">
                            {listDelItem.length > 0 && (
                                <button
                                    className="btn-action-table-del"
                                    style={{ marginRight: "5px" }}>
                                    <i className="bi bi-trash-fill icon-btn-table"></i>
                                    <span>Xóa đơn vị tính</span>
                                </button>
                            )}
                            <button className="btn-action-table">
                                <i className="bi bi-plus-lg icon-btn-table"></i>
                                <span>Thêm mới</span>
                            </button>
                        </div>
                    </div>
                    <div className="row justify-content-center" style={{ marginBottom: '20px' }}>
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body p-0">
                                    <div className="table-responsive table-scroll scroll-cus" data-mdb-perfect-scrollbar="true" style={{ position: 'relative', maxHeight: window.innerHeight - 380 + 'px' }}>
                                        <table className="table mb-0">
                                            <thead style={{ backgroundColor: '#002d72' }}>
                                                <tr>
                                                    {
                                                        TableTHead.map((item, index) => <th style={{ width: item.with ? item.with : 'auto', textAlign: index === 0 ? 'center' : 'left' }} key={index}>{item.name}</th>)
                                                    }
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    DataTest.map((item, index) => (
                                                        <tr key={index}>
                                                            <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                                            <td>{item.CODE}</td>
                                                            <td>{item.PAG_NAME}</td>
                                                            <td>{item.CREATE_DATE}</td>
                                                            <td>{item.PAG_NOTE}</td>
                                                            <td>
                                                                <div className='wrap-action-item'>
                                                                    <button
                                                                        style={{ marginRight: "8px" }}
                                                                        className=" btn-item-action-table tooltip-action-table">
                                                                        <i className="bi bi-pencil-square "></i>
                                                                        <span
                                                                            className="text-tooltip-action-table"
                                                                            style={{ width: "93px" }}>
                                                                            Chỉnh sửa
                                                                        </span>
                                                                    </button>
                                                                    <label className="container tooltip-action-table">
                                                                        <input onChange={(e) => handleCheckBox(e, item.CODE)} type="checkbox" />
                                                                        <span className="checkmark" />
                                                                    </label>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <PaginationIT valuePagination={(value) => getValuePagination(value)} Total={5} ></PaginationIT>
                </div>
            </div>
        </div>
    );
}

export default Listunit;