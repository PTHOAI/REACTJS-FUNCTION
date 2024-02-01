// images.controller.ts
import { Controller, Get, NotFoundException, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("Files Module")
@Controller('img')
export class ImagesController {
  @Get('others/:id')
  async serveImage(@Param('id') id: string, @Res() res: Response) {
    try {
      const file = join(__dirname, '..', '..', '..', '..', 'uploads/others', id);
      if (!fileExists(file)) {
        throw new NotFoundException('Image not found');
      }
      return res.sendFile(file);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new NotFoundException('Image not found');
      }
    }
  }
  @Get('svg/:id')
  async serveSvg(@Param('id') id: string, @Res() res: Response) {
    if(id){
    const file = join(__dirname, '..', '..', '..', '..','uploads/svgs', id);
    return res.sendFile(file);
    }
    return ;
  }
  @Get('pdf/:id')
  async servePDF(@Param('id') id: string, @Res() res: Response) {
    if(id){
    const file = join(__dirname, '..', '..', '..', '..','uploads/pdfs', id);
    return res.sendFile(file);
    }
    return ;
  }
}
function fileExists(filePath: string): boolean {
  const fs = require('fs');
  return fs.existsSync(filePath);
}
