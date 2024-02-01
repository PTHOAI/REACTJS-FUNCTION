import React, { useEffect, useState, useRef } from "react";
import { DataTable } from "./APIvehecleParts";
import ComponentService from "../../services/component.service";
import * as XLSX from "xlsx";
import ImportModal from "../../component/modal/importDataModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import DeleteConfirmationModal from "../../component/modal/deleteConfirmationModal";
import { toast } from "react-toastify";
import AddComponentModal from "../../component/modal/addComponentModal";
import PaginationIT from "../../component/paginationIT/paginationIT";
const TableTHead = [
  // dữ liệu tiêu đề table
  { name: "STT", with: "50px" },
  { name: "Mã LK", with: "150px" },
  { name: "Tên tiếng Anh", with: "200px" },
  { name: "Tên tiếng Việt", with: "200px" },
  { name: "ĐVT", with: "80px" },
  { name: "NCC", with: "150px" },
  { name: "Ngày Tạo", with: "150px" },
  { name: "Ghi chú" },
  { name: "Điều chỉnh", with: "100px" },
];

const SysComponents = () => {
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
  const [importedData, setImportedData] = useState(null);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [isAddPartModalOpen, setAddPartModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [vehId, setVehId] = useState("");
  const [selectDataExist,setSelectDataExist] = useState([])

  const fetchData = async () => {
    try {
      const result = await ComponentService.fetchGetListComponent(
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

  useEffect(() => {
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

  const handleImportClick = () => {
    setImportModalOpen(true);
    fileInputRef.current.click();
  };

  const closeImportModal = () => {
    setImportModalOpen(!importModalOpen);
    setImportedData(null);
  };

  // HIỂN THỊ CODE ĐÃ TỒN TẠI
  const handleSelectDataExist = (data)=>{
    const alertMessage = "Những mã danh sách linh kiện đã tồn tại:\n" + data.map((item) => item?.listHased + ",").join('');
    alert(alertMessage);
  }

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
  };

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
      const data = { componentIds: listDelItem };
      const listDelete = await ComponentService.deleteComponents(data);
      if (listDelete) {
        toast.success("XÓA THÀNH CÔNG", {
          theme: "colored",
        });
        setDataFilter(prevList => prevList.filter(item => !listDelItem.includes(item.COM_ID)));
      }
    } catch (error) {
      console.log("err", error);
    }

    setIsDeleteConfirmationOpen(false);
  };

  const getValuePagination = (value) => {
    // console.log("value", value)
    if (currentPage !== value.NumberPage || itemsPerPage !== value.TotalItemInPage) {
      setItemsPerPage(Number(value.TotalItemInPage));
      setCurrentPage(value.NumberPage);
    }
  }

  // HỦY XÓA MODAL
  const handleCancelDelete = () => {
    setIsDeleteConfirmationOpen(false);
  };

  return (
    <div style={{ marginTop: "75px", minHeight: window.innerHeight - 188 + 'px' }}>
      <div style={{ padding: '20px' }}>
        <div className="title-page">Danh sách linh kiện xe</div>
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
                  <span>Xóa Linh Kiện Xe</span>
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
                              <td>{item?.COM_CODE}</td>
                              <td>{item?.COM_NAME_EN}</td>
                              <td>{item?.COM_NAME_VN}</td>
                              <td>{item?.Units?.UNI_NAME}</td>
                              <td></td>
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
                                      onChange={(e) => handleCheckBox(e, item.COM_ID)}
                                      checked={listDelItem.includes(item.COM_ID)}
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
          <ImportModal
            isOpen={importModalOpen}
            onClose={closeImportModal}
            importedData={importedData}
            type={component}
            handleSelectDataExist={handleSelectDataExist}
          />
        </div>
      </div>
      <AddComponentModal
        isOpen={isAddPartModalOpen}
        onClose={() => setAddPartModalOpen(false)}
        onSubmit={handleAddUnitCar}
        vehId={vehId}
        isEditMode={isEditMode}
      />
    </div>
  );
};

export default SysComponents;
