import React, { useEffect, useState, useRef } from "react";
import images from "../../assets/images/images";
import VehicleService from "../../services/vehicle.service";
import { useDispatch, useSelector } from "react-redux";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Draggable from "react-draggable";
import ViewSvg from "./viewsvg";
import ListView from "./list-view";
import { throttle } from "lodash";
import SavePartsModal from "../modal/savePartsModal";

function ListComponent() {
  const [isChecked, setIsChecked] = useState(false);
  const [partBoom, setPartBoom] = useState({});
  const [childBooms, setChildBooms] = useState({});
  const [codeParentBoom, setCodeParentBoom] = useState({});
  const [listCodeParentBoom, setListCodeParentBoom] = useState([]);
  const idPart = useSelector((state) => state?.parts?.idPart);
  const [isMoved, setIsMoved] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  useEffect(() => {
    VehicleService.fetchPardParkage(idPart)
      .then((res) => {
        setPartBoom(res);
      })
      .catch((err) => {
        console.log("errr", err);
      });
    setListCodeParentBoom([]);
  }, [idPart]);

  useEffect(() => {
    if (partBoom[0]?.VEB_PAGID) {
      VehicleService.fetchChildPart(partBoom[0]?.VEB_PAGID)
        .then((res) => {
          setChildBooms(res);
          console.log("res", res);
          listCodeParentBoom.push(res[0]);
          setCodeParentBoom(res);
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  }, [partBoom]);

  const handleChageChildRent = (item) => {
    VehicleService.fetchChildPart(item?.COMPONENTS[0]?.PAG_ID)
      .then((res) => {
        setChildBooms(res);
        listCodeParentBoom.push(res[0]);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const highlightItemSVG = (itemCode) => {
    if (itemCode) {
      const svgElement = document.getElementById("svg1");
      if (!svgElement) return;
      const texts = svgElement.getElementsByTagName("text");
      for (let i = 0; i < texts.length; i++) {
        const t = texts[i];
        t.parentNode.removeAttribute("fill");
        if (t.innerHTML === itemCode) {
          t.parentNode.setAttribute("fill", "#00ff00");
        }
      }
    }
  };

  const highlightItemTable = (itemCode) => {
    if (itemCode) {
      const items = document.querySelectorAll(".item-table");
      for (let i = 0; i < items.length; i++) {
        const t = items[i];
        const itemTd = t.getAttribute("data-code");
        const allTds = t.querySelectorAll("td");
        if (itemTd === itemCode) {
          allTds.forEach((td) => (td.className = "active-item-table"));
        } else {
          allTds.forEach((td) => (td.className = ""));
        }
      }
    }
  };

  const handleSvgItemClick = (event) => {
    const clickedElement = event.target.parentNode;
    const idValue = clickedElement.getAttribute("id");
    const IdRowHighLight = childBooms
      .filter((item) => {
        return item?.SVG_ELEMENT_ID != null;
      })
      .filter((item) => {
        return item.SVG_ELEMENT_ID === idValue;
      });
    if (IdRowHighLight) {
      highlightItemTable(IdRowHighLight[0]?.COM_CODE);
      highlightItemSVG(IdRowHighLight[0]?.COM_CODE);
    }
  };

  const handleCheckboxChange = (event) => {
    const checked = event.target.checked;
    setIsChecked(checked);
    if (checked) {
      const allRows = childBooms.map((item) => item);
      setSelectedRows(allRows);
    } else {
      setSelectedRows([]);
    }
  };

  const handleRowCheckboxChange = (event, item) => {
    const checked = event.target.checked;
    if (checked) {
      const isItemExist = selectedRows.some(
        (selectedItem) => selectedItem.COM_CODE === item.COM_CODE
      );
      if (!isItemExist) {
        setSelectedRows((prevSelectedRows) => [...prevSelectedRows, item]);
      }
    } else {
      setSelectedRows((prevSelectedRows) =>
        prevSelectedRows.filter(
          (selectedItem) => selectedItem.COM_CODE !== item.COM_CODE
        )
      );
    }
  };

  const handleCloseModal = () => {
    setIsSaveModalOpen(false);
  };

  const handleClickCode = (item, index, Arr) => {
    VehicleService.fetchChildPart(item?.PAG_ID)
      .then((res) => {
        setChildBooms(res);
      })
      .catch((err) => {
        console.log("err", err);
      });
    if (Arr.length > 1) {
      Arr.splice(index + 1, Arr.length - index);
      setCodeParentBoom(Arr);
    }
  };

  return (
    <div>
      <div className="wrap-tab-des-lk">
        <div className="tab-des-lk">
          {listCodeParentBoom?.map((item, index) => (
            <div
              className="wrap-item-des-lk"
              key={index}
              onClick={() => handleClickCode(item, index, listCodeParentBoom)}>
              <span
                style={{ marginRight: "10px" }}
                className={`item-des-lk ${
                  index === listCodeParentBoom.length - 1 ? "active" : ""
                }`}
                key={index}>
                {item?.PAG_CODE}
              </span>
              <i
                style={{ marginRight: "10px" }}
                className="bi bi-caret-right-fill"></i>
            </div>
          ))}
        </div>
      </div>

      <div className="wrap-search-partsCatalogues">
        <div
          className={`Table-search-partsCatalogues ${
            isMoved ? "element-right" : "element-left"
          }`}>
          <div className="wrap-search-item-table-parts">
            <input
              className="search-item-table-parts"
              placeholder="Nhập để tìm kiếm linh kiện"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <i
                className="bi bi-x icon-clear-input"
                onClick={() => setSearchTerm("")}></i>
            )}
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
                      maxHeight: window.innerHeight - 430 + "px",
                    }}>
                    <table className="table mb-0">
                      <thead style={{ backgroundColor: "#002d72" }}>
                        <tr>
                          <th style={{ textAlign: "center" }}>
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={handleCheckboxChange}
                            />
                          </th>
                          {/* <th style={{ textAlign: "center" }} ></th> */}
                          <th>Mã linh kiện</th>
                          <th>Tên linh kiện</th>
                          <th style={{ width: "75px", textAlign: "center" }}>
                            Chi tiết
                          </th>
                        </tr>
                      </thead>
                      <ListView
                        childBooms={childBooms}
                        highlightItemSVG={highlightItemSVG}
                        highlightItemTable={highlightItemTable}
                        searchTerm={searchTerm}
                        handleChageChildRent={handleChageChildRent}
                        handleRowCheckboxChange={handleRowCheckboxChange} // Pass the handler to the ListView
                        selectedRows={selectedRows}
                      />
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setIsSaveModalOpen(true)}>
            Lưu
          </button>
          <SavePartsModal
            isOpen={isSaveModalOpen}
            onClose={handleCloseModal}
            selectedRows={selectedRows}
          />
        </div>
        <div
          className={`view-search-partsCatalogues ${
            isMoved ? "element-left" : "element-right"
          }`}
          style={{
            display: "flex",
            height: "auto",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <div>
            <div className="action-view-svg">
              <div style={{ marginRight: "10px", cursor: "pointer" }}>
                <i className="bi bi-zoom-in"></i>
              </div>
              <div style={{ marginRight: "10px", cursor: "pointer" }}>
                <i className="bi bi-zoom-out"></i>
              </div>
              <div
                onClick={() => setIsMoved(!isMoved)}
                style={{ cursor: "pointer" }}>
                <i className="bi bi-arrow-left-right"></i>
              </div>
            </div>
            {childBooms[0]?.PAG_IMAGE ? (
              <div style={{ height: "70%", objectFit: "cover" }} id="svg1">
                <ViewSvg
                  childBooms={childBooms}
                  handleSvgItemClick={handleSvgItemClick}
                />
              </div>
            ) : (
              <div style={{ textAlign: "center", paddingTop: "20px" }}>
                Không có dữ liệu.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default ListComponent;
