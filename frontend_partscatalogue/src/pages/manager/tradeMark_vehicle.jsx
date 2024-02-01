import React, { useEffect, useState } from "react";
import VehicleService from "../../services/vehicle.service";
import { DataTable } from "./APIvehecleParts";
import AddTradeMarkModal from "../../component/modal/addTradeMarkModal"
import { toast } from "react-toastify";
import vehicleService from "../../services/vehicle.service";
import { formatISODateToDateString } from "../../../src/component/util/util";
import DeleteConfirmationModal from "../../component/modal/deleteConfirmationModal";
import $ from 'jquery';

const TableTHead = [
  // dữ liệu tiêu đề table
  { name: "STT", with: "50px" },
  { name: "Mã thương hiệu", with: "200px" },
  { name: "Tên thương hiệu", with: "200px" },
  { name: "Logo", with: "150px" },
  { name: "Đơn vị xe" },
  { name: "Ngày Tạo" },
  { name: "Điều chỉnh", with: "100px" },
];

function TradeMarkvehicle(props) {
  const [isAddPartModalOpen, setAddPartModalOpen] = useState(false);
  const [listDelItem, setListDelItem] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [dataFilter, setDataFilter] = useState([]);
  const [searchPart, setSearchPart] = useState("");
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [vehId, setVehId] = useState("");

  const fetchData = async () => {
    try {
      const result = await VehicleService.fetchListTradeMark();
      if (result) {
        console.log("re", result);
        setDataFilter(result);
        setTotalItems(result?.length);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleAddUnitCar = async () => {
    try {
      fetchData(); // Fetch data again after adding a new unit car
      toast.success("LƯU THÀNH CÔNG", {
        theme: "colored",
      });
    } catch (error) {
      console.error(error);
    }
  };


  const handleCheckBox = (e, code) => {
    if (e.target.checked) {
      setListDelItem([...listDelItem, code])
    } else {
      setListDelItem(listDelItem.filter(item => item !== code))
    }
  };

  console.log('listDelItem:', listDelItem)

  const handleDelete = async () => {
    setIsDeleteConfirmationOpen(true);
  };

  // XÁC NHẬN XÓA MODAL
  const handleDeleteConfirmation = async () => {
    try {
      const data = { tradeMarkCarIds: listDelItem };
      const listDelete = await vehicleService.deleteTradeMarkVehicle(data);
      let ResdelItem = listDelItem;
      if (listDelete) {
        $(":checked").prop('checked', false);
        data.tradeMarkCarIds.map(code => {
          ResdelItem = ResdelItem.filter(item => item !== code)
        })
        toast.success("XÓA THÀNH CÔNG", {
          theme: "colored",
        });
        setListDelItem(ResdelItem)
        
        setDataFilter(prevList => prevList.filter(item => !listDelItem.includes(item.VEM_ID)));
      }
    } catch (error) {
      console.log("err", error);
    }

    setIsDeleteConfirmationOpen(false);
  };

  // HỦY XÓA MODAL
  const handleCancelDelete = () => {
    setIsDeleteConfirmationOpen(false);
  };

  const handleEdit = (id) => {
    setIsEditMode(true)
    setAddPartModalOpen(true)
    setVehId(id)
  }

  const handleAddUnitCarClick = () => {
    setAddPartModalOpen(true)
    setIsEditMode(false)
  }

  return (
    <div style={{ marginTop: "75px", minHeight: window.innerHeight - 188 + 'px' }}>
      <div style={{ padding: '20px' }}>
        <div className="title-page">Danh sách thương hiệu xe</div>
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
                      placeholder="Nhập để tìm thương hiệu xe"
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
                  onClick={handleDelete}
                  className="btn-action-table-del"
                  style={{ marginRight: "5px" }}>
                  <i className="bi bi-trash-fill icon-btn-table"></i>
                  <span>Xóa thương hiệu xe</span>
                </button>
              )}
              <DeleteConfirmationModal
                isOpen={isDeleteConfirmationOpen}
                onClose={handleCancelDelete}
                onConfirm={handleDeleteConfirmation}
              />
              <button className="btn-action-table" onClick={handleAddUnitCarClick}>
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
                        {dataFilter?.length > 0 ? (
                          dataFilter?.filter((item) => {
                            return searchPart.toLowerCase() === ""
                              ? item
                              : item?.VEM_CODE?.toLowerCase().includes(
                                searchPart.toLowerCase()
                              ) ||
                              item?.VEM_NAME?.toLowerCase().includes(
                                searchPart.toLowerCase()
                              );
                          }).map((item, index) => (
                            <tr key={index}>
                              <td style={{ textAlign: "center" }}>{index + 1}</td>
                              <td>{item?.VEM_CODE}</td>
                              <td>{item?.VEM_NAME}</td>
                              <td>
                              <div className="wrap-image-item-table" style={{borderRadius:'7px', border:'1px solid #000000ab'}}>
                                <img
                                  className="image-item-table"
                                  src={'https://thacobus.vn/storage/bus/icon/logo-thuong-hieu/logo-menu-thacobus-3.png'}
                                  alt=""
                                />
                              </div>
                            </td>
                              <td>{item?.Departments?.NAME_VN}</td>
                              <td> {item.CREATE_DATE
                                ? formatISODateToDateString(item?.CREATE_DATE)
                                : ""}</td>
                              <td>
                                <div className="wrap-action-item">
                                  <button
                                    onClick={() => { handleEdit(item?.ID) }}
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
                                      onChange={(e) => handleCheckBox(e, item?.VEM_ID)}
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
        </div>
      </div>
      <AddTradeMarkModal
        isOpen={isAddPartModalOpen}
        onClose={() => setAddPartModalOpen(false)}
        onSubmit={handleAddUnitCar}
        vehId={vehId}
        isEditMode={isEditMode}
      />
    </div>
  );
}
export default TradeMarkvehicle;
