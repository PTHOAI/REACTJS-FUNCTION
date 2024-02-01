import { PrismaService } from "prisma/prisma.service";
import { Prisma } from '@prisma/client';
import { BadRequestException, ExecutionContext, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
//import { UserSelect } from "./user.select";
import { request } from "http";
import { CurrentUser } from "src/decorator/currentUser.decorator";
import { ApiResponse } from "src/helper/ApiResponse";
import { Department_Model, SegmentModel, VehicleBomsModel, VehicleBoomModel, VehicleModel, VehiclePartsModel, Vehicle_Model_Model } from "./vehicle.model";
import { SegMentModelDto, TradeMarkDto, VehicleBomDto, VehicleModelDto, createCarModelDto, createCarPartModelDto } from "./vehicle.dto";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class VehicleService {
  getUserFromContext(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    return request.user;
  }
  constructor(
    private readonly prismaService: PrismaService,
  ) { }

  async getVehicle (id:string) : Promise<ApiResponse<Vehicle_Model_Model>>{
    const vehicle = await this.prismaService.sYS_VEHICLE_MODELS.findFirst({
            where:{VEM_ID:id },
            include:{
              Vehicles:true,
            }
            
    }) 
    if (!vehicle) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Xe không tồn tại',
          data: null,
        };
      }
      const response: ApiResponse<Vehicle_Model_Model> = {
        statusCode: HttpStatus.OK,
        message: 'Lấy thông tin xe thành công',
        data: vehicle,
          
      }
    
      return response;
  }
     // lấy thương hiệu theo id đơn vị xe
  async getTrademark (id:string) : Promise<ApiResponse<Vehicle_Model_Model[]>>{
    const departmens = await this.prismaService.sYS_VEHICLE_MODELS.findMany({
      where:{ DEPARTMENT_ID:id}
    }) 
    if (!departmens) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Xe không tồn tại',
          data: null,
        };
      }
      const response: ApiResponse<Vehicle_Model_Model[]> = {
        statusCode: HttpStatus.OK,
        message: 'Lấy  thương hiệu  thành công',
        data: departmens,
          
      }
    
      return response;
  }

  // async createGroupVehicle (id:string) : Promise<ApiResponse<Department_Model>>{
  //   const departmens = await this.prismaService.dEPARTMENTs.create({
  //    data:{

  //    }
  //   }) 
  //   if (!departmens) {
  //       return {
  //         statusCode: HttpStatus.NOT_FOUND,
  //         message: 'Xe không tồn tại',
  //         data: null,
  //       };
  //     }
  //     const response: ApiResponse<Department_Model> = {
  //       statusCode: HttpStatus.OK,
  //       message: 'Lấy  thương hiệu  thành công',
  //       data: departmens,
          
  //     }
    
  //     return response;
  // }
 // láy đơn vị xe
  async dePartMent () : Promise<ApiResponse<Department_Model[]>>{
    const departmens = await this.prismaService.dEPARTMENTs.findMany({
      include:{
        VehicleModels:true
      }
    }) 
    if (!departmens) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Xe không tồn tại',
          data: null,
        };
      }
      const response: ApiResponse<Department_Model[]> = {
        statusCode: HttpStatus.OK,
        message: 'Lấy thông thương hiệu  thành công',
        data: departmens,
          
      }
    
      return response;
  }

  async getlistCar (id:string) : Promise<ApiResponse<VehicleModel[]>>{
    const listCar = await this.prismaService.sYS_VEHICLES.findMany() 
    if (!listCar) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Xe không tồn tại',
          data: null,
        };
      }
      const response: ApiResponse<VehicleModel[]> = {
        statusCode: HttpStatus.OK,
        message: 'Lấy thông tin  thành công',
        data: listCar,
          
      }
    
      return response;
  }

  async getPartsCar (id:string) : Promise<ApiResponse<VehiclePartsModel[]>>{
    const partsCar = await this.prismaService.sYS_VEHICLE_PART.findMany({
      where:{
        VEH_ID:id
      }
    }) 
    if (!partsCar) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Xe không tồn tại',
          data: null,
        };
      }
      const response: ApiResponse<VehiclePartsModel[]> = {
        statusCode: HttpStatus.OK,
        message: 'Lấy thông tin  thành công',
        data: partsCar,
          
      }
    
      return response;
  }


  async getTrademarkbyId (id:string) : Promise<ApiResponse<Department_Model>>{
    const vehicle = await this.prismaService.dEPARTMENTs.findFirst({
            where:{ID:id },
            include:{
              VehicleModels:{
                include:{
                  Vehicles:{
                    include:{
                      ParVehicleBoms:true,
                    }
                  }
                }
              }
            }
            
    }) 
    if (!vehicle) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Xe không tồn tại',
          data: null,
        };
      }
      const response: ApiResponse<Department_Model> = {
        statusCode: HttpStatus.OK,
        message: 'Lấy thông tin xe thành công',
        data: vehicle,
          
      }
    
      return response;
  }
  async createTradeMark(data : VehicleModelDto ) : Promise<ApiResponse<Department_Model>>{
    const createTradeMark = await this.prismaService.dEPARTMENTs.create({
      data:{
        ID:uuidv4(),
        CODE:data.code,
        NAME_VN :data.name_vn,
        NAME_EN: data.name_en,
        IS_DELETED : false,

      }

    })
    if (!createTradeMark) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'đơn vị xe không tạo được',
          data: null,
        };
      }
      const response: ApiResponse<Department_Model> = {
        statusCode: HttpStatus.OK,
        message: 'Thêm thành công',
        data: createTradeMark,
          
      }
    
      return response;
  }

  async createGroupCar(data : TradeMarkDto ) : Promise<ApiResponse<Vehicle_Model_Model>>{
    const createGroupCar = await this.prismaService.sYS_VEHICLE_MODELS.create({
      data:{
        VEM_CODE:data.vem_code,
        VEM_NAME :data.vem_name,
        IS_DELETED : false,
        DEPARTMENT_ID: data.department_id,
        CREATE_DATE:new Date()
      }

    })
    if (!createGroupCar) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'đơn vị xe không tạo được',
          data: null,
        };
      }
      const response: ApiResponse<Vehicle_Model_Model> = {
        statusCode: HttpStatus.OK,
        message: 'Thêm thành công',
        data: createGroupCar,
          
      }
    
      return response;
  }

  async getDetailTradeMark(id : string ) : Promise<ApiResponse<Vehicle_Model_Model>>{
    const detailTradeMark = await this.prismaService.sYS_VEHICLE_MODELS.findUnique({
      where:{
        VEM_ID:id
      },

    })
    if (!detailTradeMark) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'lấy không thành công',
          data: null,
        };
      }
      const response: ApiResponse<Vehicle_Model_Model> = {
        statusCode: HttpStatus.OK,
        message: 'lấy thành công',
        data: detailTradeMark,
          
      }
    
      return response;
  }

  async getDetailPart(id : string ) : Promise<ApiResponse<VehiclePartsModel>>{
    const detailPart = await this.prismaService.sYS_VEHICLE_PART.findUnique({
      where:{
        ID:id
      },
      
    })
    const vehicle = await this.prismaService.sYS_VEHICLES.findUnique({
      where:{
        VEH_ID:detailPart.VEH_ID
      }, 
    })
    if (!detailPart) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'lấy không thành công',
          data: null,
        };
      }
      const response: ApiResponse<any> = {
        statusCode: HttpStatus.OK,
        message: 'lấy thành công',
        data: {...detailPart,vehicle},
          
      }
      return response;
  }

  async getDetailVehicle(id : string ) : Promise<ApiResponse<VehicleModel>>{
    const detailVehicle = await this.prismaService.sYS_VEHICLES.findUnique({
      where:{
        VEH_ID:id
        
      },
      include:{
        VehicleModel:{
          include:{
            Departments:true
          }
        },
        Segment:true,  
      }

    })
    if (!detailVehicle) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'lấy không thành công',
          data: null,
        };
      }
      const response: ApiResponse<VehicleModel> = {
        statusCode: HttpStatus.OK,
        message: 'lấy thành công',
        data: detailVehicle,
          
      }
    
      return response;
  }

  async getListVehicleBom(id : string ) : Promise<ApiResponse<any>>{
    const listVehicleBom = await this.prismaService.pAR_VEHICLE_BOMS.findMany({
      where:{
        VEH_PART_ID: id
      }
    })
    if (!listVehicleBom) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'lấy không thành công',
          data: null,
        };
      }
      const response: ApiResponse<any> = {
        statusCode: HttpStatus.OK,
        message: 'lấy thành công',
        data: listVehicleBom,      
      }
      return response;
  }
 
async getChild(id: string): Promise<ApiResponse<any>> {
  const childBComs = await this.prismaService.pAR_PACKAGE_BOMS.findMany({
    where: { PAB_PAGID: id },
  });
  const comPK = await this.prismaService.pAR_PACKAGE_POSITIONS.findFirst({
    where: { PAG_ID: id },
    });
  const filteredChildBComs = childBComs.filter((com) => com.PAB_COMID !== null);
  const childComs = await Promise.all(
    filteredChildBComs.map(async (com) => {
      const components = await this.prismaService.pAR_COMPONENTS.findMany({
        where: { COM_ID: com.PAB_COMID },
      });
      const componentsWithSVG = components.map((component) => ({
        ...component,
        SVG_ELEMENT_ID: com.SVG_ELEMENT_ID,
        PAG_ID:comPK.PAG_ID,
        PAG_IMAGE:comPK.PAG_IMAGE,
        PAG_CODE:comPK.PAG_CODE,
        PAB_ID:com.PAB_ID
      }));
      return componentsWithSVG;
    })
  );
  const flattenedChildComs = childComs.flat();

  const childs = await Promise.all(
    flattenedChildComs.map(async (child) => {
      const components = await this.prismaService.pAR_PACKAGE_POSITIONS.findMany({
        where: { PAG_CODE: child.COM_CODE },
      });
      const componentsWithSVG = components.map((component) => ({
        ...component,
        PAG_IMAGE:component.PAG_IMAGE,
        PAG_ID:component.PAG_ID
      }));
  
      const childWithComponents = {
        ...child,
        HAS_CHILD: components.length > 0,
        COMPONENTS: componentsWithSVG, // Sử dụng tên thuộc tính mới, ví dụ: COMPONENTS
      };
  
      return childWithComponents;
    })
  );

  if (!childComs || !childBComs) {
    return {
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Xe không tồn tại',
      data: null,
    };
  }

  const response: ApiResponse<any> = {
    statusCode: HttpStatus.OK,
    message: 'Lấy thông tin xe thành công',
    data: childs.flat(),
  };

  return response;
}

async getListCar( ) : Promise<ApiResponse<VehicleModel[]>>{
  const listCar = await this.prismaService.sYS_VEHICLES.findMany({
    include:{
     VehicleModel:{
      include:{
        Departments:true
      }
     },
     Segment:true
    }
   })

  if (!listCar) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'lấy không thành công',
        data: null,
      };
    }
    const response: ApiResponse<VehicleModel[]> = {
      statusCode: HttpStatus.OK,
      message: 'lấy thành công',
      data: listCar,
        
    }
  
    return response;
}
// LÁY DANH SÁCH 
async getListGroupCar( ) : Promise<ApiResponse<Vehicle_Model_Model[]>>{
  const listCar = await this.prismaService.sYS_VEHICLE_MODELS.findMany({
    include:{
     Departments:true
    }
   })

  if (!listCar) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'lấy không thành công',
        data: null,
      };
    }
    const response: ApiResponse<Vehicle_Model_Model[]> = {
      statusCode: HttpStatus.OK,
      message: 'lấy thành công',
      data: listCar,
        
    }
  
    return response;
}

// TẠO PHÂN KHÚC XE
async createSegMent(data : SegMentModelDto ) : Promise<ApiResponse<SegmentModel>>{
  const createSegMent = await this.prismaService.sEGMENT.create({
    data:{
      ID_SEGMENT:uuidv4(),
      NAME_VN :data.name_vn,
      CREATED_DATE : new Date().toISOString(),
      SEG_CODE: data.segCode,
      ID_SYS_VEHICLE_MODEL:data.trademarkId
    }

  })
  if (!createSegMent) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'đơn vị xe không tạo được',
        data: null,
      };
    }
    const response: ApiResponse<SegmentModel> = {
      statusCode: HttpStatus.OK,
      message: 'Thêm thành công',
      data: createSegMent,
        
    }
  
    return response;
}

async getListSegment(id:string) : Promise<ApiResponse<SegmentModel[]>>{
  try{
  const listSegment = await this.prismaService.sEGMENT.findMany({
    where:{ID_SYS_VEHICLE_MODEL:id}
  })

  if (!listSegment) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'lấy không thành công',
        data: null,
      };
    }
    const response: ApiResponse<SegmentModel[]> = {
      statusCode: HttpStatus.OK,
      message: 'lấy thành công',
      data: listSegment,
        
    }
  
    return response;
  }catch(e){
    console.log("eee",e)
  }
}
// LẤY DANH SÁCH XE THEO MẢNG ID
async getListCarofSegment(idsData: { selectedIds: string[] }) : Promise<ApiResponse<VehicleModel[]>>{
  try{
  const listSegment = await this.prismaService.sYS_VEHICLES.findMany({
    where: {
      ID_SEGMENT: {
        in: idsData.selectedIds,
      },
    },
  })

  if (!listSegment || listSegment.length === 0) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'lấy không thành công',
        data: null,
      };
    }
    const response: ApiResponse<VehicleModel[]> = {
      statusCode: HttpStatus.OK,
      message: 'lấy thành công',
      data: listSegment,
        
    }
  
    return response;
  }catch(e){
    console.log("eee",e)
  }
}

// LẤY DANH SÁCH THƯƠNG HIỆU THEO ID ĐƠN VỊ XE
async getListTradeMarkOfGroup(id: string) : Promise<ApiResponse<Vehicle_Model_Model[]>>{
  try{
  const listSegment = await this.prismaService.sYS_VEHICLE_MODELS.findMany({
    where: {
      DEPARTMENT_ID:id
    },
  })

  if (!listSegment || listSegment.length === 0) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'lấy không thành công',
        data: null,
      };
    }
    const response: ApiResponse<Vehicle_Model_Model[]> = {
      statusCode: HttpStatus.OK,
      message: 'lấy thành công',
      data: listSegment,
        
    }
  
    return response;
  }catch(e){
    console.log("eee",e)
  }
}

// LẤY DANH SÁCH THƯƠNG HIỆU THEO ID ĐƠN VỊ XE
async getListSegmentOfTrade(id: string) : Promise<ApiResponse<SegmentModel[]>>{
  try{
  const listSegment = await this.prismaService.sEGMENT.findMany({
    where: {
      ID_SYS_VEHICLE_MODEL:id
    },
  })

  if (!listSegment || listSegment.length === 0) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'lấy không thành công',
        data: null,
      };
    }
    const response: ApiResponse<SegmentModel[]> = {
      statusCode: HttpStatus.OK,
      message: 'lấy thành công',
      data: listSegment,
        
    }
  
    return response;
  }catch(e){
    console.log("eee",e)
  }
}
// LẤY DANH SÁCH THƯƠNG HIỆU XE
async getListTradeMark( ) : Promise<ApiResponse<Vehicle_Model_Model[]>>{
  try{
  const listTradeMark = await this.prismaService.sYS_VEHICLE_MODELS.findMany({
    include:{
      Departments:true
    }
   })

  if (!listTradeMark || listTradeMark.length === 0) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'lấy không thành công',
        data: null,
      };
    }
    const response: ApiResponse<Vehicle_Model_Model[]> = {
      statusCode: HttpStatus.OK,
      message: 'lấy thành công',
      data:listTradeMark,
        
    }
  
    return response;
  }catch(e){
    console.log("eee",e)
  }
}

// LẤY DANH SÁCH THƯƠNG HIỆU XE
async getListSegMent( ) : Promise<ApiResponse<SegmentModel[]>>{
  try{
  const listSegment = await this.prismaService.sEGMENT.findMany({
  
   })
   if (listSegment.length === 0) {
    console.log('Không tìm thấy Segment');
    return;
  }

  // Lặp qua từng Segment để lấy thông tin SYS_VEHICLE_MODELS
  const segmentsWithVehicleModels = await Promise.all(
    listSegment.map(async (segment) => {
      const sysVehicleModels = await this.prismaService.sYS_VEHICLE_MODELS.findFirst({
        where: {
          VEM_ID: segment.ID_SYS_VEHICLE_MODEL, // Thay thế bằng trường tương ứng trong SYS_VEHICLE_MODELS
        },
        
      });

      return {
        ...segment,
        SYS_VEHICLE_MODELS: sysVehicleModels,
      };
    })
  );
  if (!listSegment || listSegment.length === 0) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'lấy không thành công',
        data: null,
      };
    }
    const response: ApiResponse<SegmentModel[]> = {
      statusCode: HttpStatus.OK,
      message: 'lấy thành công',
      data:segmentsWithVehicleModels,
        
    }
  
    return response;
  }catch(e){
    console.log("eee",e)
  }
}

async getDetailSegMent(id: string): Promise<ApiResponse<SegmentModel>> {
  try {
    const segment = await this.prismaService.sEGMENT.findFirst({
      where: { ID_SEGMENT: id },
    });

    if (!segment) {
      console.log('Không tìm thấy Segment');
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Lấy không thành công - Không tìm thấy Segment',
        data: null,
      };
    }

    const tradeMark = await this.prismaService.sYS_VEHICLE_MODELS.findFirst({
      where: { VEM_ID: segment.ID_SYS_VEHICLE_MODEL },
      include: {
        Departments: true,
      },
    });

    const response: ApiResponse<any> = {
      statusCode: HttpStatus.OK,
      message: 'Lấy thành công',
      data: { ...segment, tradeMark },
    };

    return response;
  } catch (e) {
    console.log('Error:', e);
    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Lấy thông tin Segment gặp lỗi',
      data: null,
    };
  }
}

async getListVehicleParts(page: number, pageSize: number): Promise<ApiResponse<VehiclePartsModel[]>> {
  try {
    const skipCount = (page - 1) * pageSize;
    const listVehicleParts = await this.prismaService.sYS_VEHICLE_PART.findMany({
      skip: skipCount,
      take: pageSize,
      
    });
    const lists = await Promise.all(listVehicleParts.map(async (part) => {
      const vehicle = await this.prismaService.sYS_VEHICLES.findFirst({
        where: {
          VEH_ID: part.VEH_ID,
        },
      });
      return { ...part, vehicle };
    }));
    if (!lists || lists.length === 0) {
     
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Không tìm thấy bất kỳ phần tử nào',
        data: null,
      };
    }
 
    const response: ApiResponse<VehiclePartsModel[]> = {
      statusCode: HttpStatus.OK,
      message: 'Lấy thành công',
      data: lists,
    };

    return response;
  } catch (e) {
    console.error('Lỗi khi lấy danh sách các bộ phận xe', e);
    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Đã xảy ra lỗi khi xử lý yêu cầu',
      data: null,
    };
  }
}

async getListVehicle(): Promise<ApiResponse<VehicleModel[]>> {
  try {
    const listVehicle = await this.prismaService.sYS_VEHICLES.findMany({
    });
    if (!listVehicle || listVehicle.length === 0) {
     
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Không tìm thấy bất kỳ phần tử nào',
        data: null,
      };
    }
 
    const response: ApiResponse<VehicleModel[]> = {
      statusCode: HttpStatus.OK,
      message: 'Lấy thành công',
      data: listVehicle,
    };

    return response;
  } catch (e) {
    console.error('Lỗi khi lấy danh sách  xe', e);
    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Đã xảy ra lỗi khi xử lý yêu cầu',
      data: null,
    };
  }
}

async createCar(files :any ,args : createCarModelDto) : Promise<ApiResponse<VehicleModel>>{
  const fs = require('fs');
  let pictureFileName, pdfCatalogFileName, pdfInstructionFileName, pdfMaintenanceFileName;
  if (files['picture'] &&files['picture'][0]) {
    const picture = files['picture'][0];
    pictureFileName = picture.originalname;
    const filePathPdfCatalog = 'uploads/others/' + picture.originalname;
    await fs.writeFileSync(filePathPdfCatalog, picture.buffer);
  }
  if (files['pdfCatalog'] && files['pdfCatalog'][0]) {
    const pdfCatalog = files['pdfCatalog'][0];
    pdfCatalogFileName = pdfCatalog.originalname;
    const filePathPdfCatalog = 'uploads/pdfs/' + pdfCatalog.originalname;
    await fs.writeFileSync(filePathPdfCatalog, pdfCatalog.buffer);
  }
 
  if (files['pdfInstruction'] && files['pdfInstruction'][0]) {
    const pdfInstruction = files['pdfInstruction'][0];
    pdfInstructionFileName = pdfInstruction.originalname;
    const filePathPdfInstruction = 'uploads/pdfs/' + pdfInstruction.originalname;
    await fs.writeFileSync(filePathPdfInstruction, pdfInstruction.buffer);
  }
 
  if (files['pdfMaintenance'] && files['pdfMaintenance'][0]) {
    const pdfMaintenance = files['pdfCatalog'][0];
    pdfMaintenanceFileName = pdfMaintenance.originalname;
    const filePathPdfMaintenance = 'uploads/pdfs/' + pdfMaintenance.originalname;
    await fs.writeFileSync(filePathPdfMaintenance,pdfMaintenance.buffer);
  }
  const createVehicle = await  this.prismaService.sYS_VEHICLES.create({
    data:{
      VEH_ID: uuidv4(),
      VEH_NAME: args.nameCar,
      VEH_CODE: args.codeCar,
      VEH_VEMID: args.trademarkId,
      IS_DELETED: false,
      PICTURE: pictureFileName,
      PDF_CATALOG: pdfCatalogFileName,
      PDF_INSTRUCTION: pdfInstructionFileName,
      PDF_MAINTENANCE: pdfMaintenanceFileName,
      IS_ACTIVE: false,
      DEPARTMENT_ID: args.groupId,
      ID_SEGMENT: args.segmentId,
      CREATE_DATE: new Date() 
    }
  })

  if (!createVehicle) {
    return {
      statusCode: HttpStatus.NOT_FOUND,
      message: 'lấy không thành công',
      data: null,
    };
  }
  const response: ApiResponse<any> = {
    statusCode: HttpStatus.OK,
    message: 'lấy thành công',
    data: createVehicle,
      
  }
  return response
}

async updateCar(id :string, files :any ,args : createCarModelDto) : Promise<ApiResponse<VehicleModel>>{
  const fs = require('fs');
  let pictureFileName, pdfCatalogFileName, pdfInstructionFileName, pdfMaintenanceFileName;
  if (files['picture'] &&files['picture'][0]) {
    const picture = files['picture'][0];
    pictureFileName = picture.originalname;
    const filePathPdfCatalog = 'uploads/others/' + picture.originalname;
    await fs.writeFileSync(filePathPdfCatalog, picture.buffer);
  }
  if (files['pdfCatalog'] && files['pdfCatalog'][0]) {
    const pdfCatalog = files['pdfCatalog'][0];
    pdfCatalogFileName = pdfCatalog.originalname;
    const filePathPdfCatalog = 'uploads/pdfs/' + pdfCatalog.originalname;
    await fs.writeFileSync(filePathPdfCatalog, pdfCatalog.buffer);
  }
 
  if (files['pdfInstruction'] && files['pdfInstruction'][0]) {
    const pdfInstruction = files['pdfInstruction'][0];
    pdfInstructionFileName = pdfInstruction.originalname;
    const filePathPdfInstruction = 'uploads/pdfs/' + pdfInstruction.originalname;
    await fs.writeFileSync(filePathPdfInstruction, pdfInstruction.buffer);
  }
 
  if (files['pdfMaintenance'] && files['pdfMaintenance'][0]) {
    const pdfMaintenance = files['pdfCatalog'][0];
    pdfMaintenanceFileName = pdfMaintenance.originalname;
    const filePathPdfMaintenance = 'uploads/pdfs/' + pdfMaintenance.originalname;
    await fs.writeFileSync(filePathPdfMaintenance,pdfMaintenance.buffer);
  }
  const updateVehicle = await  this.prismaService.sYS_VEHICLES.update({
    where:{
      VEH_ID:id,
    },
    data:{
      VEH_NAME: args.nameCar,
      VEH_CODE: args.codeCar,
      VEH_VEMID: args.trademarkId,
      IS_DELETED: false,
      PICTURE: pictureFileName,
      PDF_CATALOG: pdfCatalogFileName,
      PDF_INSTRUCTION: pdfInstructionFileName,
      PDF_MAINTENANCE: pdfMaintenanceFileName,
      IS_ACTIVE: false,
      DEPARTMENT_ID: args.groupId,
      ID_SEGMENT: args.segmentId,
      CREATE_DATE: new Date() 
    }
  })

  if (!updateVehicle) {
    return {
      statusCode: HttpStatus.NOT_FOUND,
      message: 'lấy không thành công',
      data: null,
    };
  }
  const response: ApiResponse<any> = {
    statusCode: HttpStatus.OK,
    message: 'lấy thành công',
    data: updateVehicle,
      
  }
  return response
}

async createCarPart(args : createCarPartModelDto,currentUser:any) : Promise<ApiResponse<VehiclePartsModel>>{
  const createCarPart = await  this.prismaService.sYS_VEHICLE_PART.create({
    data:{
      ID: uuidv4(),
      PART_NAME_EN:args.partNameEN,
      PART_NAME_VN: args.partNameVN,
      VEH_ID: args.idCar,
      IS_DELETED:false,
      CREATED_BY:currentUser.Id,
      CREATED_DATE: new Date() 
    }
  })

  if (!createCarPart) {
    return {
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Tạo không thành công',
      data: null,
    };
  }
  const response: ApiResponse<VehiclePartsModel> = {
    statusCode: HttpStatus.OK,
    message: 'Tạo bộ phận thành công',
    data: createCarPart,
      
  }
  return response
}

async getVehicleBoms(page: number, pageSize: number): Promise<ApiResponse<VehicleBomsModel[]>> {
  try {
    const skipCount = (page - 1) * pageSize;
    const listVehicleBoms = await this.prismaService.pAR_VEHICLE_BOMS.findMany({
      skip: skipCount,
      take: pageSize,
      include:{
        Vehicle:true,
      },
    });
    const lists = await Promise.all(listVehicleBoms.map(async (bom) => {
      const pkCom = await this.prismaService.pAR_PACKAGE_POSITIONS.findFirst({
        where: {
          PAG_ID: bom.VEB_PAGID,
        },
        select: {
          PAG_CODE: true,
          PAG_NAME_VN:true,
        },
      });
      let part = null;
      if (bom.VEH_PART_ID !== null && bom.VEH_PART_ID !== undefined) {
        part = await this.prismaService.sYS_VEHICLE_PART.findFirst({
          where:{
            ID: bom.VEH_PART_ID
          },
          select: {
            PART_NAME_VN: true,
          },
        });
      }

      return { ...bom, ...pkCom,...part };
    }));

    if (!lists || lists.length === 0) { 
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Không tìm thấy bất kỳ phần tử nào',
        data: null,
      };
    }
    const response: ApiResponse<VehicleBomsModel[]> = {
      statusCode: HttpStatus.OK,
      message: 'Lấy thành công',
      data: lists,
    };
    return response;
  } catch (e) {
    console.error('Lỗi khi lấy danh sách Bom xe', e);
    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Đã xảy ra lỗi khi xử lý yêu cầu',
      data: null,
    };
  }
}

async getSearchVehicleBoms(search: string, page: number, pageSize: number): Promise<ApiResponse<VehicleBomsModel[]>> {
  try {
    const skipCount = (page - 1) * pageSize;
    const searchPackage = await this.prismaService.pAR_PACKAGE_POSITIONS.findMany({
     where:{
        PAG_CODE:{
          contains: search,
      },
     }
    });
    const listSearchs = searchPackage.map((search)=> search.PAG_ID )
    const listVehicleBoms = await this.prismaService.pAR_VEHICLE_BOMS.findMany({
      skip: skipCount,
      take: pageSize,
      where:{
        VEB_PAGID:{
          in:listSearchs
        }
      },
      include:{
        Vehicle:true,
      }
    });
    const lists = await Promise.all(listVehicleBoms.map(async (bom) => {
      const pkCom = await this.prismaService.pAR_PACKAGE_POSITIONS.findFirst({
        where: {
          PAG_ID: bom.VEB_PAGID,
        },
      });
      return { ...bom, pkCom };
    }));

    if (!lists || lists.length === 0) { 
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Không tìm thấy bất kỳ phần tử nào',
        data: null,
      };
    }
    const response: ApiResponse<VehicleBomsModel[]> = {
      statusCode: HttpStatus.OK,
      message: 'Lấy thành công',
      data: lists,
    };
    return response;
  } catch (e) {
    console.error('Lỗi khi lấy danh sách Bom xe', e);
    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Đã xảy ra lỗi khi xử lý yêu cầu',
      data: null,
    };
  }
}
// TẠO BOM XE
async createVehicleBom(data : VehicleBomDto ) : Promise<ApiResponse<VehicleBomsModel>>{
  const createVehicleBom = await this.prismaService.pAR_VEHICLE_BOMS.create({
    data:{
      VEB_VEHID:data.idVehicle,
      VEB_PAGID:data.idPackage,
      VEH_PART_ID:data.idPart,
      IS_DELETED:false
    }

  })
  if (!createVehicleBom) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Bom xe không tạo được',
        data: null,
      };
    }
    const response: ApiResponse<VehicleBomsModel> = {
      statusCode: HttpStatus.OK,
      message: 'Thêm thành công',
      data: createVehicleBom,
        
    }
  
    return response;
}

async deleteUnitVehicles(data: { unitCarIds: string[] }): Promise<ApiResponse<any>> {
  try {
    if (!data.unitCarIds || data.unitCarIds.length === 0) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Thiếu thông tin về componentIds trong yêu cầu.',
        data: null,
      };
    }
    const deleteResult = await this.prismaService.dEPARTMENTs.deleteMany({
      where: {
        ID: {
          in: data.unitCarIds,
        },
      },
    });

    if (deleteResult.count > 0) {
      return {
        statusCode: HttpStatus.OK,
        message: 'Đơn vị Xe đã được xóa thành công.',
        data: deleteResult,
      };
    } else {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Đơn vị xe Không tìm thấy linh kiện để xóa.',
        data: null,
      };
    }
  } catch (error) {
    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Lỗi khi xóa đơn vị xe.',
      data: null,
    };
  }
}

async deleteTradeMarkVehicles(data: { tradeMarkCarIds: string[] }): Promise<ApiResponse<any>> {
  try {
    if (!data.tradeMarkCarIds || data.tradeMarkCarIds.length === 0) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Thiếu thông tin về componentIds trong yêu cầu.',
        data: null,
      };
    }
    const deleteResult = await this.prismaService.sYS_VEHICLE_MODELS.deleteMany({
      where: {
        VEM_ID: {
          in: data.tradeMarkCarIds,
        },
      },
    });

    if (deleteResult.count > 0) {
      return {
        statusCode: HttpStatus.OK,
        message: 'Thương hiệu Xe đã được xóa thành công.',
        data: deleteResult,
      };
    } else {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Không tìm thấy thương hiệu xe để xóa.',
        data: null,
      };
    }
  } catch (error) {
    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Lỗi khi xóa thương hiệu xe.',
      data: null,
    };
  }
}

async deleteSegmentVehicles(data: { SegmentCarIds: string[] }): Promise<ApiResponse<any>> {
  try {
    if (!data.SegmentCarIds || data.SegmentCarIds.length === 0) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Thiếu thông tin về componentIds trong yêu cầu.',
        data: null,
      };
    }
    const deleteResult = await this.prismaService.sEGMENT.deleteMany({
      where: {
        ID_SEGMENT: {
          in: data.SegmentCarIds,
        },
      },
    });

    if (deleteResult.count > 0) {
      return {
        statusCode: HttpStatus.OK,
        message: 'Thương hiệu Xe đã được xóa thành công.',
        data: deleteResult,
      };
    } else {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Không tìm thấy thương hiệu xe để xóa.',
        data: null,
      };
    }
  } catch (error) {
    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Lỗi khi xóa thương hiệu xe.',
      data: null,
    };
  }
}

async deleteVehicles(data: { vehicleIds: string[] }): Promise<ApiResponse<any>> {
  try {
    if (!data.vehicleIds || data.vehicleIds.length === 0) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Thiếu thông tin về componentIds trong yêu cầu.',
        data: null,
      };
    }
    const deleteResult = await this.prismaService.sYS_VEHICLES.deleteMany({
      where: {
        VEH_ID: {
          in: data.vehicleIds,
        },
      },
    });

    if (deleteResult.count > 0) {
      return {
        statusCode: HttpStatus.OK,
        message: 'Thương hiệu Xe đã được xóa thành công.',
        data: deleteResult,
      };
    } else {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Không tìm thấy thương hiệu xe để xóa.',
        data: null,
      };
    }
  } catch (error) {
    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Lỗi khi xóa thương hiệu xe.',
      data: null,
    };
  }
}

async deletePackageBom(data: { packageBomIds: string[] }): Promise<ApiResponse<any>> {
  try {
    if (!data.packageBomIds || data.packageBomIds.length === 0) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Thiếu thông tin về componentIds trong yêu cầu.',
        data: null,
      };
    }
    const deleteResult = await this.prismaService.pAR_PACKAGE_BOMS.deleteMany({
      where: {
        PAB_ID: {
          in: data.packageBomIds,
        },
      },
    });

    if (deleteResult.count > 0) {
      return {
        statusCode: HttpStatus.OK,
        message: 'Thương hiệu Xe đã được xóa thành công.',
        data: deleteResult,
      };
    } else {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Không tìm thấy thương hiệu xe để xóa.',
        data: null,
      };
    }
  } catch (error) {
    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Lỗi khi xóa thương hiệu xe.',
      data: null,
    };
  }
}
async getdetailTradeMark(id : string ) : Promise<ApiResponse<Vehicle_Model_Model>>{
  const detailTradeMark = await this.prismaService.sYS_VEHICLE_MODELS.findUnique({
    where:{
      VEM_ID:id
    },
    include:{
      Departments:true
    }

  })
  if (!detailTradeMark) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'lấy không thành công',
        data: null,
      };
    }
    const response: ApiResponse<Vehicle_Model_Model> = {
      statusCode: HttpStatus.OK,
      message: 'lấy thành công',
      data: detailTradeMark,
        
    }
  
    return response;
}
async updateUnitvehicle(id :string ,args : VehicleModelDto) : Promise<ApiResponse<Department_Model>>{
  if(!id){
      return {
      statusCode: HttpStatus.NOT_FOUND,
      message: 'không tìm thấy ID',
      data: null,
    };
  }
  const updateUnitVehicle = await  this.prismaService.dEPARTMENTs.update({
    where:{
      ID:id,
    },
    data:{  
      CODE: args.code,
      NAME_VN: args.name_vn,
      NAME_EN:args.name_en,
      IS_DELETED: false,
      CREATED_DATE: new Date(),
    }
  })

  if (!updateUnitVehicle) {
    return {
      statusCode: HttpStatus.NOT_FOUND,
      message: 'cập nhập không thành công',
      data: null,
    };
  }
  const response: ApiResponse<any> = {
    statusCode: HttpStatus.OK,
    message: 'cập nhập thành công',
    data: updateUnitVehicle,
      
  }
  return response

}
async getALLPart(id:string): Promise<ApiResponse<any>> {
  const listPkpart = await this.prismaService.sYS_VEHICLE_PART.findMany({
    where:{
      VEH_ID:id
    }
  })
  const response: ApiResponse<any> = {
    statusCode: HttpStatus.OK,
    message: 'lấy thông tin thành công',
    data: listPkpart
  };
  return response
}
}

function striptags(email: string): string | Prisma.StringFieldUpdateOperationsInput {
  throw new Error("Function not implemented.");
}