import React, { useEffect, useState } from "react";
import PaginationIT from "../../component/paginationIT/paginationIT";
const TableTHead = [
    // dữ liệu tiêu đề table
    { name: "STT", with: "50px" },
    { name: "Mã xe", with: "150px" },
    { name: "Tên xe", with: "250px" },
    { name: "Tên File", with: "200px" },
    { name: "Ngày upload", with: "150px" },
    { name: "Ghi chú" },
    { name: "Điều chỉnh", with: "100px" },
];
const DataTest = [
    // dữ liệu test
    { CODE: '384X00004K1', PAG_NAME: 'TB120S-47L', PAG_NAME_FILE: '4X00004K1.pdf', CREATE_DATE: '23/01/2023', PAG_NOTE: '-' },
    { CODE: '384Z0000591', PAG_NAME: 'TB120S-47S', PAG_NAME_FILE: '4Z0000591.pdf', CREATE_DATE: '23/01/2023', PAG_NOTE: '-' },
    { CODE: '385A00003V1', PAG_NAME: 'TB120S-47K', PAG_NAME_FILE: '5A00003V1.pdf', CREATE_DATE: '23/01/2023', PAG_NOTE: '-' },
    { CODE: '385A00004N1', PAG_NAME: 'TB120S-47L', PAG_NAME_FILE: '5A00004N1.pdf', CREATE_DATE: '23/01/2023', PAG_NOTE: '-' },
    { CODE: '385A00004V1', PAG_NAME: 'TB120S-47Z', PAG_NAME_FILE: '5A00004V1.pdf', CREATE_DATE: '23/01/2023', PAG_NOTE: '-' },

]
function PDFOfCar(props) {
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
                <div className="title-page">Danh sách file PDF theo xe</div>
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
                                    <span>Xóa file</span>
                                </button>
                            )}
                            <button className="btn-action-table" style={{ marginRight: "5px" }}>
                                <i className="bi bi-upload icon-btn-table"></i>
                                <span>Upload PDF</span>
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
                                                            <td>{item.PAG_NAME_FILE}</td>
                                                            <td>{item.CREATE_DATE}</td>
                                                            <td>{item.PAG_NOTE}</td>
                                                            <td>
                                                                <div className='wrap-action-item'>
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

export default PDFOfCar;