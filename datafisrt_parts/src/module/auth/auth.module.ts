import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
@Module({
    controllers: [AuthController],
    providers: [AuthService, PrismaService, JwtService,UserService],
})
export class AuthModule { }