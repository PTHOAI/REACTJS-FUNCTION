import React, { useEffect, useState, useRef } from "react";
import { DataTable } from "./APIvehecleParts";
import ComponnentService from "../../services/component.service";
import vehicleService from "../../services/vehicle.service";
import * as XLSX from "xlsx";
import AddVehicleBomModal from "../../component/modal/addvehicleBom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import DeleteConfirmationModal from "../../component/modal/deleteConfirmationModal";
import { toast } from "react-toastify";
import PaginationIT from "../../component/paginationIT/paginationIT";

const TableTHead = [
  // dữ liệu tiêu đề table
  { name: "STT", with: "50px" },
  { name: "Mã Xe", with: "100px" },
  { name: "Tên Xe", with: "200px" },
  { name: "Mã Cụm", with: "150px" },
  { name: "Tên cụm", with: "200px" },
  { name: "Bộ Phận Xe", with: "200px" },
  { name: "Ngày Tạo", with: "100px" },
  { name: "Ghi Chú" },
  { name: "Điều chỉnh", with: "100px" },
];

const SysVehicleBom = () => {
  const fileInputRef = useRef(null);
  const [dataFilter, setDataFilter] = useState([]);
  const [listDelItem, setListDelItem] = useState([]);
  const [component, setComponent] = useState('component');
  const [searchPart, setSearchPart] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [selectFileExcel, setSelectFileExcel] = useState(null);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [importedData, setImportedData] = useState(null);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await vehicleService.fetchGetListVehicleBom(
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
    setListDelItem([]);
    fetchData();
  }, [currentPage, itemsPerPage]);

  const handleCheckBox = (e, code) => {
    setListDelItem((prevSelectedValues) => {
      if (prevSelectedValues.includes(code)) {
        return prevSelectedValues.filter((value) => value !== code);
      } else {
        return [...prevSelectedValues, code];
      }
    });
  };
  const getValuePagination = (value) => {
    // console.log("value", value)
    if (currentPage !== value.NumberPage || itemsPerPage !== value.TotalItemInPage) {
      setItemsPerPage(Number(value.TotalItemInPage));
      setCurrentPage(value.NumberPage);
    }
  }

  const handleImportClick = () => {
    setImportModalOpen(true);
    fileInputRef.current.click();
  };

  const closeImportModal = () => {
    setImportModalOpen(!importModalOpen);
    setImportedData(null);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setSelectFileExcel(selectedFile);
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        // Convert sheet data to JSON
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        setImportModalOpen(true);
        setImportedData(jsonData);
      };
      reader.readAsBinaryString(selectedFile);
    }
  };
  /*
    const handleSearchPart = async () => {
      // khi bấm tìm kiếm thì sẽ cho list linh kiện xóa bằng rỗng
      setListDelItem([])
      const listComponent = await ComponentService.fetchGetListSearchComponent(
        searchPart,
        currentPage,
        itemsPerPage
      );
      if (listComponent) {
        setDataFilter(listComponent);
      }
    };*/

  const handleChangeItemsPerPage = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleDelete = async () => {
    setIsDeleteConfirmationOpen(true);
  };

  // XÁC NHẬN XÓA MODAL
  const handleDeleteConfirmation = async () => {
    try {
      const data = { vehicleBomIds: listDelItem };
      const listDelete = await ComponnentService.deleteVehicleBom(data);
      if (listDelete) {
        toast.success("XÓA THÀNH CÔNG ", {
          theme: "colored",
        });
        setDataFilter(prevList => prevList.filter(item => !listDelItem.includes(item.VEB_ID)));
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

  return (
    <div style={{ marginTop: "75px", minHeight: window.innerHeight - 188 + 'px' }}>
      <div style={{ padding: '20px' }}>
        <div className="title-page">Danh sách BOM xe</div>
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
                      onChange={(e) => {
                        setSearchPart(e.target.value);
                      }}
                      className="input-search-table"
                      placeholder="Nhập để tìm kiếm linh kiện xe"
                      type="text"
                    />
                    <i
                      //onClick={handleSearchPart}
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
                  <span>Xóa BOM Xe</span>
                </button>
              )}
              <DeleteConfirmationModal
                isOpen={isDeleteConfirmationOpen}
                onClose={handleCancelDelete}
                onConfirm={handleDeleteConfirmation}
              />
              <button className="btn-action-table" onClick={() => { setAddModalOpen(true) }}>
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
                          dataFilter?.map((item, index) => (
                            <tr key={index}>
                              <td style={{ textAlign: "center" }}>{index + 1}</td>
                              <td>{item?.Vehicle?.VEH_CODE}</td>
                              <td>{item?.Vehicle?.VEH_NAME}</td>
                              <td>{item?.PAG_CODE}</td>
                              <td>{item?.PAG_NAME_VN}</td>
                              <td>{item?.PART_NAME_VN}</td>
                              <td>{item?.CREATE_DATE}</td>
                              <td>{item?.NOTE}</td>
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
                                      onChange={(e) => handleCheckBox(e, item.VEB_ID)}
                                      checked={listDelItem.includes(item.VEB_ID)}
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
          <PaginationIT valuePagination={(value) => getValuePagination(value)} Total={5081} ></PaginationIT>

        </div>
      </div>
      <AddVehicleBomModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
      />
    </div>
  );
};

export default SysVehicleBom;
