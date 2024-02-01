import React, { useEffect, useState } from "react";
import VehicleService from "../../services/vehicle.service";
import { DataTable } from "./APIvehecleParts";
import AddCarPartModal from "../../component/modal/addcarPartModal";
import PaginationIT from "../../component/paginationIT/paginationIT";

function SysVehiclePart(props) {
  const [isAddPartModalOpen, setAddPartModalOpen] = useState(false);
  const [listDelItem, setListDelItem] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [dataFilter, setDataFilter] = useState([]);
  const [searchPart, setSearchPart] = useState("");
  const getValuePagination = (value) => {
    console.log("value", value)
}
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await VehicleService.fetchGetListVehicleParts(
          currentPage,
          itemsPerPage
        );
        if (result) {
          setDataFilter(result);
          setTotalItems(result?.length);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [currentPage, itemsPerPage]);

  const handleChangeItemsPerPage = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to the first page when changing items per page
  };

  // const handleAddPart = (newPart) => {
  // };

  const handleCheckBox = (e, code) => {
    setListDelItem((prevSelectedValues) => {
      if (prevSelectedValues.includes(code)) {
        return prevSelectedValues.filter((value) => value !== code);
      } else {
        return [...prevSelectedValues, code];
      }
    });
  };

  return (
    <div style={{ marginTop: "75px", minHeight: window.innerHeight - 188 + 'px' }}>
      <div style={{ padding: '20px' }}>
        <div className="title-page">Danh sách bộ phận xe</div>

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
                      value={searchPart}
                      onChange={(e) => { setSearchPart(e.target.value) }}
                      className="input-search-table"
                      placeholder="Nhập để tìm kiếm bộ phận xe"
                      type="text"
                    />
                    {searchPart !== "" ? (
                      <i
                        onClick={() => setSearchPart("")}
                        className="bi bi-x icon-clear-input"></i>
                    ) : (
                      ""
                    )}
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
                  <span>Xóa Bộ phận xe</span>
                </button>
              )}
              <button className="btn-action-table" onClick={() => setAddPartModalOpen(true)}>
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
                          {DataTable.header.map((item, index) =>
                            index === 0 ? (
                              <th
                                style={{ textAlign: "center", width: "50px" }}
                                key={index}>
                                {item}
                              </th>
                            ) : index === DataTable.header.length - 1 ? (
                              <th style={{ width: "100px" }} key={index}>
                                {item}
                              </th>
                            ) : (
                              <th key={index}>{item}</th>
                            )
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {dataFilter?.length > 0 ? (
                          dataFilter?.filter((item) => {
                            return searchPart.toLowerCase() === ""
                              ? item
                              : item?.PART_NAME_VN?.toLowerCase().includes(
                                searchPart.toLowerCase()
                              ) ||
                              item?.PART_NAME_EN?.toLowerCase().includes(
                                searchPart.toLowerCase()
                              );
                          }).map((item, index) => (
                            <tr key={index}>
                              <td style={{ textAlign: "center" }}>{index + 1}</td>
                              <td>{item?.vehicle?.VEH_NAME}</td>
                              <td>{item.PART_NAME_VN}</td>
                              <td>{item.PART_NAME_EN}</td>
                              <td>{item.DATE}</td>
                              <td>{item.NOTE}</td>
                              <td>
                                <div className="wrap-action-item">
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
                                    <input
                                      onChange={(e) => handleCheckBox(e, item?.ID)}
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
          </div>
          
          {/* <div className="pagination-table">
            <div className="items-per-page">
              <span>Số lượng bản ghi trên mỗi trang: </span>
              <select
                value={itemsPerPage}
                onChange={handleChangeItemsPerPage}
                className="select-items-per-page">
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={100}>100</option>
              </select>
            </div>
            <div className="pagination m-t-20 ">
              <a onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
                «
              </a>
              <a>{currentPage}</a>
              <a
                onClick={() =>
                  setCurrentPage(currentPage + Math.ceil(totalItems / itemsPerPage))
                }>
                »
              </a>
            </div>
          </div> */}
          {/* bổ xung API tổng phần tử cho trang */}
        <PaginationIT valuePagination={(value) => getValuePagination(value)} Total={100} ></PaginationIT>
        </div>
      </div>
     
        <AddCarPartModal
          isOpen={isAddPartModalOpen}
          onClose={() => setAddPartModalOpen(false)}
        // onSubmit={handleAddPart}
        />
    </div>
  );
}
export default SysVehiclePart;
