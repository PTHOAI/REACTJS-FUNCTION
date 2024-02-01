const DataTable = {
    header: ['STT', 'Tên xe', 'Tên tiếng Việt','Tên tiếng Anh','Ngày tạo', 'Ghi chú', 'Điều chỉnh'],
    headerComponent: ['STT', 'Mã LK', 'Tên tiếng Anh','Tên tiếng Việt','ĐVT', 'Ghi chú', 'NCC','Ngày Tạo','Chức Năng'],
    headerComponent2: [ 'Mã LK', 'Tên tiếng Anh','Tên tiếng Việt','ĐVT', 'Ghi chú', 'Mã NCC','Từ Ngày','Đến Ngày'],
    headerPackageComponent: [ 'STT', 'Mã Cụm','Tên tiếng Việt','Tên tiếng Anh', 'ĐVT', 'Hình Ảnh','Mã Cụm Cha','Tên Cụm Cha','Ghi Chú','NCC','PDF','Ngày Tạo','Chức Năng'],
    headerPackageBom: [ 'STT', 'Mã Cụm','Tên Cụm','Mã LK', 'Tên LK', 'ĐVT','Số Lượng','Ghi Chú','Ngày Tạo','Chức Năng'],
    headerVehicleBom: [ 'STT', 'Mã Xe','Tên Xe','Mã Cụm', 'Tên Cụm', 'Bộ Phận Xe','Ghi Chú','Ngày Tạo','Chức Năng'],
    headerUnitVehicle: [ 'STT', 'Mã Đơn vị','Tên Đơn vị','Ngày Tạo','Chức Năng'],
    headerTradeMarkVehicle: [ 'STT', 'Mã thương hiệu','Tên thương hiệu','Đơn vị xe','Ngày Tạo','Chức Năng'],
    headerSegmentvehicle: [ 'STT', 'Mã phân khúc','Tên phân khúc','Thương hiệu','Ngày Tạo','Chức Năng'],
    item: [
        {VEH_CODE:'BT2116',VEHP_NAMEVIE:'KHUNG GẦM',VEHP_NAMEENG:'BARE CHASSIS', PICTURE: 'http://autoparts.thacochulai.vn/Uploads/images/TQ_KG_3A.jpg',  DATE:'22/12/2023', NOTE:''},
        {VEH_CODE:'BT2116',VEHP_NAMEVIE:'HỆ THỐNG ĐIỆN',VEHP_NAMEENG:'ELECTRIC SYSTEM', PICTURE: 'http://autoparts.thacochulai.vn/Uploads/images/BP_HE%20THONG%20DIEN_3A.jpg',  DATE:'22/12/2023', NOTE:''},
        {VEH_CODE:'BT2116',VEHP_NAMEVIE:'KẾT CẤU',VEHP_NAMEENG:'BODY', PICTURE: 'http://autoparts.thacochulai.vn/Uploads/images/BP_KET%20CAU_3A.jpg',  DATE:'22/12/2023', NOTE:''},
        {VEH_CODE:'BT2116',VEHP_NAMEVIE:'NỘI THẤT',VEHP_NAMEENG:'INTERIOR', PICTURE: 'http://autoparts.thacochulai.vn/Uploads/images/BP_NOI%20THAT_3A.jpg',  DATE:'22/12/2023', NOTE:''},
        {VEH_CODE:'BT2116',VEHP_NAMEVIE:'NGOẠI THẤT',VEHP_NAMEENG:'EXTERIOR', PICTURE: 'http://autoparts.thacochulai.vn/Uploads/images/BP_NGOAI%20THAT_3A.jpg',  DATE:'22/12/2023', NOTE:''},
        
      ]
}

export {DataTable};