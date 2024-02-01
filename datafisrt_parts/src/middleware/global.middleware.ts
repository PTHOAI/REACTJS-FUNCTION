import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class GlobalMiddleware implements NestMiddleware {
    // constructor() {}
    async use(req: Request, res: Response, next: any) {
        const user= req.body
        req['user'] = user;
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
        next();
    }
}