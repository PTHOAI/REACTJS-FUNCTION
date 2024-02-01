import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
//import { jwtConstants } from './constants';
import { Request } from 'express';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService,
        private readonly prismaService: PrismaService,) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        // context.switchToHttp().getRequest() là để lấy tât cả thông tin từ request và từ request sẽ lấy
        // thông tin header, body, paramter... , và từ header ta sẽ lấy được token 
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: process.env.JWTSECRETKEY
                }
            );
            const user = await this.prismaService.users.findFirst({
                where:{
                    Email:payload.email
                }
            })
            request.currentUser = user;
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    public extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}