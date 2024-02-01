import { Controller, Get, Post, Body, Param, Delete, Put,UseGuards, Req } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthSignInDto, AuthSignUpDto, ChangePasswordDto, upadtePasswordDto } from './auth.dto';
import { AuthModel } from './auth.model';
import { AuthService } from './auth.service';
import { AuthGuard } from '../../guard/user.guard';
import { ApiResponse } from 'src/helper/ApiResponse';
import { CurrentUser } from 'src/decorator/currentUser.decorator';
@ApiTags("Auth module")
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    // @Post('register')
    // @ApiOperation({ summary: 'create User' })
    // async registerUser(@Body() args: AuthSignUpDto): Promise<AuthModel> {
    //     return this.authService.registerAuth(args);
    // }
    @Post("createUser")
    @ApiOperation({ summary: 'create User' })
    async createUser(@Body() args: AuthSignUpDto): Promise<ApiResponse<AuthModel>>{
        try{
            console.log("args",args)
            return this.authService.createUser(args)
        } catch(err){
            console.log(err);
        }
    }

    @Post('login')
    @ApiOperation({ summary: 'login User' })
    async loginUser(@Body() args: AuthSignInDto): Promise<any> {
        return this.authService.loginUser(args);
    }

   // @UseGuards(AuthGuard) // Bắt buộc người dùng đã đăng nhập
    @Put('change-password')
    @ApiOperation({ summary: 'change password' })
    async changePassword( @Body() args: ChangePasswordDto) {
       // Lấy thông tin người dùng từ JWT payload
      // Kiểm tra mật khẩu cũ, thay đổi mật khẩu và lưu vào cơ sở dữ liệu
      return this.authService.changePassword(args.userId, args);
    }

    @Put('update-password')
    @ApiOperation({ summary: 'change password' })
    async updatePassword( @Body() args: upadtePasswordDto) {
       // Lấy thông tin người dùng từ JWT payload
      // Kiểm tra mật khẩu cũ, thay đổi mật khẩu và lưu vào cơ sở dữ liệu
      return this.authService.updatePassword(args.userId, args);
    }

    @Get('getAllRole')
    //@UseGuards(AuthGuard)
    @ApiOperation({ summary: 'get all role' })
    async getUsers(@CurrentUser() currentUser): Promise<ApiResponse<any>> {
        try {     
                return this.authService.getRoles();
        } catch (error) {
            console.error(error);
            
        }
    }

}