import React, { useEffect, useState } from "react";
import { formatISODateToDateString } from "../../../src/component/util/util";
import VehicleService from "../../services/vehicle.service";
import AddCarModal from "../../component/modal/addcarModal";
import * as XLSX from "xlsx";
import axios from "axios";
import DeleteConfirmationModal from "../../component/modal/deleteConfirmationModal";
import vehicleService from "../../services/vehicle.service";
import { toast } from "react-toastify";
import PaginationIT from "../../component/paginationIT/paginationIT";
const TableTHead = [
  // dữ liệu tiêu đề table
  { name: "STT", with: "50px" },
  { name: "Mã xe", with: "70px" },
  { name: "Tên xe", with: "300px" },
  { name: "Hình ảnh", with: "100px" },
  { name: "Đơn vị", with: "150px" },
  { name: "Thương hiệu", with: "150px" },
  { name: "Phân khúc", with: "150px" },
  { name: "HDSD", with: "100px" },
  { name: "BDSC", with: "100px" },
  { name: "Kích hoạt", with: "100px" },
  { name: "Ngày tạo", with: "100px" },
  { name: "Ghi chú" },
  { name: "Điều chỉnh", with: "100px" },
];

const SysVehicle = () => {
  const [isChecked, setChecked] = useState(false);
  const [listcar, setListCar] = useState([]);
  const [isClickedAddCar, setIsClickedAddCar] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [vehId, setVehId] = useState("");
  const [ValueInput, setValueInput] = useState("");
  const [listDelItem, setListDelItem] = useState([]);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);

  const handlefilterTable = (e) => {
    setValueInput(e.target.value);
  };

  const handleCheckBox = (e, code) => {
    if (e.target.checked) {
      setListDelItem([...listDelItem, code]);
    } else {
      setListDelItem(listDelItem.filter((item) => item !== code));
    }
  };

  useEffect(() => {
    VehicleService.fetchlistCar()
      .then((res) => {
        if (res) {
          setListCar(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDownloadPDF = async (pdf) => {
    try {
      const url = VehicleService.API_BASE_URL + `/img/pdf/${pdf}`;
      const response = await axios.get(url, { responseType: "blob" });
      const blob = new Blob([response.data], { type: "application/pdf" });
      const blobURL = window.URL.createObjectURL(blob);
      // Tạo một thẻ <a> để kích thích sự kiện tải xuống
      const aTag = document.createElement("a");
      aTag.href = blobURL;
      aTag.download = pdf; // Tên tệp khi tải xuống
      document.body.appendChild(aTag);
      aTag.click();
      // Loại bỏ thẻ <a> sau khi kết thúc
      document.body.removeChild(aTag);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  const handleEditClick = (id) => {
    // Hiển thị AddCarModal trong chế độ sửa
    setIsEditMode(true);
    setIsClickedAddCar(true);
    setVehId(id)
  };

  const handleAddcar = () =>{
      setIsClickedAddCar(true)
      setIsEditMode(false)
  }

  const handleDelete = async () => {
    setIsDeleteConfirmationOpen(true);
  };

  // XÁC NHẬN XÓA MODAL
  const handleDeleteConfirmation = async () => {
    try {
      const data = { vehicleIds: listDelItem };
      const listDelete = await vehicleService.deleteVehicle(data);
      if (listDelete) {
        toast.success("XÓA THÀNH CÔNG  THÀNH CÔNG", {
          theme: "colored",
        });
        setListCar((prevList) =>
          prevList.filter((item) => !listDelItem.includes(item.VEH_ID))
        );
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

  const getValuePagination = (value) => {
    // console.log("value", value)
}
console.log("ok")
  return (
    <div>
      <div
        style={{
          padding: "20px",
          marginTop: "75px",
          minHeight: window.innerHeight - 188 + "px",
        }}>
        <div className="title-page">Danh sách xe</div>
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
                      value={ValueInput}
                      onChange={(e) => handlefilterTable(e)}
                      className="input-search-table"
                      placeholder="Nhập để tìm kiếm nhanh"
                      type="text"
                    />
                    <i
                      onClick={() => setValueInput("")}
                      className="bi bi-search icon-search-input-mm"></i>
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
                  <span>Xóa xe</span>
                </button>
              )}
                <DeleteConfirmationModal
                isOpen={isDeleteConfirmationOpen}
                onClose={handleCancelDelete}
                onConfirm={handleDeleteConfirmation}
              />
              <button className="btn-action-table" style={{ marginRight: "5px" }}>
                <i className="bi bi-download icon-btn-table"></i>
                <span>Xuất Excel</span>
              </button>
              <button
                onClick={handleAddcar}
                className="btn-action-table">
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
                          {TableTHead.map((item, index) => (
                            <th
                              style={{
                                width: item.with ? item.with : "auto",
                                textAlign: index === 0 ? "center" : "left",
                              }}
                              key={index}>
                              {item.name}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {listcar.map((item, index) => (
                          <tr key={index}>
                            <td style={{ textAlign: "center" }}>{index + 1}</td>
                            <td>{item?.VEH_CODE}</td>
                            <td>{item?.VEH_NAME}</td>
                            <td>
                              <div className="wrap-image-item-table">
                                <img
                                  className="image-item-table"
                                  src={`${VehicleService.API_BASE_URL}/img/others/${item?.PICTURE}`}
                                  alt=""
                                />
                              </div>
                            </td>
                            <td>{item?.VehicleModel?.Departments.NAME_VN}</td>
                            <td>{item?.VehicleModel?.VEM_NAME}</td>
                            <td>{item?.Segment?.NAME_VN}</td>
                            <td>
                              {item?.PDF_INSTRUCTION != null ? (
                                <i
                                  onClick={() => handleDownloadPDF(item?.PDF_INSTRUCTION)}
                                  className="bi bi-filetype-pdf icon-file-PDF"></i>
                              ) : (
                                ""
                              )}
                            </td>
                            <td>
                              {item?.PDF_MAINTENANCE != null ? (
                                <i
                                  onClick={() => handleDownloadPDF(item?.PDF_MAINTENANCE)}
                                  className="bi bi-filetype-pdf icon-file-PDF"></i>
                              ) : (
                                ""
                              )}
                            </td>
                            <td>
                              <div className="form-check form-switch check-group1">
                                <input
                                  disabled
                                  checked={item.IS_ACTIVE}
                                  className="form-check-input"
                                  type="checkbox"
                                  id="0"
                                />
                              </div>
                            </td>
                            <td>
                              {item.CREATE_DATE
                                ? formatISODateToDateString(item?.CREATE_DATE)
                                : ""}
                            </td>
                            <td>{item?.VEH_NOTE}</td>
                            <td>
                              <div className="wrap-action-item">
                                <button
                                  style={{ marginRight: "8px" }}
                                  className=" btn-item-action-table tooltip-action-table"
                                  onClick={() => handleEditClick(item?.VEH_ID)}>
                                  <i className="bi bi-pencil-square "></i>
                                  <span
                                    className="text-tooltip-action-table"
                                    style={{ width: "80px" }}>
                                    Chỉnh sửa
                                  </span>
                                </button>
                                <label className="container tooltip-action-table">
                                  <input
                                    onChange={(e) => handleCheckBox(e, item.VEH_ID)}
                                    type="checkbox"
                                  />
                                  <span className="checkmark" />
                                </label>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <PaginationIT valuePagination={(value) => getValuePagination(value)} Total={50} ></PaginationIT>
        </div>
      </div>
      <AddCarModal
          isOpen={isClickedAddCar}
          onClose={() => setIsClickedAddCar(false)}
          isEditMode={isEditMode}
          vehId={vehId}
        />
    </div>
  );
};

export default SysVehicle;
