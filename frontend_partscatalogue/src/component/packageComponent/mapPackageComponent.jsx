import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useParams } from "react-router-dom";
import componentService from "../../services/component.service";
import { extractString, layKyTuTu15 } from "../util/util";
import { ReactSVG } from "react-svg";

const MapPackageComponent = () => {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [svg, setSvg] = useState("");
  const [item, setItem] = useState({});
  const [componentModelItem, setComponentModelItem] = useState({});
  const [arrayDontMap,setArrayDontMap]= useState([])
  const [dataComponents, setDataComponents] = useState([]);
  const { id } = useParams();
  const [svgLoaded, setSvgLoaded] = useState(false);

  const loadData = async () => {
    try {
      const res = await componentService.getPackageBom(id);
      setSvg(res.PAG_IMAGE);
      setDataComponents(res.lists);
    } catch (err) {
      console.error(err);
    }
  };

  const highlightItemSVG = (itemCode) => {
    if (itemCode) {
      const svgElement = document.getElementById("svg1");
      if (!svgElement) return;
      const texts = svgElement.getElementsByTagName("text");
     
      for (let i = 0; i < texts.length; i++) {
        console.log("texts",texts.length)
        const t = texts[i];
        t.parentNode.removeAttribute("fill");
        if (t.innerHTML === itemCode) {
          t.parentNode.setAttribute("fill", "red");    
          t.setAttribute("fill", "#FFF");
        }
      }
    }
  };


  const openModal = () => {
    setModalIsOpen(true);
  };

  useEffect(() => {
    const svgElement = document.getElementById("svg1");
    if (svgElement) {
      const svgLoadHandler = () => {
        const texts = svgElement.getElementsByTagName("text");
        const handleMouseDown = (elementSVGId) => {
          // Xử lý sự kiện mousedown với elementSVGId
          // handleComponentSelection(elementSVGId);
        };
  
        for (let i = 0; i < texts.length; i++) {
          const t = texts[i];
          const parent = t.parentNode;
          parent.addEventListener("mousedown", () => {
            const elementSVGId = t.innerHTML;
            handleMouseDown(elementSVGId);
          });
        }
        dataComponents.forEach((item) => {    
          if (item.SVG_ELEMENT_ID !== null) {
           arrayDontMap.push(item.com.COM_CODE)
            highlightItemSVG(item.com.COM_CODE);
          }
        });
      };
      svgLoadHandler();
    }
  }, [svg]);

  useEffect(() => {
    loadData();
  }, [id]);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <div>{arrayDontMap}</div>
      <div style={{ objectFit: "cover" }} id="svg1">
        <ReactSVG    
          style={{ height: "90%" }}
          src={`${componentService.API_BASE_URL}/img/svg/${layKyTuTu15(svg)}`}
        />
      </div>
    </div>
  );
};

export default MapPackageComponent;
