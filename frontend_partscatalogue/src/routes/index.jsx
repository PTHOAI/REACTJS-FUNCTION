import Login from './../pages/login/login';
import Home from './../pages/home/home';
import Vehicle from './../pages/vehicle/vehicle';
import SysVehicle from './../pages/manager/sys_vehicle';
import SysVehiclePart from './../pages/manager/sys_vehicle_part';
import SysComponents from './../pages/manager/sys_components';
import SysPackageComponent from './../pages/manager/sys_package_components';
import SysPackageBomComponent from './../pages/manager/sys_package_boms';
import SegmentVehicle from './../pages/manager/segment_vehicle'
import MapPackageComponent from './../component/packageComponent/mapPackageComponent'
import SysVehicleBom from './../pages/manager/par_vehicle_boms'
import Unitvehicle from './../pages/manager/unit_vehicle'
import TradeMarkVehicle from './../pages/manager/tradeMark_vehicle'
import ManageFileSVG from './../pages/manager/manageFileSVG'
import ListAccessorySave from './../pages/listAccessorySave/listAccessorySave';
import ManagerAccount from './../pages/managerAccount/managerAccount';
import PDFOfCar from './../pages/manager/pdfOfCar';
import ResSearchAccesory from './../pages/resSearchAccesory/resSearchAccesory';
import Listunit from './../pages/manager/listunit';
const RoutePages = [
    { path: '/home', compponent: Home, isFromSearch: true , isCard:true},
    { path: '/', compponent: Login },
    { path: '/home/sysvehicle', compponent: SysVehicle, isCard:true },
    { path: '/home/vehicle', compponent: Vehicle , isCard:true },
    { path: '/home/sysvehicleParts', compponent: SysVehiclePart , isCard:true },
    { path: '/home/syscomponent', compponent: SysComponents , isCard:true },
    { path: '/home/syspackagecomponent', compponent: SysPackageComponent , isCard:true},
    { path: '/home/syspackagebom', compponent: SysPackageBomComponent , isCard:true },
    { path: '/home/listsegment', compponent: SegmentVehicle , isCard:true},
    { path: '/home/sysvehiclebom', compponent: SysVehicleBom , isCard:true},
    { path: '/home/unitvehicles', compponent: Unitvehicle , isCard:true},
    { path: '/home/trademark', compponent: TradeMarkVehicle , isCard:true},
    { path: '/home/syspackagecomponent/package/:id', compponent: MapPackageComponent , isCard:true},
    { path: '/home/managefilesvg', compponent: ManageFileSVG , isCard:true},
    { path: '/home/accessorysave', compponent: ListAccessorySave , isCard:true},
    { path: '/home/listAccount', compponent: ManagerAccount , isCard:true},
    { path: '/home/pdfofcar', compponent: PDFOfCar , isCard:true},
    { path: '/home/ressearchaccesory', compponent: ResSearchAccesory, isFromSearch: true , isCard:true},
    { path: '/home/listunit', compponent: Listunit , isCard:true}
]

export { RoutePages }