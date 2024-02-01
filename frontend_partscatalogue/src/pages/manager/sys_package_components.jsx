import React, { useEffect, useState, useRef } from "react";
import { DataTable } from "./APIvehecleParts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import AddPackageComModal from "../../component/modal/addPackageComModal";
import ComponentService from "../../services/component.service";
import DeleteConfirmationModal from "../../component/modal/deleteConfirmationModal";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import ImportModal from "../../component/modal/importDataModal";
import { layKyTuTu15 } from "../../component/util/util";
import componentService from "../../services/component.service";
import { useNavigate } from "react-router-dom";
import PaginationIT from "../../component/paginationIT/paginationIT";

const TableTHead = [
  // dữ liệu tiêu đề table
  { name: "STT", with: "50px" },
  { name: "Mã Cụm", with: "150px" },
  { name: "Tên tiếng Việt", with: "200px" },
  { name: "Tên tiếng Anh", with: "200px" },
  { name: "ĐVT", with: "80px" },
  { name: "Hình Ảnh", with: "150px" },
  { name: "Mã Cụm Cha", with: "150px" },
  { name: "Tên Cụm Cha", with: "200px" },
  { name: "NCC", with: "150px" },
  { name: "Ngày Tạo", with: "150px" },
  { name: "Ghi Chú" },
  { name: "Điều chỉnh", with: "110px" },
];

function SysPackageComponent(props) {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const fileSvgRef = useRef(null);
  const [packageComponent, setPackageComponent] = useState("packagecomponent");
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
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [vehId, setVehId] = useState("");

  const fetchData = async () => {
    try {
      const result = await ComponentService.getListPackageComponent(
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
    fetchData();
  }, [currentPage, itemsPerPage]);

  const handleImportClick = () => {
    setImportModalOpen(true);
    fileInputRef.current.click();
  };

  // upload file svg
  const handleUploadSvg = () => {
    fileSvgRef.current.click();
  };

  const handlePKCom = async () => {
    try {
      fetchData();
      toast.success("LƯU CỤM LINH KIỆN THÀNH CÔNG", {
        theme: "colored",
      });
    } catch (error) {
      console.error(error);
    }
  };

  // upload file svg
  const handleUploadFileSvg = async (event) => {
    const selectedFiles = event.target.files;
    const result = await componentService.UploadFileSvg(selectedFiles);
    if (result) {
      toast.success("THÊM THÀNH CÔNG", {
        theme: "colored",
      });
    }
  };

  const handleSearchPart = async () => {
    // khi bấm tìm kiếm thì sẽ cho list linh kiện xóa bằng rỗng
    setListDelItem([]);
    const listComponent =
      await ComponentService.fetchGetListSearchPackageComponent(
        searchPart,
        currentPage,
        itemsPerPage
      );
    if (listComponent) {
      setDataFilter(listComponent);
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

  const getValuePagination = (value) => {
    // console.log("value", value)
    if (currentPage !== value.NumberPage || itemsPerPage !== value.TotalItemInPage) {
      setItemsPerPage(Number(value.TotalItemInPage));
      setCurrentPage(value.NumberPage);
    }
  }

  const handleDelete = async () => {
    setIsDeleteConfirmationOpen(true);
  };

  // XÁC NHẬN XÓA MODAL
  const handleDeleteConfirmation = async () => {
    try {
      const data = { componentIds: listDelItem };
      const listDelete = await ComponentService.deletePackageComponents(data);
      if (listDelete) {
        toast.success("XÓA THÀNH CÔNG  THÀNH CÔNG", {
          theme: "colored",
        });
        setDataFilter((prevList) =>
          prevList.filter((item) => !listDelItem.includes(item.PAG_ID))
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

  return (
    <div
      style={{ marginTop: "75px", minHeight: window.innerHeight - 188 + "px" }}>
      <div style={{ padding: "20px" }}>
        <div className="title-page">Danh sách cụm linh kiện xe</div>

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
                      placeholder="Nhập để tìm kiếm cụm linh kiện xe"
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
                  <span>Xóa cụm linh kiện xe</span>
                </button>
              )}
              <DeleteConfirmationModal
                isOpen={isDeleteConfirmationOpen}
                onClose={handleCancelDelete}
                onConfirm={handleDeleteConfirmation}
              />
              <button
                className="btn-action-table mr-1"
                onClick={handleUploadSvg}>
                <i
                  className="bi bi-upload icon-btn-table "
                  htmlFor="imageInput"></i>
                <span>Upload File SVG</span>
              </button>
              <input
                type="file"
                id="imageInput"
                accept=".svg" // Specify the allowed file types
                className="hidden"
                multiple
                ref={fileSvgRef}
                onChange={handleUploadFileSvg}
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
          <div
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
                      maxHeight: window.innerHeight - 380 + "px",
                    }}>
                    <table className="table mb-0">
                      <thead style={{ backgroundColor: "#002d72" }}>
                        <tr>
                          {
                            TableTHead.map((item, index) => <th style={{ width: item.with ? item.with : 'auto', textAlign: index === 0 ? 'center' : 'left' }} key={index}>{item.name}</th>)
                          }
                        </tr>
                      </thead>
                      <tbody>
                        {dataFilter?.length > 0 ? (
                          dataFilter.map((item, index) => (
                            <tr key={index}>
                              <td style={{ textAlign: "center" }}>
                                {index + 1}
                              </td>
                              <td>{item?.PAG_CODE}</td>
                              <td>{item.PAG_NAME_VN}</td>
                              <td>{item.PAG_NAME_EN}</td>
                              <td>{item.Units?.UNI_NAME}</td>
                              <td>{layKyTuTu15(item.PAG_IMAGE)}</td>
                              <td>{item?.pagCodeFromParent}</td>
                              <td>{item?.namePackageFromParent}</td>
                              <td>{item?.PAG_SUPPLIER}</td>
                              <td>{item?.CREATE_DATE}</td>
                              <td>{item?.PAG_NOTE}</td>
                              <td>
                                <div className="wrap-action-item">
                                  <button
                                    style={{ marginRight: "8px" }}
                                    className=" btn-item-action-table tooltip-action-table">
                                    <i className="bi bi-pencil-square "></i>
                                    <span
                                      className="text-tooltip-action-table"
                                      style={{ width: "75px" }}>
                                      Chỉnh sửa
                                    </span>
                                  </button>
                                  <button
                                    style={{ marginRight: "8px" }}
                                    onClick={() =>
                                      navigate(
                                        `/home/syspackagecomponent/package/${item?.PAG_ID}`
                                      )
                                    }
                                    className=" btn-item-action-table tooltip-action-table">
                                    <i className="bi bi-gear"></i>
                                    <span
                                      className="text-tooltip-action-table"
                                      style={{ width: "60px" }}>
                                      Tích hợp
                                    </span>
                                  </button>
                                  <label className="container tooltip-action-table">
                                    <input
                                      onChange={(e) =>
                                        handleCheckBox(e, item.PAG_ID)
                                      }
                                      checked={listDelItem.includes(
                                        item.PAG_ID
                                      )}
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
            type={packageComponent}
          />

        </div>
      </div>
      <AddPackageComModal
        isOpen={isAddPartModalOpen}
        onClose={() => setAddPartModalOpen(false)}
        onSubmit={handlePKCom}
        vehId={vehId}
        isEditMode={isEditMode}
      />
    </div>
  );
}
export default SysPackageComponent;
