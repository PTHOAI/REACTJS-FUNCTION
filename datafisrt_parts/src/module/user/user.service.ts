import { PrismaService } from "prisma/prisma.service";
import { UserDto, UserDtoUpdate } from "./user.dto";
import { UserModel } from "./user.model";
import { Prisma } from '@prisma/client';
import { BadRequestException, ExecutionContext, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
//import { UserSelect } from "./user.select";
import { request } from "http";
import { CurrentUser } from "src/decorator/currentUser.decorator";
import { ApiResponse } from "src/helper/ApiResponse";

@Injectable()
export class UserService {
  getUserFromContext(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    return request.user;
  }
  constructor(
    private readonly prismaService: PrismaService,
  ) { }

  async checkEmail(email: string): Promise<boolean> {
    email = email.trim().toLowerCase();
    if (!email)
      throw new BadRequestException(`Cannot get find email`);
    const checkEmail = await this.prismaService.users.findFirst({
      where: { Email: email },
      select: { Id: true },
    });
    if (checkEmail && checkEmail.Id) return true;
    return false;
  }

  async checkUserName(username: string): Promise<boolean> {
    username = username.trim().toLowerCase();
    if (!username)
      throw new BadRequestException(`Cannot get find email`);
    const checked = await this.prismaService.users.findFirst({
      where: { UserName: username},
      select: { Id: true },
    });
    if (checked && checked.Id) return true;
    return false;
  }


  async getDetailUser(Id: string): Promise<ApiResponse<UserModel>> {
    try {
      const User = await this.prismaService.users.findUnique({
        where: { Id },
        //select: UserSelect
      });
      if(!User){
        const response: ApiResponse<UserModel> = {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'lấy thông tin user không thành công',
          data: null,
        };
        return response;
      }
    
      const response: ApiResponse<UserModel> = {
        statusCode: HttpStatus.OK,
        message: 'lấy thông tin user thành công',
        data: User,
      };
      return response;
      
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getUsers(): Promise<ApiResponse<UserModel[]>> {
    try {
      const Users = await this.prismaService.users.findMany({
        include:{
          UserRoles:{
            include:{
              Roles:true
            }
          }
        }
      });
      if(!Users){
        const response: ApiResponse<UserModel[]> = {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'lấy thông tin danh sách user không thành công',
          data: null,
        };
        return response;
      }
    
      const response: ApiResponse<UserModel[]> = {
        statusCode: HttpStatus.OK,
        message: 'lấy thông tin danh sách user thành công',
        data: Users,
      };
      return response;
      
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }



//   async updateUserById({
//     id,
//     email,
//     fullname,
//     username,
//     status,
//     deleted,
//     avatar,
//   }: UserDtoUpdate): Promise<UserModel> {
//     try {
//       const data: Prisma.userUpdateInput = {};
//       const user: any = await this.prismaService.user.findUnique({
//         where: { id },
//         select: {
//           id: true,
//           username: true,
//           email: true,
//         },
//       });
//       if (!user || !user.id)
//         throw new BadRequestException('User not found or deleted');

//       if (username) {
//         const checkUsername: any = await this.prismaService.user.findFirst({
//           where: { username, NOT: { id } },
//         });
//         if (checkUsername && checkUsername.id)
//           throw new BadRequestException(
//             `Username ${username} is already exists`,
//           );
//       }
//       if (email && (!user.email)) {
//         const checkEmail: any = await this.prismaService.user.findFirst({
//           where: { id, NOT: { email } },
//         });
//         if (checkEmail && checkEmail.id)
//           throw new NotFoundException('Email is already exists');
//         data.email = striptags(email);
//       }

//       if (fullname) data.fullname = striptags(fullname);;
//       if (status) data.status = status;
//       if (deleted) data.deleted = deleted;
//       if (avatar) data.avatar = avatar;

//       return this.prismaService.user.update({
//         data,
//         where: { id },
//         select: {
//           id: true,
//           username: true,
//         },
//       });
//     } catch (error) {
//       throw new BadRequestException(error.message);
//     }
//   }



}

function striptags(email: string): string | Prisma.StringFieldUpdateOperationsInput {
  throw new Error("Function not implemented.");
}