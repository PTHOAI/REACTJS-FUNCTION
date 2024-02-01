import React, { useState, useEffect } from "react";
import PaginationIT from "../../component/paginationIT/paginationIT";
import userService from "../../services/user.service";
import AddUserModal from "../../component/modal/addUserModal";
import { toast } from "react-toastify";

const TableTHead = [
  { name: "STT", with: "50px" },
  { name: "Tên đăng nhập", with: "200px" },
  { name: "Email", with: "200px" },
  { name: "SĐT", with: "150px" },
  { name: "Đơn vị công tác" },
  { name: "Quyền người dùng", with: "140px" },
  { name: "Ngày tạo", with: "110px" },
  { name: "Ghi chú" },
  { name: "Điều chỉnh", with: "100px" },
];

function ManagerAccount(props) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [listDelItem, setListDelItem] = useState([]);
  const [data, setData] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [vehId, setVehId] = useState("");

  const fetchData = async () => {
    const resuft = await userService.fetchUsers();
    setData(resuft);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCheckBox = (e, code) => {
    if (e.target.checked) {
      setListDelItem([...listDelItem, code]);
    } else {
      setListDelItem(listDelItem.filter((item) => item !== code));
    }
  };

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


  const getValuePagination = (value) => {
    console.log("value", value);
  };

  return (
    <div>
      <div
        style={{
          padding: "20px",
          marginTop: "75px",
          minHeight: window.innerHeight - 188 + "px",
        }}>
        <div className="title-page">Danh sách tài khoản</div>
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
                      className="input-search-table"
                      placeholder="Nhập để tìm kiếm nhanh"
                      type="text"
                    />
                    <i className="bi bi-search icon-search-input-mm"></i>
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
                  <span>Xóa tài khoản</span>
                </button>
              )}
              <button className="btn-action-table" onClick={()=>setModalOpen(true)}>
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
                        {data.map((item, index) => (
                          <tr key={item.userName}>
                            <td style={{ textAlign: "center" }}>{index + 1}</td>
                            <td>{item?.UserName}</td>
                            <td>{item?.Email}</td>
                            <td>{item?.PhoneNumber}</td>
                            <td>{item.Address}</td>
                            <td>{item.UserRoles[0]?.Roles.Name}</td>
                            <td>{item.date}</td>
                            <td>{item.Note}</td>
                            <td>
                              <div className="wrap-action-item">
                                <button
                                  style={{ marginRight: "8px" }}
                                  className=" btn-item-action-table tooltip-action-table">
                                  <i className="bi bi-key-fill"></i>
                                  <span className="text-tooltip-action-table">
                                    Đặt lại mật khẩu
                                  </span>
                                </button>
                                <button
                                  style={{ marginRight: "8px" }}
                                  className=" btn-item-action-table tooltip-action-table">
                                  <i className="bi bi-pencil-square "></i>
                                  <span className="text-tooltip-action-table">
                                    Chỉnh sửa tài khoản
                                  </span>
                                </button>
                                <label className="container tooltip-action-table">
                                  <input
                                    onChange={(e) =>
                                      handleCheckBox(e, item.userName)
                                    }
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
          <AddUserModal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            onSubmit={handleAddUnitCar}
            vehId={vehId}
            isEditMode={isEditMode}
          />
          <PaginationIT
            valuePagination={(value) => getValuePagination(value)}
            Total={1020}></PaginationIT>
        </div>
      </div>
    </div>
  );
}

export default ManagerAccount;
