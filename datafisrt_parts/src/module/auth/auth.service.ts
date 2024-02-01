import { PrismaService } from "prisma/prisma.service";
import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { AuthSignInDto, AuthSignUpDto, ChangePasswordDto, upadtePasswordDto } from "./auth.dto";
import { AuthModel } from "./auth.model";
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from "../user/user.service";
import { v4 as uuidv4 } from 'uuid';
import { ApiResponse } from "src/helper/ApiResponse";
@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) { }
  async registerAuth(AuthData: AuthSignUpDto): Promise<AuthModel> {
    if (!AuthData) throw new BadRequestException('Auth is not empty');
    if (!AuthData.username) throw new BadRequestException('Auth name is not empty');
    const checkEmail = await this.userService.checkEmail(AuthData.email);
    if (checkEmail) throw new BadRequestException('Email is already exists');
    try {
      const hashedPassword = await bcrypt.hash(AuthData.password, 10);
      const createAuth = await this.prismaService.users.create({
        data: {
            Id: uuidv4(),
            UserName: AuthData.username,
            Email: AuthData.email,
            Password: hashedPassword,
        }
      });
      return createAuth;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
  async createUser(AuthData: AuthSignUpDto):Promise<ApiResponse<Omit<AuthModel, 'Password'>>>{
    console.log("role",AuthData.role_id);
    if (!AuthData) throw new BadRequestException('Auth is not empty');
    if (!AuthData.username) throw new BadRequestException('Auth name is not empty');
    const checkUsername = await this.userService.checkUserName(AuthData.username);
    if(checkUsername) throw new BadRequestException('UserName is already exists');
    const checkEmail = await this.userService.checkEmail(AuthData.email);
    if (checkEmail) throw new BadRequestException('Email is already exists');
    try {
      const hashedPassword = await bcrypt.hash(AuthData.password, 10);
      const user = await this.prismaService.users.create({
        data:{
          Id:uuidv4(),
          UserName: AuthData.username,
          Email: AuthData.email,
          Address: AuthData.address,
          Note: AuthData.note,
          PhoneNumber: AuthData.phoneNumber,
          Password: hashedPassword,
        }  
      })  
       await this.prismaService.userRoles.create({
        data:{
          RoleId:AuthData.role_id,
          UserId:user.Id,
        }
      })   
      const response: ApiResponse<Omit<AuthModel, 'Password'>> = {
        statusCode: 200, // Adjust the status code as needed
        message: 'Login successful', // Optional message
        data:user
        
      };
      return response
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
  async loginUser(dto: AuthSignInDto): Promise<ApiResponse<Omit<AuthModel, 'Password'>>> {
    const user = await this.validateUser(dto.email, dto.password);
    const payload = {
      email: user.Email,
      sub: {
        name: user.UserName,
      },
    };
  
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWTSECRETKEY,
    });
    const response: ApiResponse<Omit<AuthModel, 'Password'>> = {
      statusCode: 200, // Adjust the status code as needed
      message: 'Login successful', // Optional message
      data: {
          Email: user.Email,
          UserName: user.UserName, 
          role:user.UserRoles[0].Roles.Name,
          accessToken
      },
    };
  
    return response;
  }
  async validateUser(emailOrUsername: string, password: string): Promise<any| null> {
   const user = await this.prismaService.users.findFirst({
      where: {
        OR: [
          { Email: emailOrUsername },
          { UserName: emailOrUsername },
        ],
      },
      include: {
        UserRoles: {
          include: {
            Roles: true,
          },
        },
      },
    });
    if (!user) {
      throw new BadRequestException('Email or username không đúng '); // Người dùng không tồn tại
    }
    // Kiểm tra mật khẩu ở đây, ví dụ: bcrypt.compare
    const isPasswordValid = await bcrypt.compare(password, user.Password);
    if (isPasswordValid) {
      return user; // Trả về người dùng nếu mật khẩu hợp lệ
    }

    throw new BadRequestException('Mật Khẩu không đúng  '); // Trả về null nếu mật khẩu không hợp lệ
  }
  async changePassword(userId: string, changePasswordDto: ChangePasswordDto) {
   
    const user = await this.prismaService.users.findFirst({
        where :{
            Id: userId
        }
    });
    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng');
    }
    // Kiểm tra xác thực mật khẩu cũ (thêm logic kiểm tra)
    const isPasswordValid = await bcrypt.compare(changePasswordDto.oldPassword, user.Password);
    if (isPasswordValid === false) {
      throw new BadRequestException('Mật khẩu cũ không đúng');
    }
    const newhashedPassword = await bcrypt.hash(changePasswordDto.newPassword, 10);
    const updateData = {
      password: newhashedPassword, // Thay 'password' bằng tên cột trong bảng user
    };
    
    const whereCondition = {
      Id: userId,
    };
    
    // Sử dụng Prisma để cập nhật người dùng
    await this.prismaService.users.update({
      data: updateData,
      where: whereCondition,
    });

    return { message: 'Mật khẩu đã được thay đổi thành công' };
  }

  async updatePassword (userId: string, changePasswordDto: upadtePasswordDto) :Promise<ApiResponse<string>> {
   
    const user = await this.prismaService.users.findFirst({
        where :{
            Id: userId
        }
    });
    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng');
    }
    const newhashedPassword = await bcrypt.hash(changePasswordDto.newPassword, 10);
    const updateData = {
      Password: newhashedPassword, // Thay 'password' bằng tên cột trong bảng user
    };
    
    const whereCondition = {
      Id: userId,
    };
    
    // Sử dụng Prisma để cập nhật người dùng
    await this.prismaService.users.update({
      data: updateData,
      where: whereCondition,
    });

    const response: ApiResponse<string> = {
      statusCode: HttpStatus.OK,
      message: 'mật khẩu đã được thay đổi ',
      data: "hehe",
    };
    return response;

  }
  async getRoles(): Promise<ApiResponse<any>> {
    try {
      const roles = await this.prismaService.roles.findMany({
      
      });
      if(!roles){
        const response: ApiResponse<any> = {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'lấy thông tin danh sách user không thành công',
          data: null,
        };
        return response;
      }
    
      const response: ApiResponse<any> = {
        statusCode: HttpStatus.OK,
        message: 'lấy thông tin danh sách user thành công',
        data: roles,
      };
      return response;
      
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

}

