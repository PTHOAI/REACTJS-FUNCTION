import { Module } from "@nestjs/common";
import { UserController } from "./vehicle.controller";
import { VehicleService } from "./vehicle.service";
import { PrismaService } from "prisma/prisma.service";
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from "src/guard/user.guard";

@Module({
    imports: [],
    controllers: [UserController],
    providers: [VehicleService, PrismaService, JwtService],
})

export class VehicleModule { }