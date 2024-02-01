import { PrismaService } from "prisma/prisma.service";
import { Prisma } from '@prisma/client';
import { BadRequestException, ExecutionContext, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
//import { UserSelect } from "./user.select";
import { request } from "http";
import { CurrentUser } from "src/decorator/currentUser.decorator";
import { ApiResponse } from "src/helper/ApiResponse";
import { v4 as uuidv4 } from 'uuid';
import { ComponentModel,PackageBomModel,PackagePositionModel } from "./component.model";
import { createComponentModelDto, createPackageBomModelDto, createPackageComponentModelDto, updateUserPackageBomModelDto } from "./component.dto";

@Injectable()
export class ComponentService {
  constructor(
    private readonly prismaService: PrismaService,
  ) { }

  async getListComponent (page: number, pageSize: number) : Promise<ApiResponse<ComponentModel[]>>{
    const skipCount = (page - 1) * pageSize;
    const listComponent = await this.prismaService.pAR_COMPONENTS.findMany({      
        skip: skipCount,
        take: pageSize,   
        include:{
          Units:true
        }
    }) 
    if (!listComponent) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Xe không tồn tại',
          data: null,
        };
      }
      const response: ApiResponse<ComponentModel[]> = {
        statusCode: HttpStatus.OK,
        message: 'Lấy thông tin xe thành công',
        data: listComponent,         
      }
    
      return response;
  }

  async getListSearchComponent (search: string, page: number, pageSize: number) : Promise<ApiResponse<ComponentModel[]>>{
    const skipCount = (page - 1) * pageSize;
    const listComponent = await this.prismaService.pAR_COMPONENTS.findMany({      
        skip: skipCount,
        take: pageSize,   
        where: {
          COM_CODE: {
            contains: search,
          },
        },
        include:{
          Units:true
        }
    }) 
    if (!listComponent) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Linh kiện không tồn tại',
          data: null,
        };
      }
      const response: ApiResponse<ComponentModel[]> = {
        statusCode: HttpStatus.OK,
        message: 'Lấy thông tin linh kiện thành công',
        data: listComponent,         
      }
    
      return response;
  }

 private async createItem(itemData: any): Promise<any> {
    let unitId;
    let listHased
    try {
      const existingUnit = await this.prismaService.sYS_UNITS.findFirst({
        where: {
          UNI_NAME: itemData[6],
        },
      });
  
      if (existingUnit) {
        unitId = existingUnit.UNI_ID;
      } else {
        console.log("unit,",unitId)
        throw new Error("UNIT không tồn tại.");
      }
      const existingComponent = await this.prismaService.pAR_COMPONENTS.findFirst({
        where: {
          COM_CODE: itemData[1].toString(),
        },
      });
  
      if (existingComponent) {
        listHased = itemData[1].toString();
        const result= await this.prismaService.pAR_COMPONENTS.update({
          where: {
            COM_ID: existingComponent.COM_ID,
          },
          data: {
            COM_NAME_EN: itemData[4],
            COM_NAME_VN: itemData[5],
            CREATE_DATE: new Date(),
            Units: {
              connect: {
                UNI_ID: unitId,
              },
            },
          },
        });
        return { ... result, listHased };
      } else {
        // Nếu COMPONENT chưa tồn tại, tạo mới COMPONENT
        const result = await this.prismaService.pAR_COMPONENTS.create({
          data: {
            COM_CODE: itemData[1].toString(),
            COM_NAME_EN: itemData[4],
            COM_NAME_VN: itemData[5],
            IS_DELETED: false,
            CREATE_DATE: new Date(),
            Units: {
              connect: {
                UNI_ID: unitId,
              },
            },
          },
        });
  
        return { ...result, listHased };
      }
      
    } catch (error) {
      // Xử lý lỗi
      console.error(error);
      throw new Error("Lỗi khi xử lý UNIT: " + error.message);
    }
  }
  
  
// TẠO LINH KIỆN
async createComponent(data: createComponentModelDto): Promise<ApiResponse<ComponentModel>> {
  if(!data.unit_id || !data.comCode){
   return {
      statusCode: HttpStatus.OK,
      message: 'Tạo linh kiện không thành công',
      data: null,
    };
  }
   const created = await this.prismaService.pAR_COMPONENTS.create({
    data:{
      COM_CODE: data.comCode,
      IS_DELETED:false,
      CREATE_DATE: new Date(),
      COM_NAME_VN: data.comNameVN,
      COM_NAME_EN: data.comNameEN,
      COM_UNIID:data.unit_id,
    }
  })
if(!created)
{
  const response: ApiResponse<ComponentModel> = {
    statusCode: HttpStatus.OK,
    message: 'Tạo linh kiện không thành công',
    data: null,
  };
  return response;
} 
  const response: ApiResponse<ComponentModel> = {
    statusCode: HttpStatus.OK,
    message: 'Tạo linh kiện thành công',
    data: created,
  };

  return response;
}
// TẠO DANH SÁCH LINH KIỆN
  async createListComponent(itemsData: any): Promise<ApiResponse<any>> {
    const createdItems: any = []; 
    for (const itemData of itemsData.slice(1)) {
      const createdItem = await this.createItem(itemData);
      createdItems.push(createdItem);
    }
  
    const response: ApiResponse<ComponentModel[]> = {
      statusCode: HttpStatus.OK,
      message: 'Lấy thông tin xe thành công',
      data: createdItems,
    };
  
    return response;
  }

  async deleteComponents(data: { componentIds: string[] }): Promise<ApiResponse<any>> {
    try {
      if (!data.componentIds || data.componentIds.length === 0) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Thiếu thông tin về componentIds trong yêu cầu.',
          data: null,
        };
      }
      const deleteResult = await this.prismaService.pAR_COMPONENTS.deleteMany({
        where: {
          COM_ID: {
            in: data.componentIds,
          },
        },
      });

      if (deleteResult.count > 0) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Linh kiện đã được xóa thành công.',
          data: deleteResult,
        };
      } else {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Không tìm thấy linh kiện để xóa.',
          data: null,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Lỗi khi xóa linh kiện.',
        data: null,
      };
    }
  }

  async deletePackageComponents(data: { componentIds: string[] }): Promise<ApiResponse<any>> {
    try {
      if (!data.componentIds || data.componentIds.length === 0) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Thiếu thông tin về componentIds trong yêu cầu.',
          data: null,
        };
      }
      const deleteResult = await this.prismaService.pAR_PACKAGE_POSITIONS.deleteMany({
        where: {
          PAG_ID: {
            in: data.componentIds,
          },
        },
      });

      if (deleteResult.count > 0) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Linh kiện đã được xóa thành công.',
          data: deleteResult,
        };
      } else {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Không tìm thấy linh kiện để xóa.',
          data: null,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Lỗi khi xóa linh kiện.',
        data: null,
      };
    }
  }
  
  async deleteVehicleBom(data: { vehicleBomIds: string[] }): Promise<ApiResponse<any>> {
    try {
      if (!data.vehicleBomIds || data.vehicleBomIds.length === 0) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Thiếu thông tin về componentIds trong yêu cầu.',
          data: null,
        };
      }
      const deleteResult = await this.prismaService.pAR_VEHICLE_BOMS.deleteMany({
        where: {
          VEB_ID: {
            in: data.vehicleBomIds,
          },
        },
      });

      if (deleteResult.count > 0) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Linh kiện đã được xóa thành công.',
          data: deleteResult,
        };
      } else {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Không tìm thấy linh kiện để xóa.',
          data: null,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Lỗi khi xóa linh kiện.',
        data: null,
      };
    }
  }
  async getListPackageComponent(page: number, pageSize: number): Promise<ApiResponse<PackagePositionModel[]>> {
    const skipCount = (page - 1) * pageSize;

    const listPackageComponent = await this.prismaService.pAR_PACKAGE_POSITIONS.findMany({
        skip: skipCount,
        take: pageSize,
        include: {
            Units: true,
        },
    });
    const list = await Promise.all(
      listPackageComponent.map(async (pKC) => {
          if (pKC.PAG_PAGID) {
              const parentPackages = await this.prismaService.pAR_PACKAGE_POSITIONS.findMany({
                  where: {
                      PAG_ID: pKC.PAG_PAGID,
                  },
              });
              const pagCodeFromParent = parentPackages.length > 0 ? parentPackages[0].PAG_CODE : null;
              const namePackageFromParent = parentPackages.length > 0 ? parentPackages[0].PAG_NAME_VN : null;
              return { ...pKC, pagCodeFromParent,namePackageFromParent  };
          }
          return pKC;
      })
  );
    if (!listPackageComponent || listPackageComponent.length === 0) {
        return {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Xe không tồn tại',
            data: null,
        };
    }
    const response: ApiResponse<PackagePositionModel[]> = {
        statusCode: HttpStatus.OK,
        message: 'Lấy thông tin xe thành công',
        data: list,
    };

    return response;
}

private async createItemParkageComponent(itemData: any): Promise<any> {
 
  let unitId;
  try {
    const existingUnit = await this.prismaService.sYS_UNITS.findFirst({
      where: {
        UNI_NAME: itemData[3],
      },
    });

    if (existingUnit) {
      unitId = existingUnit.UNI_ID;
    } else {
      throw new Error("UNIT không tồn tại.");
    }
    const existingComponent = await this.prismaService.pAR_PACKAGE_POSITIONS.findFirst({
      where: {
        PAG_CODE: itemData[0].toString(),
      },
    });
    const existingVehicle = await this.prismaService.sYS_VEHICLES.findFirst({
      where: {
        VEH_NAME: itemData[8].toString(),
      },
    });
    if(existingComponent && existingVehicle){
    return await this.prismaService.pAR_PACKAGE_POSITIONS.update({
        where: {
          PAG_ID: existingComponent.PAG_ID,
        },
        data: {
          PAG_CODE: itemData[0].toString(),
          PAG_NAME_EN: itemData[2],
          PAG_NAME_VN: itemData[1],
          CREATE_DATE: new Date(),
          PAG_IMAGE:'../Uploads/svg/'+itemData[4],
          Units: {
            connect: {
              UNI_ID: unitId,
            },
          },
        },
      });
    }
    const ParrentComponent = await this.prismaService.pAR_PACKAGE_POSITIONS.findFirst({
      where: {
        PAG_CODE: itemData[5].toString(),
      },
    });
    if (!ParrentComponent && existingUnit) {
      const vehicle = await this.prismaService.sYS_VEHICLES.findFirst({
            where:{
                VEH_CODE: itemData[5].toString(),
            },        
      })
      let partbom
      if(vehicle){
        const parts = await this.prismaService.sYS_VEHICLE_PART.findMany({
              where:{
              VEH_ID: vehicle.VEH_ID
              },
          })
          partbom= [...parts]
      }
      const partBom =  partbom.filter((item) => item.PART_NAME_VN === itemData[1])
      const packageCom = await this.prismaService.pAR_PACKAGE_POSITIONS.create({
        data: {
          PAG_CODE: itemData[0].toString(),
          PAG_NAME_EN: itemData[2],
          PAG_NAME_VN: itemData[1],
          IS_DELETED: false,
          CREATE_DATE: new Date(),
          PAG_IMAGE:'../Uploads/svg/'+itemData[4],
          Units: {
            connect: {
              UNI_ID: unitId,
            },
          },
        },
      });
      return await this.prismaService.pAR_VEHICLE_BOMS.create({
         data:{
            VEB_VEHID:existingVehicle.VEH_ID,
            IS_DELETED:false,
            VEB_PAGID:packageCom.PAG_ID,
            CREATE_DATE: new Date(),
            VEH_PART_ID:partBom[0].ID,
         }
      })
    }
    if (ParrentComponent && existingUnit) {
      const packageCom =  await this.prismaService.pAR_PACKAGE_POSITIONS.create({
        data: {
          PAG_CODE: itemData[0].toString(),  
          PAG_NAME_EN: itemData[2],
          PAG_NAME_VN: itemData[1],
          IS_DELETED: false,
          PAG_PAGID: ParrentComponent.PAG_ID,
          PAG_IMAGE:'../Uploads/svg/'+itemData[4],
          CREATE_DATE: new Date(),
          Units: {
            connect: {
              UNI_ID: unitId,
            },
          },
        },
      });
      return await this.prismaService.pAR_VEHICLE_BOMS.create({
        data:{
           VEB_VEHID:existingVehicle.VEH_ID,
           IS_DELETED:false,
           VEB_PAGID:packageCom.PAG_ID,
           CREATE_DATE: new Date(),
        }
     })
    } 
  } catch (error) {
    // Xử lý lỗi
    console.error(error);
    throw new Error("Lỗi khi xử lý UNIT: " + error.message);
  }
}

// TẠO CỤM LINH KIỆN 
async createPackageListComponent(itemsData: any): Promise<ApiResponse<any>> {
  if(!itemsData){
    const response: ApiResponse<ComponentModel[]> = {
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Tạo cụm khônh thành công',
      data: null,
    };
    return response
  }
  const createdItems: any = [];
  for (const itemData of itemsData.slice(1)) {
    const createdItem = await this.createItemParkageComponent(itemData);
    createdItems.push(createdItem);
  }
 
  const response: ApiResponse<ComponentModel[]> = {
    statusCode: HttpStatus.OK,
    message: 'Tạo cụm linh kiện thành công',
    data: createdItems,
  };

  return response;
}

 
// TẠO CỤM LINH KIỆN
async createPackageComponent(data: createPackageComponentModelDto): Promise<ApiResponse<PackagePositionModel>> {
  if(!data.unit_id ){
   return {
      statusCode: HttpStatus.OK,
      message: 'Tạo cụm linh kiện không thành công',
      data: null,
    };
  }
   const created = await this.prismaService.pAR_PACKAGE_POSITIONS.create({
    data:{
      IS_DELETED:false,
      CREATE_DATE: new Date(),
      PAG_CODE: data.comPkCode,
      PAG_NAME_EN: data.comPkNameEN,
      PAG_NAME_VN:data.comPkNameVN,
      PAG_PAGID:data.pkParent_id,
      PAG_UNIID:data.unit_id
    }
  })
if(!created)
{
  const response: ApiResponse<PackagePositionModel> = {
    statusCode: HttpStatus.OK,
    message: 'Tạo linh kiện không thành công',
    data: null,
  };
  return response;
} 
  const response: ApiResponse<PackagePositionModel> = {
    statusCode: HttpStatus.OK,
    message: 'Tạo linh kiện thành công',
    data: created,
  };

  return response;
}

// LẤY DANH SÁCH TÌM KIẾM CỤM LINH KIỆN
async getListSearchPackageComponent (search: string, page: number, pageSize: number) : Promise<ApiResponse<PackagePositionModel[]>>{
  const skipCount = (page - 1) * pageSize;
  const listPackageComponent = await this.prismaService.pAR_PACKAGE_POSITIONS.findMany({      
      skip: skipCount,
      take: pageSize,   
      where: {
        PAG_CODE: {
          contains: search,
        },
      },
      include:{
        Units:true
      }
  }) 
  const list = await Promise.all(
    listPackageComponent.map(async (pKC) => {
        if (pKC.PAG_PAGID) {
            const parentPackages = await this.prismaService.pAR_PACKAGE_POSITIONS.findMany({
                where: {
                    PAG_ID: pKC.PAG_PAGID,
                },
            });
            const pagCodeFromParent = parentPackages.length > 0 ? parentPackages[0].PAG_CODE : null;
            const namePackageFromParent = parentPackages.length > 0 ? parentPackages[0].PAG_NAME_VN : null;
            return { ...pKC, pagCodeFromParent,namePackageFromParent  };
        }
        return pKC;
    })
);
  if (!list) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Xe không tồn tại',
        data: null,
      };
    }
    const response: ApiResponse<PackagePositionModel[]> = {
      statusCode: HttpStatus.OK,
      message: 'Lấy thông tin xe thành công',
      data: list,         
    }
  
    return response;
} 

async getListPackageBomComponent(page: number, pageSize: number): Promise<ApiResponse<PackageBomModel[]>> {
  const skipCount = (page - 1) * pageSize;

  const listPackageBomComponent = await this.prismaService.pAR_PACKAGE_BOMS.findMany({
      skip: skipCount,
      take: pageSize,
  });
  const  totalItems = await this.prismaService.pAR_PACKAGE_BOMS.count()
  const list = await Promise.all(
    listPackageBomComponent.map(async (pKB) => {
        if (pKB.PAB_PAGID && pKB.PAB_COMID) {
            try {
                const packagePosition = await this.prismaService.pAR_PACKAGE_POSITIONS.findFirst({
                    where: {
                        PAG_ID: pKB.PAB_PAGID,
                    },
                });
                if (!packagePosition) {
                    return pKB; // Handle the case when packagePosition is not found
                }
                const unit = await this.prismaService.sYS_UNITS.findFirst({
                    where: {
                        UNI_ID: packagePosition.PAG_UNIID,
                    },
                });
                const component = await this.prismaService.pAR_COMPONENTS.findFirst({
                    where: {
                        COM_ID: pKB.PAB_COMID,
                    },
                });
                const pagCodePK = packagePosition.PAG_CODE || null;
                const namePackage = packagePosition.PAG_NAME_VN || null;
                const pagCodeCom =  component.COM_CODE || null;
                const nameCom = component.COM_NAME_VN || null;
                const nameUnit = unit.UNI_NAME || null;
                return { ...pKB, pagCodePK, namePackage, pagCodeCom, nameCom, nameUnit };
            } catch (error) {
                console.error(`Error processing package and component data: ${error.message}`);
                return pKB;
            }
        }
        return pKB;
    })
);

  if (!listPackageBomComponent || listPackageBomComponent.length === 0) {
      return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Bom cụm không tồn tại',
          data: null,
      };
  }
  const response: ApiResponse<any> = {
      statusCode: HttpStatus.OK,
      message: 'Lấy Bom cụm thành công',
      data: {
        list: list,
        totalItems: totalItems,
      },
  };

  return response;
}

// LẤY DANH SÁCH TÌM KIẾM CỤM BOM
async getListSearchPackageBomComponent (search: string, page: number, pageSize: number) : Promise<ApiResponse<PackageBomModel[]>>{
  const skipCount = (page - 1) * pageSize;
  const listComponent = await this.prismaService.pAR_PACKAGE_POSITIONS.findMany({      
      skip: skipCount,
      take: pageSize,   
      where: {
        OR: [
          {
            PAG_CODE: {
              contains: search,
            },
          },
          {
            PAG_NAME_VN: {
              contains: search,
            },
          },
        ],
      },
  }) 
  const pagIds = listComponent.map((component) => component.PAG_ID);
  const listPackageBomComponent = await this.prismaService.pAR_PACKAGE_BOMS.findMany({
    skip: skipCount,
    take: pageSize,
    where: {
      PAB_PAGID: {
        in: pagIds,
      },
    },
});
  const list = await Promise.all(
    listPackageBomComponent.map(async (pKB) => {
        if (pKB.PAB_PAGID && pKB.PAB_COMID) {
            try {
                const packagePosition = await this.prismaService.pAR_PACKAGE_POSITIONS.findFirst({
                    where: {
                        PAG_ID: pKB.PAB_PAGID,
                    },
                });
                if (!packagePosition) {
                    return pKB; // Handle the case when packagePosition is not found
                }
                const unit = await this.prismaService.sYS_UNITS.findFirst({
                    where: {
                        UNI_ID: packagePosition.PAG_UNIID,
                    },
                });
                const component = await this.prismaService.pAR_COMPONENTS.findFirst({
                    where: {
                        COM_ID: pKB.PAB_COMID,
                    },
                });
                const pagCodePK = packagePosition.PAG_CODE || null;
                const namePackage = packagePosition.PAG_NAME_VN || null;
                const pagCodeCom =  component.COM_CODE || null;
                const nameCom = component.COM_NAME_VN || null;
                const nameUnit = unit.UNI_NAME || null;
                return { ...pKB, pagCodePK, namePackage, pagCodeCom, nameCom, nameUnit };
            } catch (error) {
                console.error(`Error processing package and component data: ${error.message}`);
                return pKB;
            }
        }
        return pKB;
    })
);
  if (!list) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Xe không tồn tại',
        data: null,
      };
    }
    const response: ApiResponse<PackageBomModel[]> = {
      statusCode: HttpStatus.OK,
      message: 'Lấy thông tin xe thành công',
      data: list,         
    }
  
    return response;
} 

private async createItemParkageBom(itemData: any): Promise<any> {
  let pagId;
  try {
    const existingPK = await this.prismaService.pAR_PACKAGE_POSITIONS.findFirst({
      where: {
        PAG_CODE: itemData[0].toString(),
      },
    });

    if (existingPK) {
      pagId = existingPK.PAG_ID;
    } else {
      throw new Error("cụm không tồn tại.");
    }

    const existingComponent = await this.prismaService.pAR_COMPONENTS.findFirst({
      where: {
        COM_CODE: itemData[2].toString(),
      },
    });
    const checkBom = await this.prismaService.pAR_PACKAGE_BOMS.findFirst({
      where: {
        AND: [
          {
            PAB_PAGID: existingPK.PAG_ID,
          },
          {
            PAB_COMID: existingComponent.COM_ID,
          },
        ],
      },
    });
    if (checkBom ) {
      return await this.prismaService.pAR_PACKAGE_BOMS.update({
        where: {
          PAB_ID: checkBom.PAB_ID,
        },
        data: {
          PAB_PAGID: existingPK.PAG_ID,
          PAB_COMID: existingComponent.COM_ID,
          PAG_QUATITY: itemData[5].toString(),
          CREATE_DATE: new Date(),
        },
      });
    }
    return await this.prismaService.pAR_PACKAGE_BOMS.create({
      data: {
        PAB_PAGID: existingPK.PAG_ID,
        PAB_COMID: existingComponent.COM_ID,
        PAG_QUATITY: itemData[5].toString(),
        CREATE_DATE: new Date(),
        IS_DELETED:false
      },
    });
  } catch (error) {
    console.error(`Error processing package and component data: ${error.message}`);
  }
}

// TẠO DANH SÁCH BOM CỤM
async createPackageBomList(itemsData: any): Promise<ApiResponse<any>> {
  const createdItems: any = [];
  for (const itemData of itemsData.slice(1)) {
  const createdItem = await this.createItemParkageBom(itemData);
   createdItems.push(createdItem);
  }
 
  const response: ApiResponse<any[]> = {
    statusCode: HttpStatus.OK,
    message: 'Tạo Bom Cụm thành công',
    data: createdItems,
  };

  return response;
}

// TẠO BOM CỤM 
async createPackageBom(data: createPackageBomModelDto): Promise<ApiResponse<PackageBomModel>> {
  if(!data.com_id || !data.pkCom_id ){
   return {
      statusCode: HttpStatus.OK,
      message: 'Tạo bom xe không thành công',
      data: null,
    };
  }
   const created = await this.prismaService.pAR_PACKAGE_BOMS.create({
    data:{
      IS_DELETED: false,
      PAB_COMID: data.com_id,
      PAB_PAGID: data.pkCom_id,
      PAG_QUATITY: data.quality,
      PAB_NOTE: data.decription,
      CREATE_DATE:new Date(),
    }
  })
if(!created)
{
  const response: ApiResponse<PackageBomModel> = {
    statusCode: HttpStatus.OK,
    message: 'Tạo bom xe không thành công',
    data: null,
  };
  return response;
} 
  const response: ApiResponse<PackageBomModel> = {
    statusCode: HttpStatus.OK,
    message: 'Tạo bom xe thành công',
    data: created,
  };

  return response;
}

// UPLOAD FILE CHO CỤM LINH KIỆN 
async UploadFileSvg(files: any): Promise<ApiResponse<any>> {
  const fs = require('fs');
  const uploadPromises = [];
  for (const file of files) {
    const uploadPromise = new Promise((resolve, reject) =>  {
      const filePath = 'uploads/svgs/' + file.originalname; // Thay đổi đường dẫn lưu trữ nếu cần
      fs.writeFile(filePath, file.buffer, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve({ filename: file.originalname, filePath });
        }
      });
    });
    uploadPromises.push(uploadPromise);
  }
  try {
    const results = await Promise.all(uploadPromises);
    const response: ApiResponse<any[]> = {
      statusCode: HttpStatus.OK,
      message: 'Upload file thành công',
      data: results,
    };
    return response
  } catch (error) {
    console.error(`Error processing package and component data: ${error.message}`);
  }  
}
async getMapBomComponent(id: string): Promise<ApiResponse<any>> {
  try {
    const pkComponent = await this.prismaService.pAR_PACKAGE_POSITIONS.findFirst({
      where: {
        PAG_ID: id,
      },
    });
    const pKBoms = await this.prismaService.pAR_PACKAGE_BOMS.findMany({
      where: {
        PAB_PAGID: pkComponent.PAG_ID,
      },
    });
    const lists = await Promise.all(pKBoms.map(async (bom) => {
      const com = await this.prismaService.pAR_COMPONENTS.findFirst({
        where: {
          COM_ID: bom.PAB_COMID,
        },
      });

      // Chắc chắn rằng bạn trả về giá trị phù hợp
      return { ...bom, com };
    }));

    const response: ApiResponse<any> = {
      statusCode: HttpStatus.OK,
      message: 'lấy thông tin thành công',
      data: {...pkComponent,lists}, // Sửa từ list thành lists
    };

    return response;
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error('Error in getMapBomComponent:', error);
    throw new Error('Error in getMapBomComponent');
  }
}

async getUnitComponent(): Promise<ApiResponse<any>> {
    const listUnitCom = await this.prismaService.sYS_UNITS.findMany({})
    const response: ApiResponse<any> = {
      statusCode: HttpStatus.OK,
      message: 'lấy thông tin thành công',
      data: listUnitCom 
    };
    return response
}

async getALLPkCom(): Promise<ApiResponse<any>> {
  const listPkCom = await this.prismaService.pAR_PACKAGE_POSITIONS.findMany({})
  const response: ApiResponse<any> = {
    statusCode: HttpStatus.OK,
    message: 'lấy thông tin thành công',
    data: listPkCom 
  };
  return response
}

async getALLCom(): Promise<ApiResponse<any>> {
  const listCom = await this.prismaService.pAR_COMPONENTS.findMany({})
  const response: ApiResponse<any> = {
    statusCode: HttpStatus.OK,
    message: 'lấy thông tin thành công',
    data: listCom 
  };
  return response
}

async getDetailCom(id : string ) : Promise<ApiResponse<ComponentModel>>{
  const detailCom = await this.prismaService.pAR_COMPONENTS.findUnique({
    where:{
      COM_ID:id
    },  
    include:{
      Units:true
    }
  })

  if (!detailCom) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'lấy không thành công',
        data: null,
      };
    }
    const response: ApiResponse<any> = {
      statusCode: HttpStatus.OK,
      message: 'lấy thành công',
      data: {...detailCom},
        
    }
    return response;
}


async getDetailPKCom(id : string ) : Promise<ApiResponse<PackagePositionModel>>{
  let ParentPKcom;
  const detailCom = await this.prismaService.pAR_PACKAGE_POSITIONS.findUnique({
    where:{
      PAG_ID:id
    },  
    include:{
      Units:true
    }
  })
  if(detailCom.PAG_PAGID){
   ParentPKcom = await this.prismaService.pAR_PACKAGE_POSITIONS.findUnique({
    where:{
      PAG_ID:detailCom.PAG_PAGID
    },  
  })
}

  if (!detailCom) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'lấy không thành công',
        data: null,
      };
    }
    const response: ApiResponse<any> = {
      statusCode: HttpStatus.OK,
      message: 'lấy thành công',
      data: {...detailCom,ParentPKcom},
        
    }
    return response;
}
async getDetailBOMpk(id : string ) : Promise<ApiResponse<PackageBomModel>>{
  let PKcom;
  let Com;
  const detailBOM = await this.prismaService.pAR_PACKAGE_BOMS.findUnique({
    where:{
      PAB_ID:id
    },  
   
  })
  if(detailBOM.PAB_PAGID){
    PKcom = await this.prismaService.pAR_PACKAGE_POSITIONS.findUnique({
     where:{
       PAG_ID:detailBOM.PAB_PAGID
     },  
   })
  if(detailBOM.PAB_COMID){
   Com = await this.prismaService.pAR_COMPONENTS.findUnique({
    where:{
      COM_ID:detailBOM.PAB_COMID
    },  
  })
}
  if (!detailBOM) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'lấy không thành công',
        data: null,
      };
    }
    const response: ApiResponse<any> = {
      statusCode: HttpStatus.OK,
      message: 'lấy thành công',
      data: {...detailBOM,PKcom,Com},
        
    }
    return response;
}
}

async getDetailBOMVehicle(id : string ) : Promise<ApiResponse<any>>{
  let PKcom;
  const detailBOM = await this.prismaService.pAR_VEHICLE_BOMS.findUnique({
    where:{
      VEB_ID:id
    },  
    include:{
      Vehicle:true,
    }  
  })
  if(detailBOM.VEB_PAGID){
    PKcom = await this.prismaService.pAR_PACKAGE_POSITIONS.findUnique({
     where:{
       PAG_ID:detailBOM.VEB_PAGID
     },  
   })

  if (!detailBOM) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'lấy không thành công',
        data: null,
      };
    }
    const response: ApiResponse<any> = {
      statusCode: HttpStatus.OK,
      message: 'lấy thành công',
      data: {...detailBOM,PKcom},
        
    }
    return response;
}
}

async updateComponent(id : string,data: createComponentModelDto ) : Promise<ApiResponse<any>>{
  if(!id){
    return {
    statusCode: HttpStatus.NOT_FOUND,
    message: 'không tìm thấy ID',
    data: null,
  };
}
const updateCom = await  this.prismaService.pAR_COMPONENTS.update({
  where:{
    COM_ID:id,
  },
  data:{  
      COM_CODE: data.comCode,
      IS_DELETED:false,
     // CREATE_DATE: new Date(),
      COM_NAME_VN: data.comNameVN,
      COM_NAME_EN: data.comNameEN,
      COM_UNIID:data.unit_id,
  }
})

if (!updateCom) {
  return {
    statusCode: HttpStatus.NOT_FOUND,
    message: 'cập nhập không thành công',
    data: null,
  };
}
const response: ApiResponse<any> = {
  statusCode: HttpStatus.OK,
  message: 'cập nhập thành công',
  data: updateCom,
    
}
return response
}
async updatePkCOM(id : string,data: createPackageComponentModelDto ) : Promise<ApiResponse<any>>{
  if(!id){
    return {
    statusCode: HttpStatus.NOT_FOUND,
    message: 'không tìm thấy ID',
    data: null,
  };
}
const updatePkCom = await  this.prismaService.pAR_PACKAGE_POSITIONS.update({
  where:{
    PAG_ID:id,
  },
  data:{  
    IS_DELETED:false,
    PAG_CODE: data.comPkCode,
    PAG_NAME_EN: data.comPkNameEN,
    PAG_NAME_VN:data.comPkNameVN,
    PAG_PAGID:data.pkParent_id,
    PAG_UNIID:data.unit_id
  }
})

if (!updatePkCom) {
  return {
    statusCode: HttpStatus.NOT_FOUND,
    message: 'cập nhập không thành công',
    data: null,
  };
}
const response: ApiResponse<any> = {
  statusCode: HttpStatus.OK,
  message: 'cập nhập thành công',
  data: updatePkCom,
    
}
return response;

}

async updateBOMPk(id : string,data: createPackageBomModelDto ) : Promise<ApiResponse<any>>{
  if(!id){
    return {
    statusCode: HttpStatus.NOT_FOUND,
    message: 'không tìm thấy ID',
    data: null,
  };
}
const updatePkCom = await  this.prismaService.pAR_PACKAGE_BOMS.update({
  where:{
    PAB_ID:id,
  },
  data:{  
    IS_DELETED: false,
    PAB_COMID: data.com_id,
    PAB_PAGID: data.pkCom_id,
    PAG_QUATITY: data.quality,
    PAB_NOTE: data.decription,
  }
})

if (!updatePkCom) {
  return {
    statusCode: HttpStatus.NOT_FOUND,
    message: 'cập nhập không thành công',
    data: null,
  };
}
const response: ApiResponse<any> = {
  statusCode: HttpStatus.OK,
  message: 'cập nhập thành công',
  data: updatePkCom,
    
}
return response;

}
async saveParts(data: any, currentUser: any): Promise<ApiResponse<any>> {
  if (!data || data.length === 0) {
    return {
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Không tìm thấy dữ liệu',
      data: null,
    };
  }
  const results = [];
  for (const item of data) {
    if (!item) {
      continue;
    }

    const savePart = await this.prismaService.uSER_PACKAGE_BOMS.create({
      data: {
        IS_DELETED: false,
        PAB_ID: item.PAB_ID,
        USER_ID: currentUser.Id,
        QUANTITY: Number(item.quantity),
        NOTE:item.note,
        CREATED_BY: currentUser.Id,
        CREATED_DATE: new Date(),
      },
    });

    if (!savePart) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Cập nhật không thành công cho một số đối tượng',
        data: null,
      };
    }

    results.push(savePart);
  }

  const response: ApiResponse<any> = {
    statusCode: HttpStatus.OK,
    message: 'Cập nhật thành công cho tất cả các đối tượng',
    data: results,
  };

  return response;
}

async getAllSaveParts(page:number,pageSize:number,currentUser: any): Promise<ApiResponse<any>> {
  try{
    const totalItems =  await this.prismaService.uSER_PACKAGE_BOMS.count({  
      where:{
        USER_ID:currentUser.Id
      }
      })
     const skipCount = (page - 1) * pageSize;
      const listSavePart = await this.prismaService.uSER_PACKAGE_BOMS.findMany({
          skip: skipCount,
          take: pageSize,  
          where:{
            USER_ID:currentUser.Id
          }
      })
      const lists = await Promise.all(listSavePart.map(async (bom) => {
        const pKBOM = await this.prismaService.pAR_PACKAGE_BOMS.findFirst({
          
          where: {
            PAB_ID: bom.PAB_ID,
          },
        });
        const COM = await this.prismaService.pAR_COMPONENTS.findFirst({
          where: {
            COM_ID: pKBOM.PAB_COMID,
          },
        });
        const PkCOM = await this.prismaService.pAR_PACKAGE_POSITIONS.findFirst({
          where: {
            PAG_ID: pKBOM.PAB_PAGID,
          },
        });
        const vehicle = await this.prismaService.pAR_VEHICLE_BOMS.findFirst({
          where: {
            VEB_PAGID: PkCOM.PAG_ID,
          },
          include:{
            Vehicle:true
          }
        });

        return { ...bom, COM,PkCOM,vehicle };
      }));
      const response: ApiResponse<any> = {
        statusCode: HttpStatus.OK,
        message: 'lấy linh kiện lưu trữ thành công',
        data: {
          list: lists,
          totalItems: totalItems,
        },
      };
    
      return response;

  }catch(err){

  }
}

async getSearchAllSaveParts(search:string,fromDate:Date,toDate:Date,page:number,pageSize:number,currentUser: any): Promise<ApiResponse<any>> {
  try{
    const from = new Date(fromDate);
    const to = new Date(toDate);
    const totalItems =  await this.prismaService.uSER_PACKAGE_BOMS.count({  
      where:{
        USER_ID:currentUser.Id
      }
      })
      
     const skipCount = (page - 1) * pageSize;
      const listSavePart = await this.prismaService.uSER_PACKAGE_BOMS.findMany({
          skip: skipCount,
          take: pageSize,  
          where:{
            USER_ID:currentUser.Id,
            CREATED_DATE: {
              gte: from,
              lte: to,
            },          
          }
      })
      const lists = await Promise.all(listSavePart.map(async (bom) => {
        const pKBOM = await this.prismaService.pAR_PACKAGE_BOMS.findFirst({
          
          where: {
            PAB_ID: bom.PAB_ID,
          },
        });
        const COM = await this.prismaService.pAR_COMPONENTS.findFirst({
          where: {
            COM_ID: pKBOM.PAB_COMID,
          },
        });
        const PkCOM = await this.prismaService.pAR_PACKAGE_POSITIONS.findFirst({
          where: {
            PAG_ID: pKBOM.PAB_PAGID,
          },
        });
        const vehicle = await this.prismaService.pAR_VEHICLE_BOMS.findFirst({
          where: {
            VEB_PAGID: PkCOM.PAG_ID,
          },
          include:{
            Vehicle:true
          }
        });

        return { ...bom, COM,PkCOM,vehicle };
      }));
      const response: ApiResponse<any> = {
        statusCode: HttpStatus.OK,
        message: 'lấy linh kiện lưu trữ thành công',
        data: {
          list: lists,
          totalItems: totalItems,
        },
      };
    
      return response;

  }catch(err){

  }
}

async getDetailAllSaveParts(id:string,currentUser: any): Promise<ApiResponse<any>> {
  try{
    const detailSavePart = await this.prismaService.uSER_PACKAGE_BOMS.findFirst({
      where:{
        ID:id,
        USER_ID:currentUser.Id,
      }
    })
    const response: ApiResponse<any> = {
      statusCode: HttpStatus.OK,
      message: 'lấy chi tiết linh kiện lưu trữ thành công',
      data: detailSavePart
    };
  
    return response;

  }catch(err){

  }
}

async updateSaveParts(id:string,data: updateUserPackageBomModelDto,currentUser: any): Promise<ApiResponse<any>> {
  
  try{
    if(!id || !data){
      const response: ApiResponse<any> = {
        statusCode: HttpStatus.OK,
        message: 'Cập Nhập không thành công',
        data: null
      };
    
      return response;
    }
    const detailSavePart = await this.prismaService.uSER_PACKAGE_BOMS.update({
      where:{
        ID:id,
      },
      data:{  
        QUANTITY: data.quantity,
        IS_DELETED:false,
        NOTE:data.note
    }
    })
    const response: ApiResponse<any> = {
      statusCode: HttpStatus.OK,
      message: 'Cập Nhập thành công',
      data: detailSavePart
    };
  
    return response;

  }catch(err){

  }
}

async getSumSaveParts(currentUser: any): Promise<ApiResponse<any>> {
  try{
      const listSavePart = await this.prismaService.uSER_PACKAGE_BOMS.findMany({
          where:{
            USER_ID:currentUser.Id
          }
      })
      const SUM = listSavePart.length
      const response: ApiResponse<any> = {
        statusCode: HttpStatus.OK,
        message: 'lấy linh kiện lưu trữ thành công',
        data: SUM
      };
    
      return response;
  }catch(err){

  }
}
  
}