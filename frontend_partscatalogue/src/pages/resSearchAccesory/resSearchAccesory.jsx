import React, { useState } from "react";
const TableTHead = [
    // dữ liệu tiêu đề table
    { name: "STT", with: '50px' },
    { name: "Mã linh kiện" },
    { name: "Tên linh kiện" },
    { name: "Tên xe" },
]
const TableTHead2 = [
    // dữ liệu tiêu đề table
    { name: "STT", with: '50px' },
    { name: "Tên xe" },
    { name: "Mã số cụm linh kiện" },
    { name: "Tên cụm" },
    { name: "Mã số NCC" },
]

const DataTest = [
    // dữ liệu test
    { code: '4E00002O1', name: 'BỘ GẠT MƯA', brand: 'TB120S-47D, TB120S-47L, BT2116', },
]
const DATA_TEST2 = [
    // dữ liệu test
    { code: 'TB120S-47L', name: '4E00002O1', brand: 'BỘ GẠT MƯA', note: 'dữ liệu demo' },
    { code: 'BT2116', name: '4E00002O1', brand: 'BỘ GẠT MƯA', note: 'dữ liệu demo' },
    { code: 'TB120S-47D', name: '4E00002O1', brand: 'BỘ GẠT MƯA', note: 'dữ liệu demo' },
]
function ResSearchAccesory() {
    const [ValueInput, setValueInput] = useState('');
    const handlefilterTable = (e) => {
        setValueInput(e.target.value)
    }
    return (
        <div style={{ marginTop: "75px", minHeight: window.innerHeight - 188 + 'px' }}>
            <div style={{ padding: '20px' }}>
                <div className="title-page">Tìm kiếm linh kiện theo xe</div>
                <div className="wrap-table">
                    <div className="wrap-Action-Table">
                    <div className='fillter-table'>
                        <div style={{ display: 'flex' }}>
                            <div style={{ display: 'flex', marginRight: '20px', alignItems: 'center' }}>
                                <span className="title-date-time">Tìm kiếm: </span>
                                <div className="wrap-search-item-table-parts" style={{ minWidth: '350px' }}>
                                    <input value={ValueInput} onChange={(e) => handlefilterTable(e)} className="input-search-table" placeholder="Nhập để tìm kiếm linh kiện" type="text" />
                                    <i  className="bi bi-search icon-search-input-mm"></i>
                                </div>

                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="row justify-content-center" style={{ marginBottom: '20px' }}>
                    <div className="col-6">
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
                                                        <td>{item.code}</td>
                                                        <td>{item.name}</td>
                                                        <td>{item.brand}</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="card">
                            <div className="card-body p-0">
                                <div className="table-responsive table-scroll scroll-cus" data-mdb-perfect-scrollbar="true" style={{ position: 'relative', maxHeight: window.innerHeight - 380 + 'px' }}>
                                    <table className="table mb-0">
                                        <thead style={{ backgroundColor: '#002d72' }}>
                                            <tr>
                                                {
                                                    TableTHead2.map((item, index) => <th style={{ width: item.with ? item.with : 'auto', textAlign: index === 0 ? 'center' : 'left' }} key={index}>{item.name}</th>)
                                                }
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                DATA_TEST2.map((item, index) => (
                                                    <tr key={index}>
                                                        <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                                        <td>{item.code}</td>
                                                        <td>{item.name}</td>
                                                        <td>{item.brand}</td>
                                                        <td>{item.note}</td>
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
                </div>
            </div>
        </div>
    );
}

export default ResSearchAccesory;
