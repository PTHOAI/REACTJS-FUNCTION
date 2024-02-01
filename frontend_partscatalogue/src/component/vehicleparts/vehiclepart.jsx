import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import VehicleService from "../../services/vehicle.service";
import { getidPartsVehicle } from "../../redux/partsSlice";
function VehiclePartsComponent() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [groupCar, setGroupCar] = useState({});
  const [tradeMark, setTradeMark] = useState({});
  const [vehicle, setVehicle] = useState({});
  const [listPartsVehicle, setlistPartsVehicle] = useState([]);
  const dispatch = useDispatch();
  const id = useSelector((state) => state?.parts?.id);
  const handleItemClick = (index,idPart) => {
    dispatch(getidPartsVehicle(idPart))
    setActiveIndex(index);
  };
  // lấy chi tiết đơn vị xe
  useEffect(() => {
    // Fetch list trade mark data
    VehicleService.fetchListTradeMarkData(id.idTradeMark)
      .then((res) => {
        setGroupCar(res);
      })
      .catch((err) => {
        console.log(err);
      });
  
    // Fetch detail trade mark
    VehicleService.fetchDetailTradeMark(id.idGroupVehicle)
      .then((res) => {
        setTradeMark(res);
      })
      .catch((err) => {
        console.log(err);
      });
  
    // Fetch detail vehicle
    VehicleService.fetchDetailVehicle(id.idVehicle)
      .then((res) => {
        setVehicle(res);
      })
      .catch((err) => {
        console.log(err);
      });
  
    // Fetch list part car
    VehicleService.fetchListPartCar(id.idVehicle)
      .then((res) => {
        setlistPartsVehicle(res);
        dispatch(getidPartsVehicle(res[0]?.ID))
      })
      .catch((err) => {
        console.log(err);
      });

      VehicleService.fetchGetDetailSegment(id.idSegment)
      .then((res) => {
       console.log("res",res)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id.idTradeMark, id.idGroupVehicle, id.idVehicle,id.idSegment]);
  
  return (
    <div>
      <div className="info-car">
        <a
          href="/home"
          style={{ marginRight: "10px", cursor: "pointer", color: "black" }}>
          trang chủ
        </a>
        <i
          style={{ marginRight: "10px" }}
          className="bi bi-caret-right-fill"></i>
        <a
          href=""
          style={{ padding: "5px 10px", borderRadius: "5px", color: "black" }}>
          {groupCar?.NAME_VN}
        </a>
        <i
          style={{ marginRight: "10px" }}
          className="bi bi-caret-right-fill"></i>
        <a
          href=""
          style={{ padding: "5px 10px", borderRadius: "5px", color: "black" }}>
          {tradeMark?.VEM_NAME}
        </a>
        <i
          style={{ marginRight: "10px" }}
          className="bi bi-caret-right-fill"></i>
        <div className="btn-name-car">{vehicle?.VEH_NAME}</div>
      </div>
      
      <ul className="list-parts-car">
        {listPartsVehicle?.map((item,index)=>(
        <li
          className={`item-parts ${activeIndex === index ? "active" : ""}`}
          key={index}
          onClick={() => handleItemClick(index,item?.ID)}>
          {item?.PART_NAME_VN}
        </li>
        ))}
      </ul>
    </div>
  );
}

export default VehiclePartsComponent;
