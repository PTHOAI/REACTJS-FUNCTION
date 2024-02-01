import { Body, Controller, Delete, Get, InternalServerErrorException, Param, Post, Put, Query, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/decorator/currentUser.decorator';
import { ApiResponse } from 'src/helper/ApiResponse';
import { ComponentModel, PackageBomModel, PackagePositionModel } from './component.model';
import { ComponentService } from './component.service';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/guard/user.guard';
import { createComponentModelDto, createPackageBomModelDto, createPackageComponentModelDto, updateUserPackageBomModelDto } from './component.dto';

@ApiTags("Component Module")
@Controller('component')
export class ComponentController {
  constructor(private readonly componentService: ComponentService) { }
  @Get('getlistcomponent')
  // @UseGuards(AuthGuard)
   @ApiOperation({ summary: 'get detail vehicle' })
   async getListComponent(@Query('page') page: number ,@Query('pageSize') pageSize: number,@CurrentUser() currentUser): Promise<ApiResponse<ComponentModel[]>> {
       try {     
               return this.componentService.getListComponent(page,pageSize);
       } catch (error) {
           console.error(error);
           console.log(error);
       }
   }

   // TẠO DANH SÁCH LINH KIỆN 
   @Post('createlistcomponent')
   // @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'create List Component' })
    async createListComponent(@Body() args: any,@CurrentUser() currentUser): Promise<ApiResponse<ComponentModel[]>> {
        try {   
            const nonEmptyArrays = args.filter((arr) => arr.length > 0);
                return this.componentService.createListComponent(nonEmptyArrays);
        } catch (error) {
            console.error(error);
            console.log(error);
        }
    }
        // TẠO DANH SÁCH BOM CỤM LINH KIỆN 
        @Post('createComponent')
        // @UseGuards(AuthGuard)
         @ApiOperation({ summary: 'create Component' })
         async createComponent(@Body() args: createComponentModelDto, @CurrentUser() currentUser): Promise<ApiResponse<ComponentModel>> {
             try {    
                     return this.componentService.createComponent(args);
             } catch (error) {
                 console.error(error);
                 console.log(error);
             }      
        }

    // TÌM KIẾM LINH KIỆN 
    @Get('getlistsearchcomponent')
    // @UseGuards(AuthGuard)
     @ApiOperation({ summary: 'get list search component' })
     async getListSearchComponent(@Query('search') search: string, @Query('page') page: number ,@Query('pageSize') pageSize: number,@CurrentUser() currentUser): Promise<ApiResponse<ComponentModel[]>> {
         try {     
                 return this.componentService.getListSearchComponent(search,page,pageSize);
         } catch (error) {
             console.error(error);
             console.log(error);
         }
     }

     // XÓA LIST DANH SÁCH LINH KIỆN
     @Delete('deletelistcomponent')
     // @UseGuards(AuthGuard)
     @ApiOperation({ summary: 'get detail vehicle' })
      async deleteListComponent(@Body('data') data: { componentIds: string[] },@CurrentUser() currentUser): Promise<ApiResponse<ComponentModel[]>> {
          try {     
                  return this.componentService.deleteComponents(data);
          } catch (error) {
              console.error(error);
              console.log(error);
          }
      }
  
      // LẤY DANH SÁCH CỤM LINH KIỆN
       @Get('getlistpackagecomponent')
      // @UseGuards(AuthGuard)
       @ApiOperation({ summary: 'get list package component' })
       async getListPackageComponent(@Query('page') page: number ,@Query('pageSize') pageSize: number,@CurrentUser() currentUser): Promise<ApiResponse<PackagePositionModel[]>> {
           try {     
                   return this.componentService.getListPackageComponent(page,pageSize);
           } catch (error) {
               console.error(error);
               console.log(error);
           }
       }
    
    // TẠO DANH SÁCH CỤM LINH KIỆN 
        @Post('createlistpackagecomponent')
       // @UseGuards(AuthGuard)
        @ApiOperation({ summary: 'create List Component' })
        async createListPackageComponent(@Body() args: any,@CurrentUser() currentUser): Promise<ApiResponse<PackagePositionModel[]>> {
            try {   
                
                const nonEmptyArrays = args.filter((arr) => arr.length > 0);
                    return this.componentService.createPackageListComponent(nonEmptyArrays);
            } catch (error) {
                console.error(error);
                console.log(error);
            }
    }

    
        // TẠO CỤM LINH KIỆN 
        @Post('createPackageComponent')
        // @UseGuards(AuthGuard)
         @ApiOperation({ summary: 'create Package Component' })
         async createPackageCom(@Body() args: createPackageComponentModelDto,@CurrentUser() currentUser): Promise<ApiResponse<PackagePositionModel>> {
             try {    
                     return this.componentService.createPackageComponent(args);
             } catch (error) {
                 console.error(error);
                 console.log(error);
             }      
        }


    // TÌM KIẾM LINH KIỆN 
    @Get('getlistsearchpackagecomponent')
    // @UseGuards(AuthGuard)
     @ApiOperation({ summary: 'get list search package component' })
     async getListSearchPackageComponent(@Query('search') search: string, @Query('page') page: number ,@Query('pageSize') pageSize: number,@CurrentUser() currentUser): Promise<ApiResponse<PackagePositionModel[]>> {
         try {     
                 return this.componentService.getListSearchPackageComponent(search,page,pageSize);
         } catch (error) {
             console.error(error);
             console.log(error);
         }
     }

     // XÓA DANH SÁCH CỤM LINH KIỆN
     @Delete('deletelistpackagecomponent')
     // @UseGuards(AuthGuard)
     @ApiOperation({ summary: 'get detail vehicle' })
      async deleteListPackageComponent(@Body('data') data: { componentIds: string[] },@CurrentUser() currentUser): Promise<ApiResponse<PackagePositionModel[]>> {
          try {     
                  return this.componentService.deletePackageComponents(data);
          } catch (error) {
              console.error(error);
              console.log(error);
          }
      }

       // XÓA DANH SÁCH BOM XE
     @Delete('deleteVehicleBom')
     // @UseGuards(AuthGuard)
     @ApiOperation({ summary: 'get detail vehicle' })
      async deleteVehicleBom(@Body('data') data: { vehicleBomIds: string[] },@CurrentUser() currentUser): Promise<ApiResponse<PackagePositionModel[]>> {
          try {     
                  return this.componentService.deleteVehicleBom(data);
          } catch (error) {
              console.error(error);
              console.log(error);
          }
      }

      // LẤY DANH SÁCH CỤM LINH KIỆN
      @Get('getlistpackagebomcomponent')
      // @UseGuards(AuthGuard)
       @ApiOperation({ summary: 'get list package Bom component' })
       async getListPackageBomComponent(@Query('page') page: number ,@Query('pageSize') pageSize: number,@CurrentUser() currentUser): Promise<ApiResponse<PackageBomModel[]>> {
           try {     
                   return this.componentService.getListPackageBomComponent(page,pageSize);
           } catch (error) {
               console.error(error);
               console.log(error);
           }
       }

    // TÌM KIẾM BOM CỤM
    @Get('getlistsearchpackagebomcomponent')
    // @UseGuards(AuthGuard)
     @ApiOperation({ summary: 'get list search component' })
     async getListSearchPackageBomComponent(@Query('search') search: string, @Query('page') page: number ,@Query('pageSize') pageSize: number,@CurrentUser() currentUser): Promise<ApiResponse<PackageBomModel[]>> {
         try {     
                 return this.componentService.getListSearchPackageBomComponent(search,page,pageSize);
         } catch (error) {
             console.error(error);
             console.log(error);
         }
     }

       // TẠO DANH SÁCH BOM CỤM LINH KIỆN 
    @Post('createlistpackagebom')
    // @UseGuards(AuthGuard)
     @ApiOperation({ summary: 'create List package Bom' })
     async createListPackageBom(@Body() args: any,@CurrentUser() currentUser): Promise<ApiResponse<PackageBomModel[]>> {
         try {    
             const nonEmptyArrays = args.filter((arr:any) => arr.length > 0);
                 return this.componentService.createPackageBomList(nonEmptyArrays);
         } catch (error) {
             console.error(error);
             console.log(error);
         }      
    }
      // TẠO BOM CỤM 
      @Post('createPackageBom')
      // @UseGuards(AuthGuard)
       @ApiOperation({ summary: 'create Package Bom' })
       async createPackageBom(@Body() args: createPackageBomModelDto,@CurrentUser() currentUser): Promise<ApiResponse<PackageBomModel>> {
           try {    
                   return this.componentService.createPackageBom(args);
           } catch (error) {
               console.error(error);
               console.log(error);
           }      
      }

    // THÊM FILE SVG
    @Post('uploadsvg')
    @UseInterceptors(FilesInterceptor('files'))
     async uploadMultipleFiles(@UploadedFiles() files: any) {
        try {
            const result = await this.componentService.UploadFileSvg(files);
            return result;
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Internal Server Error'); // Điều chỉnh thông báo lỗi và mã trạng thái nếu cần
        }
    }
    // MAP SVG 
    @Get('mappackage/:id')
    @ApiOperation({ summary: 'map cụm linh kiện' })
     async mapPackageComponent(@Param('id') id : string): Promise<ApiResponse<any>> {
        try {
            const result = await this.componentService.getMapBomComponent(id);
            return result;
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Internal Server Error'); // Điều chỉnh thông báo lỗi và mã trạng thái nếu cần
        }

    }

    // LẤY DANH SÁCH ĐƠN VỊ LINH KIỆN
    @Get('getAllunitComs')
    @ApiOperation({ summary: 'lấy danh sách đơn vị linh kiện' })
     async getUnitComs() : Promise<ApiResponse<any>> {
        try {
            const result = await this.componentService.getUnitComponent();
            return result;
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Internal Server Error'); // Điều chỉnh thông báo lỗi và mã trạng thái nếu cần
        }

    }
    // LẤY DANH SÁCH CỤM LINH KIỆN
    @Get('getAllPKCom')
    @ApiOperation({ summary: 'lấy danh sách cụm linh kiện' })
     async getAllPkCom() : Promise<ApiResponse<any>> {
        try {
            const result = await this.componentService.getALLPkCom();
            return result;
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Internal Server Error'); // Điều chỉnh thông báo lỗi và mã trạng thái nếu cần
        }

    }

     // LẤY DANH SÁCH LINH KIỆN
     @Get('getAllCom')
     @ApiOperation({ summary: 'lấy danh sách cụm linh kiện' })
      async getAllCom() : Promise<ApiResponse<any>> {
         try {
             const result = await this.componentService.getALLCom();
             return result;
         } catch (error) {
             console.error(error);
             throw new InternalServerErrorException('Internal Server Error'); // Điều chỉnh thông báo lỗi và mã trạng thái nếu cần
         }
 
     }
     // LẤY CHI TIẾT LINH KIỆN
     @Get('detailComponent/:id')
     @ApiOperation({ summary: 'get detail Component' })
     async getdetailCom(@Param('id') id:string): Promise<ApiResponse<ComponentModel>> {
         try {
             const result = await this.componentService.getDetailCom(id);
             return result;
         } catch (error) {
             console.error(error);
             throw new InternalServerErrorException('Internal Server Error'); // Điều chỉnh thông báo lỗi và mã trạng thái nếu cần
         }
     }

       // LẤY CHI TIẾT CỤM LINH KIỆN
       @Get('detailPKComponent/:id')
       @ApiOperation({ summary: 'get detail Component' })
       async getdetailPKCom(@Param('id') id:string): Promise<ApiResponse<PackagePositionModel>> {
           try {
               const result = await this.componentService.getDetailPKCom(id);
               return result;
           } catch (error) {
               console.error(error);
               throw new InternalServerErrorException('Internal Server Error'); // Điều chỉnh thông báo lỗi và mã trạng thái nếu cần
           }
       }

         // LẤY CHI TIẾT BOM CỤM
         @Get('detailBOMpk/:id')
         @ApiOperation({ summary: 'get detail Component' })
         async getdetailBOMPK(@Param('id') id:string): Promise<ApiResponse<PackageBomModel>> {
             try {
                 const result = await this.componentService.getDetailBOMpk(id);
                 return result;
             } catch (error) {
                 console.error(error);
                 throw new InternalServerErrorException('Internal Server Error'); // Điều chỉnh thông báo lỗi và mã trạng thái nếu cần
             }
         }

           // LẤY CHI TIẾT BOM XE
           @Get('detailBOMVehicle/:id')
           @ApiOperation({ summary: 'get detail Bom Vehicle' })
           async getdetailBOMVehicle(@Param('id') id:string): Promise<ApiResponse<any>> {
               try {
                   const result = await this.componentService. getDetailBOMVehicle(id);
                   return result;
               } catch (error) {
                   console.error(error);
                   throw new InternalServerErrorException('Internal Server Error'); // Điều chỉnh thông báo lỗi và mã trạng thái nếu cần
               }
           }

           // CẬP NHẬP LINH KIỆN
           @Put('updateComponent/:id')
           @ApiOperation({ summary: 'update component' })
           async updateComponent(@Param('id') id:string, args:createComponentModelDto ): Promise<ApiResponse<any>> {
               try {
                   const result = await this.componentService.updateComponent(id,args);
                   return result;
               } catch (error) {
                   console.error(error);
                   throw new InternalServerErrorException('Internal Server Error'); // Điều chỉnh thông báo lỗi và mã trạng thái nếu cần
               }
           }

           // CẬP NHẬP CỤM  LINH KIỆN
           @Put('updatePKCom/:id')
           @ApiOperation({ summary: 'update package component' })
           async updatePkCom(@Param('id') id:string, args:createPackageComponentModelDto ): Promise<ApiResponse<any>> {
               try {
                   const result = await this.componentService.updatePkCOM(id,args);
                   return result;
               } catch (error) {
                   console.error(error);
                   throw new InternalServerErrorException('Internal Server Error'); // Điều chỉnh thông báo lỗi và mã trạng thái nếu cần
               }
           }

           // CẬP NHẬP BOM CỤM
           @Put('updateBOMpk/:id')
           @ApiOperation({ summary: 'update package component' })
           async updateBOMpk(@Param('id') id:string, args: createPackageBomModelDto ): Promise<ApiResponse<any>> {
               try {
                   const result = await this.componentService.updateBOMPk(id,args);
                   return result;
               } catch (error) {
                   console.error(error);
                   throw new InternalServerErrorException('Internal Server Error'); // Điều chỉnh thông báo lỗi và mã trạng thái nếu cần
               }
           }

           //  LƯU TRỮ LINH KIỆN
           @Post('saveParts')
           @ApiOperation({ summary: 'update package component' })
           @UseGuards(AuthGuard)
           async savePart(@Body() args: any ,@CurrentUser() currentUser): Promise<ApiResponse<any>> {
            console.log("args",args)
            console.log("curent",currentUser)
               try {
                   const result = await this.componentService.saveParts(args,currentUser);
                   return result;
               } catch (error) {
                   console.error(error);
                   throw new InternalServerErrorException('Internal Server Error'); // Điều chỉnh thông báo lỗi và mã trạng thái nếu cần
               }
           }

           // LẤY TẤT CẢ LINH KIỆN LƯU TRỮ
           @Get('getAllSaveParts')
           @ApiOperation({ summary: 'get All save parts' })
           @UseGuards(AuthGuard)
           async getStoragePart(@Query('page') page: number ,@Query('pageSize') pageSize: number,@CurrentUser() currentUser): Promise<ApiResponse<any>> {
               try {
                   const result = await this.componentService.getAllSaveParts(page,pageSize,currentUser);
                   return result;
               } catch (error) {
                   console.error(error);
                   throw new InternalServerErrorException('Internal Server Error'); // Điều chỉnh thông báo lỗi và mã trạng thái nếu cần
               }
           }

           // LẤY TỔNG SỐ LINH KIỆN LƯU TRỮ
           @Get('sumSaveParts')
           @ApiOperation({ summary: 'get sum  save parts' })
           @UseGuards(AuthGuard)
           async getSumSavePart( @CurrentUser() currentUser): Promise<ApiResponse<any>> {
               try {
                   const result = await this.componentService.getSumSaveParts(currentUser);
                   return result;
               } catch (error) {
                   console.error(error);
                   throw new InternalServerErrorException('Internal Server Error'); // Điều chỉnh thông báo lỗi và mã trạng thái nếu cần
               }
           }

           // TÌM KIẾM TẤT CẢ LINH KIỆN LƯU TRỮ
           @Get('getSearchAllSaveParts')
           @ApiOperation({ summary: 'get All save parts' })
           @UseGuards(AuthGuard)
           async getSearchStoragePart(@Query('search') search: string ,@Query('fromDate') fromDate: Date ,@Query('toDate') toDate: Date ,@Query('page') page: number ,@Query('pageSize') pageSize: number,@CurrentUser() currentUser): Promise<ApiResponse<any>> {
               try {
               
                   const result = await this.componentService.getSearchAllSaveParts(search,fromDate,toDate,page,pageSize,currentUser);
                   return result;
               } catch (error) {
                   console.error(error);
                   throw new InternalServerErrorException('Internal Server Error'); // Điều chỉnh thông báo lỗi và mã trạng thái nếu cần
               }
           }

           // LẤY CHI TIẾT LINH KIỆN LƯU TRỮ
           @Get('getDetailSaveParts/:id')
           @ApiOperation({ summary: 'get detail save parts' })
           @UseGuards(AuthGuard)
           async getDetailStoragePart(@Param('id') id:string ,@CurrentUser() currentUser): Promise<ApiResponse<any>> {
               try {
               
                   const result = await this.componentService.getDetailAllSaveParts(id,currentUser);
                   return result;
               } catch (error) {
                   console.error(error);
                   throw new InternalServerErrorException('Internal Server Error'); // Điều chỉnh thông báo lỗi và mã trạng thái nếu cần
               }
           }

            // CẬP NHẬP LINH KIỆN LƯU TRỮ
            @Put('updateSaveParts/:id')
            @ApiOperation({ summary: 'update save parts' })
            @UseGuards(AuthGuard)
            async updateStoragePart(@Param('id') id:string ,@Body() args: updateUserPackageBomModelDto, @CurrentUser() currentUser): Promise<ApiResponse<any>> {
                try {
                
                    const result = await this.componentService.updateSaveParts(id,args,currentUser);
                    return result;
                } catch (error) {
                    console.error(error);
                    throw new InternalServerErrorException('Internal Server Error'); // Điều chỉnh thông báo lỗi và mã trạng thái nếu cần
                }
            }

}
