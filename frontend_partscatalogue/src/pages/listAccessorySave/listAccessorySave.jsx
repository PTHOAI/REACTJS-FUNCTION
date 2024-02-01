import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PaginationIT from "../../component/paginationIT/paginationIT";
import componentService from "../../services/component.service";
import $ from 'jquery';
import {
  formatDateTime,
  formatISODateToDateString,
  exportToExcel,
} from "../../../src/component/util/util";
import ExcelJS from "exceljs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import UpdateSavePartModal from "../../component/modal/updateSavePartsModal";
const TableTHead = [
  // dữ liệu tiêu đề table
  "STT",
  "Mã linh kiện",
  "Tên linh kiện",
  "Số lượng",
  "Giá",
  "Tên xe",
  "Ngày tạo",
  "Ghi chú",
  "Điều chỉnh",
];

function ListAccessorySave() {
  const [fromtDate, setFromDate] = useState(new Date());
  const [totDate, setToDate] = useState(new Date());
  const [listDelItem, setListDelItem] = useState([]);
  const [valueInput, setValueInput] = useState("");
  const [listData, setListData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [Id, setId] = useState("");
  const [widthAuto, setWidthAuto] = useState(window.innerWidth - 880);

  const handleCheckBox = (e, code) => {
    if (e.target.checked) {
      setListDelItem([...listDelItem, code]);
    } else {
      setListDelItem(listDelItem.filter((item) => item !== code));
    }
  };

  const handleExportToExcel = async () => {
    exportToExcel(
      "Linh kien da luu",
      TableTHead,
      listData,
      `linh_kien_da_luu_${formatISODateToDateString(new Date())}.xlsx`
    );
  };

  const fetchData = async () => {
    const resuft = await componentService.getALLSaveParts(
      currentPage,
      itemsPerPage
    );
    if (resuft) {
      setListData(resuft.list);
      setTotalItems(resuft.totalItems);
    }
  };
  const handleEditClick = (id) => {
    // Hiển thị AddCarModal trong chế độ sửa
    setIsEditMode(true);
    setIsClicked(true);
    setId(id);
  };
  $(window).resize(() => {
    if (widthAuto != (window.innerWidth - 880)) {
      setWidthAuto(window.innerWidth - 880)
    }
  });

  useEffect(() => {
    fetchData();
  }, [currentPage, itemsPerPage]);

  const handlefilterTable = (e) => {
    setValueInput(e.target.value);
  };

  const handleSubmit = () => {
    fetchData();
  };

  const getValuePagination = (value) => {
    if (
      currentPage !== value.NumberPage ||
      itemsPerPage !== value.TotalItemInPage
    ) {
      setItemsPerPage(Number(value.TotalItemInPage));
      setCurrentPage(value.NumberPage);
    }
  };
  const handleSearchPart = async () => {
    const resuft = await componentService.getSearchALLSaveParts(
      valueInput,
      fromtDate,
      totDate,
      currentPage,
      itemsPerPage
    );
    if (resuft?.list) {
      setListData(resuft?.list);
    }
  };

  return (
    <div>
      <div
        style={{
          marginTop: "75px",
          minHeight: window.innerHeight - 188 + "px",
        }}>
        <div style={{ padding: "20px" }}>
          <div className="title-page">Danh mục linh kiện đã chọn</div>
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
                      style={{ minWidth: "200px" }}>
                      <input
                        value={valueInput}
                        onChange={(e) => handlefilterTable(e)}
                        className="input-search-table"
                        placeholder="Nhập để tìm kiếm linh kiện"
                        type="text"
                      />
                      <FontAwesomeIcon
                        onClick={handleSearchPart}
                        icon={faSearch}
                        className="search-icon absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                      />
                    </div>
                  </div>
                  <div
                    className="wrap-dateTime"
                    style={{ marginRight: "20px" }}>
                    <span className="title-date-time">Từ Ngày:</span>
                    <DatePicker
                      className="input-dateTime"
                      selected={fromtDate}
                      onChange={(date) => setFromDate(date)}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      dateFormat="dd-MM-yyyy HH:mm"
                    />
                    <i className="bi bi-calendar3 icon-from-dateTime"></i>
                  </div>
                  <div className="wrap-dateTime">
                    <span className="title-date-time">Đến ngày:</span>
                    <DatePicker
                      className="input-dateTime"
                      selected={totDate}
                      onChange={(date) => setToDate(date)}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      dateFormat="dd-MM-yyyy HH:mm"
                    />
                    <i className="bi bi-calendar3 icon-to-dateTime"></i>
                  </div>
                </div>
              </div>
              <div className="Action-table">
                {listDelItem.length > 0 && (
                  <button
                    className="btn-action-table-del"
                    style={{ marginRight: "5px" }}>
                    <i className="bi bi-trash-fill icon-btn-table"></i>
                    <span>Xóa linh kiện lưu trữ</span>
                  </button>
                )}
                <button
                  className="btn-action-table"
                  onClick={handleExportToExcel}>
                  <i className="bi bi-download icon-btn-table"></i>
                  <span>Xuất Excel</span>
                </button>
              </div>
            </div>
            {/* <div
              className="row justify-content-center"
              style={{ marginBottom: "20px" }}>
              <div className="col-12">
                <div className="card">
                  <div className="card-body p-0">
                    <div
                      className="table-responsive table-scroll scroll-cus"
                      data-mdb-perfect-scrollbar="true"
                      style={{
                        position: "relative",
                        maxHeight: window.innerHeight - 420 + "px",
                      }}>
                      <table className="table mb-0">
                        <thead style={{ backgroundColor: "#002d72" }}>
                          <tr>
                            {TableTHead.map((item, index) => (
                              <th
                                style={{
                                  width: item.with ? item.with : "auto",
                                  textAlign: index === 0 ? "center" : "left",
                                }}
                                key={index}>
                                {item}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {listData?.length > 0 ? (
                            listData?.map((item, index) => (
                              <tr key={index}>
                                <td style={{ textAlign: "center" }}>
                                  {index + 1}
                                </td>
                                <td>{item?.COM?.COM_CODE}</td>
                                <td>{item?.COM?.COM_NAME_VN}</td>
                                <td>{item?.QUANTITY}</td>
                                <td>{item?.PAG_NAME_VN}</td>
                                <td>{item?.vehicle?.Vehicle?.VEH_NAME}</td>
                                <td>{formatDateTime(item?.CREATED_DATE)}</td>
                                <td>{item?.NOTE}</td>
                                <td>
                                  <div className="wrap-action-item">
                                    <button
                                      onClick={() => handleEditClick(item?.ID)}
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
                                      <input
                                        onChange={(e) =>
                                          handleCheckBox(e, item.ID)
                                        }
                                        checked={listDelItem.includes(item.ID)}
                                        type="checkbox"
                                      />
                                      <span className="checkmark" />
                                    </label>
                                  </div>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="8" style={{ textAlign: "center" }}>
                                Không tìm thấy kết quả cần tìm
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}


            <div className="row justify-content-center" style={{ marginBottom: '20px' }}>
              <div className="col-12">
                <div className="card">
                  <div className="table-title-save" style={{ paddingRight: listData.length * 44 > window.innerHeight - 425 ? '17px' : '7px' }}>
                    <div style={{ width: '50px', textAlign: 'center' }} className="item-list">STT</div>
                    <div style={{ width: '150px' }} className="item-list">Mã linh kiện</div>
                    <div style={{ width: '200px' }} className="item-list">Tên linh kiện</div>
                    <div style={{ width: '70px' }} className="item-list">Số lượng</div>
                    <div style={{ width: '200px' }} className="item-list">Giá</div>
                    <div style={{ width: '200px' }} className="item-list">Tên xe</div>
                    <div style={{ width: '100px' }} className="item-list">Ngày tạo</div>
                    <div style={{ width: `${widthAuto}px` }} className="item-list">Ghi chú</div>
                    <div className="item-list" style={{ width: '100px' }}>Điều chỉnh</div>
                  </div>
                  <div className="wrap-body-item-save scroll-cus" style={{ maxHeight: window.innerHeight - 425 + 'px', overflow: 'auto' }}>
                    {
                      listData.length > 0 ? (
                        listData.map((item, index) => (
                          <div key={index} className="table-item-save">
                            <div style={{ width: '50px', textAlign: 'center' }} className="item-list">{index + 1}</div>
                            <div style={{ width: '150px' }} className="item-list">{item?.COM?.COM_CODE}</div>
                            <div style={{ width: '200px' }} className="item-list">{item?.COM?.COM_NAME_VN}</div>
                            <div style={{ width: '70px' }} className="item-list">{item?.QUANTITY}</div>
                            <div style={{ width: '200px' }} className="item-list">{item?.PAG_NAME_VN}</div>
                            <div style={{ width: '200px' }} className="item-list">{item?.vehicle?.Vehicle?.VEH_NAME}</div>
                            <div style={{ width: '100px' }} className="item-list">{formatDateTime(item?.CREATED_DATE)}</div>
                            <div style={{ width: `${widthAuto}px` }} className="item-list">{item?.NOTE}</div>
                            <div className="item-list" style={{ width: '100px' }}>
                              <div className="wrap-action-item">
                                <button
                                  onClick={() => handleEditClick(item?.ID)}
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
                                  <input
                                    onChange={(e) =>
                                      handleCheckBox(e, item.ID)
                                    }
                                    checked={listDelItem.includes(item.ID)}
                                    type="checkbox"
                                  />
                                  <span className="checkmark" />
                                </label>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (<div className="table-item-save"><div style={{ width: '100%', textAlign: 'center' }} className="item-list">Không tìm thấy dữ liệu</div></div>)

                    }
                  </div>
                </div>
              </div>
            </div>
            {/* phân trang */}
            <PaginationIT
              valuePagination={(value) => getValuePagination(value)}
              Total={totalItems}></PaginationIT>
          </div>
        </div>
      </div>
      <UpdateSavePartModal
        isOpen={isClicked}
        onSubmit={handleSubmit}
        onClose={() => setIsClicked(false)}
        isEditMode={isEditMode}
        Id={Id}
      />
    </div>
  );
}

export default ListAccessorySave;
