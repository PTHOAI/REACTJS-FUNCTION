import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module';
import { join } from 'path';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';
import * as multer from 'multer';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
    cors: true,
  });
 // app.use(multer({ dest: './uploads' }).single('img'));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory: (error) => {
        const objError = error[0].constraints;
        throw new HttpException(
          objError[Object.keys(objError)[0]],
          HttpStatus.BAD_REQUEST,
        );
      },
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Parts Catalouge')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('Parts Catalouge')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  
  app.use(bodyParser.json({ limit: '1000mb' }));
  SwaggerModule.setup('api', app, document);
  await app.listen(3001);
  console.log("3001")
}
bootstrap();