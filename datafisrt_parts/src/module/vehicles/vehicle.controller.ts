import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Req, InternalServerErrorException, UseInterceptors, UploadedFile, UploadedFiles, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../guard/user.guard'
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { CurrentUser } from 'src/decorator/currentUser.decorator';
import { ApiResponse } from 'src/helper/ApiResponse';
import { VehicleService } from './vehicle.service';
import { Department_Model, SegmentModel, VehicleBomsModel, VehicleBoomModel, VehicleModel, VehiclePartsModel, Vehicle_Model_Model } from './vehicle.model';
import { AdminGuard } from 'src/guard/admin.guard';
import { SegMentModelDto, TradeMarkDto, VehicleBomDto, VehicleModelDto, createCarModelDto, createCarPartModelDto } from './vehicle.dto';
import { CompilationGuard } from 'src/guard/compilation.guard';
import { extname } from 'path';
import { DEPARTMENTs } from '@prisma/client';


@ApiTags("Vehicle Module")
@Controller('vehicle')
export class UserController {
    constructor(private readonly vehicleService: VehicleService) { }

    @Get('trademark/car/:id')
   // @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'get detail vehicle' })
    async getVehicleById(@Param('id') id: string,@CurrentUser() currentUser): Promise<ApiResponse<Vehicle_Model_Model>> {
        try {     
                return this.vehicleService.getVehicle(id);
        } catch (error) {
            console.error(error);
            console.log(error);
        }
    }

    @Get('getGoupVehicle/:id')
    ///@UseGuards(CompilationGuard)
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'get detail vehicle' })
    async getTrademarkById(@Param('id') id: string,@CurrentUser() currentUser): Promise<ApiResponse<Department_Model>> {
        try {     
                return this.vehicleService.getTrademarkbyId(id);
        } catch (error) {
            console.error(error);
            console.log(error);
        }
    }

    // LẤY THÔNG TIN DANH SÁCH THƯƠNG HIỆU THEO ĐƠN VỊ XE THEO ID
    @Get('getlisttrademark/:id')
    @ApiOperation({ summary: 'get detail trademark' })
    async getTrademar(@Param('id') id: string): Promise<ApiResponse<Vehicle_Model_Model[]>> {
        try {     
            return this.vehicleService.getTrademark(id);
            } catch (error) {
            console.error(error);
            console.log(error);
         }
    }

    // LÁY DANH SÁCH XE THEO TỪNG THƯƠNG HIỆU
    @Get('getlistcar/:id')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'get detail trademark' })
    async getCar(@Param('id') id: string): Promise<ApiResponse<VehicleModel[]>> {
        try {     
            return this.vehicleService.getlistCar(id);
            } catch (error) {
            console.error(error);
            console.log(error);
         }
    }
    // lấy thông tin bộ phận xe
    @Get('getlistpartscar/:id')
   // @UseGuards(AdminGuard)
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'get detail trademark' })
    async getPartsCar(@Param('id') id: string): Promise<ApiResponse<VehiclePartsModel[]>> {
        try {     
            return this.vehicleService.getPartsCar(id);
            } catch (error) {
            console.error(error);
            console.log(error);
         }
    }

    // TẠO THƯƠNG HIỆU XE
     @Post('createtrademark')
     @ApiOperation({ summary: 'create group vehicle' })
     async createTradeMark(@Body() args:TradeMarkDto ): Promise<ApiResponse<any>> {
         try {     
             return this.vehicleService.createGroupCar(args);
             } catch (error) {
             console.error(error);
             console.log(error);
          }
     }

    // TẠO ĐƠN VỊ XE
    @Post('creategroupvehicle')
   // @UseGuards(AdminGuard)
    @ApiOperation({ summary: 'create trademark' })
    async createGroupVehicle(@Body() args: VehicleModelDto): Promise<ApiResponse<Department_Model>> {
        try {     
            return this.vehicleService.createTradeMark(args);
            } catch (error) {
            console.error(error);
            console.log(error);
         }
    }

    // LẤY CHI TIETS THƯƠNG HIỆU XE
    @Get('getdetailtrademark/:id')
    @ApiOperation({ summary: 'detail trademark' })
    async getDetailTradeMark(@Param('id') id: string): Promise<ApiResponse<Vehicle_Model_Model>> {
        try {     
            return this.vehicleService.getDetailTradeMark(id);
            } catch (error) {
            console.error(error);
            console.log(error);
         }
    }

    // LẤY THÔNG TIN CHI TIẾT CHO XE
    @Get('getdetailvehicle/:id')
    @ApiOperation({ summary: 'detail vehicle' })
    async getDetailVihicle(@Param('id') id: string): Promise<ApiResponse<VehicleModel>> {
        try {     
            return this.vehicleService.getDetailVehicle(id);
            } catch (error) {
            console.error(error);
            console.log(error);
         }
    }

    @Get('getlistvehiclebom/:id')
    @ApiOperation({ summary: 'detail vehicle' })
    async getListVehicleBoms(@Param('id') id: string): Promise<ApiResponse<any>> {
        try {     
            return this.vehicleService.getListVehicleBom(id);
            } catch (error) {
            console.error(error);
            console.log(error);
         }
    }

    // DANH SÁCH BOM CỤM LINH KIỆN CHA CON
    @Get('getchild/:id')
    @ApiOperation({ summary: 'detail vehicle' })
    async getChild(@Param('id') id: string): Promise<ApiResponse<any>> {
        try {     
            return this.vehicleService.getChild(id);
            } catch (error) {
            console.error(error);
            console.log(error);
         }
    }
    // LẤY DANH SÁCH XE
    @Get('getlistcar')
    @ApiOperation({ summary: 'get list car' })
    async getListCar(): Promise<ApiResponse<VehicleModel[]>> {
        try {     
            return this.vehicleService.getListCar();
            } catch (error) {
            console.error(error);
            console.log(error);
         }
    }
     // LẤY DANH SÁCH NHÓM XE
    @Get('getlistgroupcar')
    @ApiOperation({ summary: 'get list group car' })
    async getListGroupCar(): Promise<ApiResponse<Vehicle_Model_Model[]>> {
        try {     
            return this.vehicleService.getListGroupCar();
            } catch (error) {
            console.error(error);
            console.log(error);
         }
    }

    // TẠO PHÂN KHÚC XE 
    @Post('createsegment')
    @ApiOperation({ summary: 'get list group car' })
    async createSegMent( @Body() args: SegMentModelDto ): Promise<ApiResponse<SegmentModel>> {
        try {     
            return this.vehicleService.createSegMent(args);
            } catch (error) {
            console.error(error);
            console.log(error);
         }
    }

    // LẤY DANH SÁCH PHÂN KHÚC XE THEO ID THƯƠNG HIỆU
    @Get('getsegment/:id')
    @ApiOperation({ summary: 'get list segment' })
    async getListSegment(@Param('id') id: string): Promise<ApiResponse<SegmentModel[]>> {
        try {
            const result = await this.vehicleService.getListSegment(id);
            return result;
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Internal Server Error'); // Điều chỉnh thông báo lỗi và mã trạng thái nếu cần
        }
    }

     // LẤY DANH SÁCH THƯƠNG HIỆU THEO ID GROUP
     @Get('getlisttrademarkofgroup/:id')
     @ApiOperation({ summary: 'get list trademark ' })
     async getListTradeMarkOfGroup(@Param('id') id:string ): Promise<ApiResponse<Vehicle_Model_Model[]>> {
         try {
             const result = await this.vehicleService.getListTradeMarkOfGroup(id);
             return result;
         } catch (error) {
             console.error(error);
             throw new InternalServerErrorException('Internal Server Error'); // Điều chỉnh thông báo lỗi và mã trạng thái nếu cần
         }
     }

      // LẤY DANH SÁCH PHÂN KHÚC THEO ID THƯƠNG HIỆU
      @Get('getlistSegmentOfTrade/:id')
      @ApiOperation({ summary: 'get list Segment' })
      async getListSegmentOfTradeMark(@Param('id') id:string ): Promise<ApiResponse<SegmentModel[]>> {
          try {
              const result = await this.vehicleService.getListSegmentOfTrade(id);
              return result;
          } catch (error) {
              console.error(error);
              throw new InternalServerErrorException('Internal Server Error'); // Điều chỉnh thông báo lỗi và mã trạng thái nếu cần
          }
      }

     // LẤY DANH SÁCH  XE THEO ID PHÂN KHÚC
    @Post('getcarofsegment')
    @ApiOperation({ summary: 'get list segment' })
    async getListCarOfSement(@Body() idsData: { selectedIds: string[] }): Promise<ApiResponse<VehicleModel[]>> {
        try {
            const result = await this.vehicleService.getListCarofSegment(idsData);
            return result;
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Internal Server Error'); // Điều chỉnh thông báo lỗi và mã trạng thái nếu cần
        }
    }
    // LẤY DANH SÁCH ĐƠN VỊ XE
    @Get('listgroupvehicle') 
     @ApiOperation({ summary: 'get detail group vehicle' })
     async dePartMent(): Promise<ApiResponse<Department_Model[]>> {
         try {     
             return this.vehicleService.dePartMent();
             } catch (error) {
             console.error(error);
             console.log(error);
          }
     }
     

    // LẤY DANH SÁCH THƯƠNG HIỆU XE 
    @Get('getlisttrademark')
    @ApiOperation({ summary: 'get list trademark' })
    async getTradeMark(): Promise<ApiResponse<Vehicle_Model_Model[]>> {
        try {
            const result = await this.vehicleService.getListTradeMark();
            return result;
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Internal Server Error'); // Điều chỉnh thông báo lỗi và mã trạng thái nếu cần
        }
    }

    // LẤY DANH SÁCH PHÂN KHÚC XE
    @Get('getlistsegment')
    @ApiOperation({ summary: 'get list segment' })
    async getSegment(): Promise<ApiResponse<SegmentModel[]>> {
        try {
            const result = await this.vehicleService.getListSegMent();
            return result;
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Internal Server Error'); // Điều chỉnh thông báo lỗi và mã trạng thái nếu cần
        }
    }
     // LẤY CHI TIẾT 1 PHÂN KHÚC THEO ID
     @Get('detailsegment/:id')
     @ApiOperation({ summary: 'get detail segment' })
     async getDetailSegment(@Param('id') id:string): Promise<ApiResponse<SegmentModel>> {
         try {
             const result = await this.vehicleService.getDetailSegMent(id);
             return result;
         } catch (error) {
             console.error(error);
             throw new InternalServerErrorException('Internal Server Error'); // Điều chỉnh thông báo lỗi và mã trạng thái nếu cần
         }
     }

    // LẤY DANH SÁCH BỘ PHẬN XE
    @Get('getlistvehicleparts')
    @ApiOperation({ summary: 'get list vehicle part' })
    async getListVehicleParts(  @Query('page') page: number ,@Query('pageSize') pageSize: number ): Promise<ApiResponse<VehiclePartsModel[]>> {
          try {
              const result = await this.vehicleService.getListVehicleParts(page,pageSize);
              return result;
          } catch (error) {
              console.error(error);
              throw new InternalServerErrorException('Internal Server Error'); // Điều chỉnh thông báo lỗi và mã trạng thái nếu cần
          }
      }

    // LẤY DANH SÁCH XE
    @Get('getlistvehicle')
    @ApiOperation({ summary: 'get list vehicle part' })
    async getListVehicle(  ): Promise<ApiResponse<VehicleModel[]>> {
          try {
              const result = await this.vehicleService.getListVehicle();
              return result;
          } catch (error) {
              console.error(error);
              throw new InternalServerErrorException('Internal Server Error'); // Điều chỉnh thông báo lỗi và mã trạng thái nếu cần
          }
      }

    // TẠO XE
    @Post('createcar')
    @UseInterceptors(    
       FileFieldsInterceptor([
        { name: 'pdfCatalog', maxCount: 1 },
        { name: 'pdfInstruction', maxCount: 1 },
        { name: 'pdfMaintenance', maxCount: 1 },
        { name: 'picture', maxCount: 1 }, 
    ]),)
    @ApiOperation({ summary: 'create Car' })
    async createCar(
        @Body()  carData: createCarModelDto,
        @UploadedFiles() files: any,
        ): Promise<ApiResponse<VehicleModel>> {
        try {
            const result = await this.vehicleService.createCar(files,carData);
            return result;
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Internal Server Error'); // Điều chỉnh thông báo lỗi và mã trạng thái nếu cần
        }
    }

    // UPDATE XE
    @Put('updatecar/:id')
    @UseInterceptors(    
       FileFieldsInterceptor([
        { name: 'pdfCatalog', maxCount: 1 },
        { name: 'pdfInstruction', maxCount: 1 },
        { name: 'pdfMaintenance', maxCount: 1 },
        { name: 'picture', maxCount: 1 }, 
    ]),)
    @ApiOperation({ summary: 'create Car' })
    async updateCar(
        @Param('id') id:string ,
        @Body()  carData: createCarModelDto,
        @UploadedFiles() files: any,
        ): Promise<ApiResponse<VehicleModel>> {
        try {
            const result = await this.vehicleService.updateCar(id,files,carData);
            return result;
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Internal Server Error'); // Điều chỉnh thông báo lỗi và mã trạng thái nếu cần
        }
    }

      // LẤY CHI TIẾT 1 XE
      @Get('detailvehicle/:id')
      @ApiOperation({ summary: 'get detail segment' })
      async getDetailVehicle(@Param('id') id:string): Promise<ApiResponse<VehicleModel>> {
          try {
              const result = await this.vehicleService.getDetailVehicle(id);
              return result;
          } catch (error) {
              console.error(error);
              throw new InternalServerErrorException('Internal Server Error'); // Điều chỉnh thông báo lỗi và mã trạng thái nếu cần
          }
      }

    // TẠO BỘ PHẬN XE
    @Post('createcarpart')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'create Car Part' })
    async createCarPart(
        @Body()  carPartData: createCarPartModelDto,
        @CurrentUser() currentUser
        ): Promise<ApiResponse<VehiclePartsModel>> {
        try {
            const result = await this.vehicleService.createCarPart(carPartData,currentUser);
            return result;
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Internal Server Error'); // Điều chỉnh thông báo lỗi và mã trạng thái nếu cần
        }
    }

     // LẤY DANH SÁCH BOM XE
    @Get('getvehicleboms')
    @ApiOperation({ summary: 'lấy danh sách bom xe' })
    async getVehicleBoms(  @Query('page') page: number ,@Query('pageSize') pageSize: number ): Promise<ApiResponse<VehicleBomsModel[]>> {
          try {
              const result = await this.vehicleService.getVehicleBoms(page,pageSize);
              return result;
          } catch (error) {
              console.error(error);
              throw new InternalServerErrorException('Internal Server Error'); // Điều chỉnh thông báo lỗi và mã trạng thái nếu cần
          }
      }

     // LẤY DANH SÁCH BOM XE
     @Get('getsearchvehicleboms')
     @ApiOperation({ summary: 'lấy danh sách tìm kiếm bom xe' })
     async getSearchVehicleBoms(@Query('search') search: string,@Query('page') page: number ,@Query('pageSize') pageSize: number ): Promise<ApiResponse<VehicleBomsModel[]>> {
           try {
               const result = await this.vehicleService.getSearchVehicleBoms(search,page,pageSize);
               return result;
           } catch (error) {
               console.error(error);
               throw new InternalServerErrorException('Internal Server Error'); // Điều chỉnh thông báo lỗi và mã trạng thái nếu cần
           }
       }

     // TẠO BOM XE 
    @Post('createVehicleBom')
    @ApiOperation({ summary: 'Tạo Bom Xe' })
    async createVehicleBom( @Body() args: VehicleBomDto ): Promise<ApiResponse<VehicleBomsModel>> {
        try {     
            return this.vehicleService.createVehicleBom(args);
            } catch (error) {
            console.error(error);
            console.log(error);
         }
    }

     // XÓA DANH SÁCH ĐƠN VỊ XE
     @Delete('deletelistUnitVehicle')
     // @UseGuards(AuthGuard)
     @ApiOperation({ summary: 'delete unit vehicle' })
      async deleteListUnitVehicle(@Body('data') data: { unitCarIds: string[] },@CurrentUser() currentUser): Promise<ApiResponse<DEPARTMENTs[]>> {
          try {     
                  return this.vehicleService.deleteUnitVehicles(data);
          } catch (error) {
              console.error(error);
              console.log(error);
          }
      }

       // UPDATE ĐƠN VỊ XE
    @Put('updateUnitVehicle/:id')
    @ApiOperation({ summary: 'update Unit Vehicle' })
    async updateUnitVehicle(
        @Param('id') id:string ,
        @Body()  data: VehicleModelDto,
        ): Promise<ApiResponse<Department_Model>> {
        try {
            const result = await this.vehicleService.updateUnitvehicle(id,data);
            return result;
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Internal Server Error'); // Điều chỉnh thông báo lỗi và mã trạng thái nếu cần
        }
    }

      // XÓA DANH SÁCH THƯƠNG HIỆU XE
      @Delete('deletelistTradeMarkVehicle')
      // @UseGuards(AuthGuard)
      @ApiOperation({ summary: 'delete unit vehicle' })
       async deletelistTradeMarkVehicle(@Body('data') data: { tradeMarkCarIds: string[] },@CurrentUser() currentUser): Promise<ApiResponse<Vehicle_Model_Model[]>> {
           try {     
                   return this.vehicleService.deleteTradeMarkVehicles(data);
           } catch (error) {
               console.error(error);
               console.log(error);
           }
       }

       // XÓA DANH SÁCH PHÂN KHÚC XE
       @Delete('deletelistSegmentVehicle')
       // @UseGuards(AuthGuard)
       @ApiOperation({ summary: 'delete Segment Vehicle' })
        async deletelistSegmentVehicle(@Body('data') data: { SegmentCarIds: string[] },@CurrentUser() currentUser): Promise<ApiResponse<SegmentModel[]>> {
            try {     
                    return this.vehicleService.deleteSegmentVehicles(data);
            } catch (error) {
                console.error(error);
                console.log(error);
            }
        }

        // XÓA  1 HOẶC NHIỀU XE
        @Delete('deleteVehicles')
        // @UseGuards(AuthGuard)
        @ApiOperation({ summary: 'delete  Vehicle' })
         async deleteVehicleS(@Body('data') data: { vehicleIds: string[] },@CurrentUser() currentUser): Promise<ApiResponse<VehicleModel[]>> {
             try {     
                     return this.vehicleService.deleteVehicles(data);
             } catch (error) {
                 console.error(error);
                 console.log(error);
             }
         }

         // XÓA  1 HOẶC NHIỀU XE
        @Delete('deletePackageBom')
        // @UseGuards(AuthGuard)
        @ApiOperation({ summary: 'delete  Vehicle' })
         async deletePackageBom(@Body('data') data: { packageBomIds: string[] },@CurrentUser() currentUser): Promise<ApiResponse<any[]>> {
             try {     
                     return this.vehicleService.deletePackageBom(data);
             } catch (error) {
                 console.error(error);
                 console.log(error);
             }
         }

          // LẤY DANH SÁCH Bộ PHẬN XE
        @Get('getPart/:id')
         @ApiOperation({ summary: 'lấy danh sách bộ phận xe' })
        async getVehickePart(@Param('id') id:string): Promise<ApiResponse<VehiclePartsModel>> {
           try {
               const result = await this.vehicleService.getALLPart(id);
               return result;
           } catch (error) {
               console.error(error);
               throw new InternalServerErrorException('Internal Server Error'); // Điều chỉnh thông báo lỗi và mã trạng thái nếu cần
           }
       }

        // LẤY CHI TIẾT THƯƠNG HIỆU
     @Get('detailTradeMark/:id')
     @ApiOperation({ summary: 'get detail trademark' })
     async getdetailTradeMark(@Param('id') id:string): Promise<ApiResponse<Vehicle_Model_Model>> {
         try {
             const result = await this.vehicleService.getDetailTradeMark(id);
             return result;
         } catch (error) {
             console.error(error);
             throw new InternalServerErrorException('Internal Server Error'); // Điều chỉnh thông báo lỗi và mã trạng thái nếu cần
         }
     }

     // LẤY CHI TIẾT BỘ PHẬN
     @Get('detailPart/:id')
     @ApiOperation({ summary: 'get detail part' })
     async getdetailPart(@Param('id') id:string): Promise<ApiResponse<VehiclePartsModel>> {
         try {
             const result = await this.vehicleService.getDetailPart(id);
             return result;
         } catch (error) {
             console.error(error);
             throw new InternalServerErrorException('Internal Server Error'); // Điều chỉnh thông báo lỗi và mã trạng thái nếu cần
         }
     }



}