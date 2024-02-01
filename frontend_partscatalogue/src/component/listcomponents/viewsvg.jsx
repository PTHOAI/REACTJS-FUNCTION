import VehicleService from "../../services/vehicle.service";
import { ReactSVG } from "react-svg";
import { extractString, layKyTuTu15 } from "../util/util";
import React from "react";
import $ from 'jquery';

const ViewSvg = ({childBooms,handleSvgItemClick}) => {
    setTimeout(()=>{
        $("svg").css({"height": `${window.innerHeight - 420}px`});
    },100)
    return (
    <ReactSVG
        style={{ height: "auto" }}
        onClick={handleSvgItemClick}
        src={`${VehicleService.API_BASE_URL
            }/img/svg/${layKyTuTu15(childBooms[0]?.PAG_IMAGE)}`}
    />)
}

export default ViewSvg