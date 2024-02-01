import React, { useState } from "react";
import ListComponent from "../../component/listcomponents/listcomponent";
import VehiclePartsComponent from "../../component/vehicleparts/vehiclepart";
function Vehicle() {
    return (
        <div style={{marginTop: "75px" , minHeight: window.innerHeight - 188 + 'px'}}>         
            <VehiclePartsComponent></VehiclePartsComponent>
            <ListComponent></ListComponent>
        </div>
    );
}

export default Vehicle;
