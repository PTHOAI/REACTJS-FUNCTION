import React, { useEffect, useState } from "react";
import VehicleService from "../../services/vehicle.service";
import AddUnitCarModal from "../../component/modal/addUnitCarModal"
import { toast } from "react-toastify";
import vehicleService from "../../services/vehicle.service";
import { formatISODateToDateString } from "../../../src/component/util/util";
import DeleteConfirmationModal from "../../component/modal/deleteConfirmationModal";
const TableTHead = [
  // dữ liệu tiêu đề table
  { name: "STT", with: "50px" },
  { name: "Mã đơn vị", with: "200px" },
  { name: "Tên đơn vị" },
  { name: "Ngày Tạo" },
  { name: "Điều chỉnh", with: "100px" },
];
function Unitvehicle(props) {
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
      const result = await VehicleService.fetchListUnitCar();
      if (result) {
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
      fetchData();
      toast.success("LƯU ĐƠN VỊ XE THÀNH CÔNG", {
        theme: "colored",
      });
    } catch (error) {
      console.error(error);
    }
  };


  const handleCheckBox = (e, code) => {
    setListDelItem((prevSelectedValues) => {
      if (prevSelectedValues.includes(code)) {
        return prevSelectedValues.filter((value) => value !== code);
      } else {
        return [...prevSelectedValues, code];
      }
    });
  };

  const handleDelete = async () => {
    setIsDeleteConfirmationOpen(true);
  };

  // XÁC NHẬN XÓA MODAL
  const handleDeleteConfirmation = async () => {
    try {
      const data = { unitCarIds: listDelItem };
      const listDelete = await vehicleService.deleteUnitVehicle(data);
      if (listDelete) {
        toast.success("XÓA THÀNH CÔNG", {
          theme: "colored",
        });
        setDataFilter(prevList => prevList.filter(item => !listDelItem.includes(item.ID)));
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
        <div className="title-page">Danh sách đơn vị xe</div>

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
                      placeholder="Nhập để tìm đơn vị xe"
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
                  <span>Xóa đơn vị</span>
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
                              : item?.CODE?.toLowerCase().includes(
                                searchPart.toLowerCase()
                              ) ||
                              item?.NAME_VN?.toLowerCase().includes(
                                searchPart.toLowerCase()
                              );
                          }).map((item, index) => (
                            <tr key={index}>
                              <td style={{ textAlign: "center" }}>{index + 1}</td>
                              <td>{item?.CODE}</td>
                              <td>{item?.NAME_VN}</td>
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
        </div>
      </div>
      <AddUnitCarModal
        isOpen={isAddPartModalOpen}
        onClose={() => setAddPartModalOpen(false)}
        onSubmit={handleAddUnitCar}
        vehId={vehId}
        isEditMode={isEditMode}
      />
    </div>
  );
}
export default Unitvehicle;
