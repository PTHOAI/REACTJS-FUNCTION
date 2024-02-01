import React, { Fragment, useEffect, useState } from "react";
import Images from "../../assets/images/images";
import "bootstrap/dist/css/bootstrap.css";
import "./../../assets/css/main.css";
import VehicleService from "../../services/vehicle.service";
import { useDispatch, useSelector } from "react-redux";
import { getidPartsSuccess } from "../../redux/partsSlice";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
function PageHome() {
  const [inforVehicle, setInforVehicle] = useState("");
  const [inforGroup, setInforGroup] = useState("");
  const [groupCar, setGroupCar] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [tradeMark, setTradeMark] = useState([]); // lấy danh sách xe từ thương hiệu
  const [listVehicle, setListVehicle] = useState([]);
  const [listSegment, setListSegment] = useState([]);
  const [idTradeMark, setIdTradeMark] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedValues, setSelectedValues] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInforGroup = (id) => {
    setInforGroup(id);
  };
  // CHỌN XE ĐỂ VÔ TRANG BẢNG CỤM LINH KIỆN XE
  const handleInforVehicle = async (idVehicle, id_segment) => {
    let dataid = {};
    dataid = {
      ...dataid,
      idSegment: id_segment,
      idvehicle: idVehicle,
      idTradeMark: inforGroup,
      idGroup: idTradeMark,
    };
    setInforVehicle(idVehicle);
    try {
      dispatch(getidPartsSuccess(dataid));
      navigate("vehicle");
    } catch (error) {
      // Handle any errors that may occur during the dispatch
      console.error("Error dispatching getidPartsSuccess:", error);
    }
  };
  // CHỌN PHÂN KHÚC XE
  const handleCheckboxChange = async (event) => {
    const { id } = event.target;
    setSelectedValues((prevSelectedValues) => {
      if (prevSelectedValues.includes(id)) {
        return prevSelectedValues.filter((value) => value !== id);
      } else {
        return [...prevSelectedValues, id];
      }
    });
  };

  const handleListVehicle = (trademark, idgroup) => {
    VehicleService.fetchlistSegment(idgroup)
      .then((res) => {
        setListSegment(res);
      })
      .catch((err) => {});
    setIdTradeMark(idgroup);
    //setListVehicle(trademark);
    setSelectedValues([]);
    setListVehicle([]);
  };

  useEffect(() => {
    VehicleService.fetchListUnitCar() // LẤY ĐƠN VỊ XE
      .then((res) => {
        setGroupCar(res);
        if (res) {
          setInforGroup(res[0]?.ID);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //LAY DANH SÁCH THƯƠNG HIỆU
  useEffect(() => {
    if (inforGroup) {
      VehicleService.fetchListTradeMarkData(inforGroup)
        .then((res) => {
          setTradeMark(res);
          if (res) {
            // setListVehicle(res?.VehicleModels[0]?.Vehicles);
            setIdTradeMark(res?.VehicleModels[0]?.VEM_ID);
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message, {
            theme: "colored",
          });
        });
    }
    setListVehicle([]);
  }, [inforGroup]);

  // Lấy Danh sách Phân khúc
  useEffect(() => {
    VehicleService.fetchlistSegment(idTradeMark)
      .then((res) => {
        if (res) {
          setListSegment(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [idTradeMark]);

  // lấy danh sách xe
  useEffect(() => {
    setIsLoading(true);
    const selectedValuesObject = { selectedIds: selectedValues };
    VehicleService.fetchlistCarOfSegment(selectedValuesObject)
      .then((res) => {
        setListVehicle(res);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedValues, inforGroup]);
  return (
    <div className="wrap">
      <div className="content" style={{ padding: '20px', marginTop: "75px" , minHeight: window.innerHeight - 188 + 'px'}}>
        <div className="type-brand">
          {groupCar &&
            groupCar.map((item, index) => {
              const isAdmin = user.data.role === "Administrator";
              const isUserRole = user.data.role === item.CODE;
              return (
                <div
                  key={index}
                  className={`bus tab-box-brand ${
                    inforGroup === item?.ID ? "activ-click" : ""
                  } `}
                  style={{ opacity: isAdmin ? 1 : isUserRole ? 1 : 0.5 }}
                  onClick={() => (isAdmin || isUserRole) &&  handleInforGroup(item?.ID)}>
                  {item?.NAME_VN}
                </div>
              );
            })}
        </div>
        <div className="wrap-boxItem">
          <div
            className="box-header"
            style={{
              paddingBottom: "3px",
              display: "flex",
              justifyContent: "center",
            }}>
            {tradeMark &&
              tradeMark?.VehicleModels?.map((item, index) => (
                <div
                  key={index}
                  className={`wrap-box-header group-car ${
                    item?.VEM_ID === idTradeMark ? "active-group-car" : ""
                  }`}
                  onClick={() =>
                    handleListVehicle(item?.Vehicles, item?.VEM_ID)
                  }>
                  <img
                    src={`${VehicleService.API_BASE_URL}/img/others/${item?.VEM_NOTE}`}
                    alt=""
                  />
                </div>
              ))}
          </div>
        </div>
        {isLoading ? (
          // Display loading message or spinner while data is being fetched
          <div className="flex items-center justify-center">
            <BeatLoader size={15} color={"#123abc"} loading={isLoading} />
          </div>
        ) : (
          // Display the content when data fetching is complete
          <div className="wrap-phan-khuc">
            {listSegment?.map((item, index) => (
              <div className="form-check form-switch check-group1" key={index}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={item?.ID_SEGMENT}
                  onChange={handleCheckboxChange}
                  checked={selectedValues.includes(item?.ID_SEGMENT)}
                />
                <label
                  className="form-check-label check-label-cus"
                  htmlFor={item?.ID_SEGMENT}>
                  {item?.NAME_VN}
                </label>
              </div>
            ))}
          </div>
        )}

        <div className="row my-5" style={{ paddingBottom: "60px" }}>
          {listVehicle &&
            listVehicle?.map((item, index) => (
              <div
                key={index}
                className=" col-md-3 col-sm-6 mb-4 cursor-pointer"
                onClick={() =>
                  handleInforVehicle(item?.VEH_ID, item?.ID_SEGMENT)
                }>
                <div className="card card-block card-block-cus">
                  <div className="wrap-img">
                    <img
                      style={{ padding: "20px", transition: "transform 0.3s" }}
                      className="img-box-car-item"
                      src={`${VehicleService.API_BASE_URL}/img/others/${item?.PICTURE}`}
                      alt={item?.VEH_NAME}
                      onMouseOver={(e) => {
                        e.target.style.transform = "scale(1.1)";
                      }}
                      onMouseOut={(e) => {
                        e.target.style.transform = "scale(1)";
                      }}
                    />
                    <div className="text-tooltip">
                      {item?.VEH_NOTE === null ? (
                        <Fragment></Fragment>
                      ) : (
                        <span>{item?.VEH_NOTE}</span>
                      )}
                    </div>
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      borderTop: "1px solid #00529c",
                      color: "black",
                      padding: "10px",
                    }}
                    className="description">
                    <div style={{ fontWeight: 600 }} className="name-car">
                      {item?.VEH_NAME}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default PageHome;
