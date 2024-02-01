import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    MinLength,
} from 'class-validator';
export class  VehicleModelDto{
   
    @IsNotEmpty()
    @Transform(({ value }) => value.toUpperCase())
    code: string;

    @IsString() 
    @IsNotEmpty({ message: 'name_vn' })
    name_vn: string;

    @IsString() 
    @IsNotEmpty({ message: 'name_en' })
    name_en: string;
}

export class TradeMarkDto {
   
    @IsNotEmpty()
    @Transform(({ value }) => value.toUpperCase())
    vem_code: string;

    @IsString() 
    @IsNotEmpty({ message: 'vem_name' })
    vem_name: string;

    @IsString() 
    @IsNotEmpty({ message: 'department_id' })
    department_id: string;
}

export class SegMentModelDto {
   
    @IsString() 
    @IsNotEmpty({ message: 'name' })
    name_vn: string;

    @IsString() 
    @IsNotEmpty({ message: '' })
    segCode: string;

    @IsString() 
    trademarkId: string;

}

export class VehicleBomDto {
   
    @IsString() 
    @IsNotEmpty({ message: 'Không được để trống xe' })
    idVehicle: string;

    @IsNotEmpty({ message: 'Không được để trống cụm linh kiện' })
    @IsString() 
    idPackage: string;

    idPart: string;

    description: string;
}

export class createCarModelDto {
   
    @IsString() 
    @IsNotEmpty({ message: 'MÃ XE KHÔNG ĐƯỢC ĐỂ TRỐNG' })
    codeCar: string;

    @IsString() 
    @IsNotEmpty({ message: 'ĐƠN VỊ XE KHÔNG ĐƯỢC ĐỂ TRỐNG' })
    groupId: string;

    @IsString() 
    @IsNotEmpty({ message: 'TÊN XE KHÔNG ĐƯỢC ĐỂ TRỐNG' })
    nameCar: string;

    @IsString() 
    @IsNotEmpty({ message: 'PHÂN KHÚC XE KHÔNG ĐƯỢC ĐỂ TRỐNG' })
    segmentId: string;

    description: string;

    codeCatalog: string;

    @IsString() 
    trademarkId: string;

    pdfCatalog?: string;

    pdfInstruction?: string;

    pdfMaintenance?: string;

    picture?:string;
}

export class createCarPartModelDto {
   
    @IsString() 
    @IsNotEmpty({ message: 'XE KHÔNG ĐƯỢC ĐỂ TRỐNG' })
    idCar: string;

    @IsString() 
    @IsNotEmpty({ message: 'TÊN BỘ PHẬN XE TIẾNG ANH KHÔNG ĐƯỢC ĐỂ TRỐNG' })
    partNameEN: string;

    @IsString() 
    @IsNotEmpty({ message: 'TÊN BỘ PHẬN XE TIẾNG VIỆT ĐỂ TRỐNG' })
    partNameVN: string;

    
}