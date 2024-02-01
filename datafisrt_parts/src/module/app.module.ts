import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { PrismaModule } from 'prisma/prisma.module';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { AuthModule } from './auth/auth.module';
import { VehicleModule } from './vehicles/vehicle.module';
import { ImagesController } from 'src/module/images/images.controller';
import { GlobalMiddleware } from 'src/middleware/global.middleware';
import { ComponentModule } from './component/component.module';

@Module({
  imports: [PrismaModule,UserModule,AuthModule,VehicleModule,ComponentModule],
  controllers: [ImagesController],
  providers: [PrismaService,UserService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
      consumer
          .apply(GlobalMiddleware)
          .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}

