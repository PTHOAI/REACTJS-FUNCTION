// admin.guard.ts
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from './user.guard';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private reflector: Reflector,private readonly prismaService: PrismaService,private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext):Promise<boolean>{
    const request = context.switchToHttp().getRequest();
    const user = await this.prismaService.userRoles.findFirst({
        where:{
            UserId:request.currentUser.Id
        },
        include:{
           Roles:true
        }
    })
     if (user.Roles.Name == 'Administrator') { // 1 là admin
     return true;
    }
    return false;
  }
  public extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
}
}
