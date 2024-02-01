import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDto } from './user.dto';
import { UserModel } from './user.model';
import { UserService } from './user.service';
import { AuthGuard } from '../../guard/user.guard'
import { Request } from 'express';
import { CurrentUser } from 'src/decorator/currentUser.decorator';
import { ApiResponse } from 'src/helper/ApiResponse';
@ApiTags("User Module")
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    // @Post('')
    // @UseGuards(AuthGuard)
    // @ApiOperation({ summary: 'create user' })
    // async createUser(@Body() args: UserDto): Promise<UserModel> {
    //     return this.userService.createUser(args);
    // }

    @Get('detail/:id')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'get detail user' })
    async getUserById(@Param('id') id: string,@CurrentUser() currentUser): Promise<ApiResponse<UserModel>> {
        try {     
                return this.userService.getDetailUser(id);
        } catch (error) {
            console.error(error);
            console.log(error);
        }
    }
    

    @Get('getAll')
    //@UseGuards(AuthGuard)
    @ApiOperation({ summary: 'get all user' })
    async getUsers(@CurrentUser() currentUser): Promise<ApiResponse<UserModel[]>> {
        try {     
                return this.userService.getUsers();
        } catch (error) {
            console.error(error);
            console.log(error);
        }
    }

}