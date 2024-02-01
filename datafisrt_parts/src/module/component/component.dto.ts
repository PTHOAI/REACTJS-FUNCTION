import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    MinLength,
} from 'class-validator';


export class createComponentModelDto {
   
    @IsString() 
    @IsNotEmpty({ message: 'MÃ LINH KIỆN KHÔNG ĐƯỢC ĐỂ TRỐNG' })
    comCode: string;

    @IsString() 
    @IsNotEmpty({ message: 'TÊN LINH KIỆN KHÔNG ĐƯỢC ĐỂ TRỐNG' })
    comNameEN: string;

    @IsString() 
    @IsNotEmpty({ message: 'TÊN LINH KIỆN KHÔNG ĐƯỢC ĐỂ TRỐNG' })
    comNameVN: string;

    @IsString() 
    @IsNotEmpty({ message: 'ĐƠN VỊ TÍNH KHÔNG ĐƯỢC ĐỂ TRỐNG' })
    unit_id: string;

    decription: string;
}

export class createPackageComponentModelDto {
   
    @IsString() 
    @IsNotEmpty({ message: 'MÃ CỤM LINH KIỆN KHÔNG ĐƯỢC ĐỂ TRỐNG' })
    comPkCode: string;

    @IsString() 
    @IsNotEmpty({ message: 'TÊN CỤM LINH KIỆN KHÔNG ĐƯỢC ĐỂ TRỐNG' })
    comPkNameEN: string;

    @IsString() 
    @IsNotEmpty({ message: 'TÊN CỤM  LINH KIỆN KHÔNG ĐƯỢC ĐỂ TRỐNG' })
    comPkNameVN: string;

    @IsString() 
    @IsNotEmpty({ message: 'ĐƠN VỊ TÍNH KHÔNG ĐƯỢC ĐỂ TRỐNG' })
    unit_id: string;

    pkParent_id: string;

    decription: string;

    ncc: string;
}

export class createPackageBomModelDto {
   
    @IsString() 
    @IsNotEmpty({ message: 'MÃ LINH KIỆN KHÔNG ĐƯỢC ĐỂ TRỐNG' })
    com_id: string;

    @IsString() 
    @IsNotEmpty({ message: 'SỐ LƯƠNG KHÔNG ĐƯỢC ĐỂ TRỐNG' })
    quality: string;

    @IsString() 
    @IsNotEmpty({ message: 'MÃ CỤM LINH KIỆN KHÔNG ĐƯỢC ĐỂ TRỐNG' })
    pkCom_id: string;

    decription: string;

}

export class updateUserPackageBomModelDto {
   
    quantity: number;

    @IsString() 
    note: string;

}