import { Module } from '@nestjs/common';
import { ComponentController } from './component.controller';
import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ComponentService } from './component.service';

@Module({
  controllers: [ComponentController],
  providers: [ PrismaService, JwtService,ComponentService],
})
export class ComponentModule {}
