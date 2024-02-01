import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import ComponentService from "../../services/component.service";
import VehicleService from "../../services/vehicle.service";
import DeleteConfirmationModal from "../../component/modal/deleteConfirmationModal";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import ImportModal from "../../component/modal/importDataModal";
import PaginationIT from "../../component/paginationIT/paginationIT";
import AddBomPackageModal from "../../component/modal/addBomPackage";

const TableTHead = [
  // dữ liệu tiêu đề table
  { name: "STT", with: '50px' },
  { name: "Mã cụm", with: '200px' },
  { name: "Tên cụm", with: '200px' },
  { name: "Mã linh kiện", with: '200px' },
  { name: "Tên linh kiện", with: '300px' },
  { name: "ĐVT", with: '60px' },
  { name: "Số lượng", with: '75px' },
  { name: "Ngày tạo", with: '110px' },
  { name: "Ghi chú" },
  { name: "Điều chỉnh", with: '100px' },
];

function SysPackageBomComponent(props) {
  const fileInputRef = useRef(null);
  const [packageBom, setPackageBom] = useState('packagebom');
  const [isAddPartModalOpen, setAddPartModalOpen] = useState(false);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [listDelItem, setListDelItem] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [dataFilter, setDataFilter] = useState([]);
  const [searchPart, setSearchPart] = useState("");
  const [selectFileExcel, setSelectFileExcel] = useState(null);
  const [importedData, setImportedData] = useState(null);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [vehId, setVehId] = useState("");

  const fetchData = async () => {
    try {
      const result = await ComponentService.getListPackageBomComponent(
        currentPage,
        itemsPerPage
      );
      if (result) {
        setDataFilter(result.list);
        setTotalItems(result?.totalItems);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, itemsPerPage]);

  const handleImportClick = () => {
    setImportModalOpen(true);
    fileInputRef.current.click();
  };

  const handleSearchPart = async () => {
    // khi bấm tìm kiếm thì sẽ cho list linh kiện xóa bằng rỗng
    setListDelItem([])
    const listComponent = await ComponentService.fetchGetListSearchPackageBomComponent(
      searchPart,
      currentPage,
      itemsPerPage
    );
    if (listComponent) {
      setDataFilter(listComponent);
    }
  };

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

  const closeImportModal = () => {
    setImportModalOpen(!importModalOpen);
    setImportedData(null);
  };

  const handleChangeItemsPerPage = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to the first page when changing items per page
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
      const data = { packageBomIds: listDelItem };
      const listDelete = await VehicleService.deletePackageBom(data);
      if (listDelete) {
        toast.success("XÓA THÀNH CÔNG", {
          theme: "colored",
        });
        setDataFilter(prevList => prevList.filter(item => !listDelItem.includes(item.PAB_ID)));
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
  // Xử lý phân trang
  const getValuePagination = (value) => {
    console.log("value", value)
    if (currentPage !== value.NumberPage || itemsPerPage !== value.TotalItemInPage) {
      setItemsPerPage(Number(value.TotalItemInPage));
      setCurrentPage(value.NumberPage);
    }
  }

  // console.log("currentPage:", currentPage)
  // console.log("itemsPerPage:", itemsPerPage)
  // console.log("totalItems:", totalItems)
  return (
    <div style={{ marginTop: "75px", minHeight: window.innerHeight - 188 + 'px' }}>
      <div style={{ padding: '20px' }}>
        <div className="title-page">Danh Sách BOM Cụm</div>

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
                      placeholder="Nhập để tìm kiếm"
                      type="text"
                    />
                    {/* <FontAwesomeIcon
                      onClick={handleSearchPart}
                      icon={faSearch}
                      className="search-icon absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                    /> */}
                    <i
                      onClick={handleSearchPart}
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
                  <span>Xóa BOM cụm</span>
                </button>
              )}
              <DeleteConfirmationModal
                isOpen={isDeleteConfirmationOpen}
                onClose={handleCancelDelete}
                onConfirm={handleDeleteConfirmation}
              />
              <button
                className="btn-action-table mr-1"
                onClick={handleImportClick}>
                <i
                  className="bi bi-upload icon-btn-table "
                  htmlFor="imageInput"></i>
                <span>Import</span>
              </button>
              <input
                type="file"
                id="imageInput"
                accept=".csv, .xlsx" // Specify the allowed file types
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <button
                className="btn-action-table"
                onClick={() => setAddPartModalOpen(true)}>
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
                          dataFilter
                            .map((item, index) => (
                              <tr key={index}>
                                <td style={{ textAlign: "center" }}>{index + 1}</td>
                                <td>{item?.pagCodePK}</td>
                                <td>{item?.namePackage}</td>
                                <td>{item?.pagCodeCom}</td>
                                <td>{item?.nameCom}</td>
                                <td>{item?.nameUnit}</td>
                                <td>{item?.PAG_QUATITY}</td>
                                <td>{item?.CREATE_DATE}</td>
                                <td>{item?.PAB_NOTE}</td>
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
                                        onChange={(e) => handleCheckBox(e, item.PAB_ID)}
                                        checked={listDelItem.includes(item.PAB_ID)}
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
          {
            totalItems != 0 ? (<PaginationIT valuePagination={(value) => getValuePagination(value)} Total={totalItems} ></PaginationIT>) : ''
          }

          <ImportModal
            isOpen={importModalOpen}
            onClose={closeImportModal}
            importedData={importedData}
            type={packageBom}
          />

        </div>
      </div>
      <AddBomPackageModal
        isOpen={isAddPartModalOpen}
        onClose={() => setAddPartModalOpen(false)}
        onSubmit={handleAddUnitCar}
        vehId={vehId}
        isEditMode={isEditMode}
      />
    </div>
  );
}
export default SysPackageBomComponent;
