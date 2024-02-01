// admin.guard.ts
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
@Injectable()
export class CompilationGuard implements CanActivate {
  constructor(private reflector: Reflector,private readonly prismaService: PrismaService,private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext):Promise<boolean>{
    const request = context.switchToHttp().getRequest();
    const idTradeMark = request.params;
    const tradeMark = await this.prismaService.dEPARTMENTs.findUnique({
      where: {
        ID: idTradeMark.id,
      }
    })
    const user = await this.prismaService.userRoles.findFirst({
        where:{
            UserId:request.currentUser.Id
        },
        include:{
           Roles:true
        }
    })
     if (user.Roles.Name === tradeMark.CODE || user.Roles.Name === 'Administrator') { // 1 là admin

     return true;
    }else {
      throw new UnauthorizedException('Bạn không có quyền truy cập vào tài nguyên này.');
    }
  }
  public extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
}
}
