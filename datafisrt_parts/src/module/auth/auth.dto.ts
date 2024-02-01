import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    MinLength,
} from 'class-validator';

export class AuthSignUpDto {
    @IsEmail({}, { message: 'Email is not valid' })
    @ApiProperty({
        type: 'string',
        example: 'demo@gmail.com',
        required: true,
    })
    @IsNotEmpty()
    @Transform(({ value }) => value.toLowerCase())
    email: string;

    @IsString()
    @ApiProperty({
        type: 'string',
        example: 'xxx',
        required: true,
    })
    @IsNotEmpty({ message: 'Password is required' })
    password: string;


    nameRole: string

    @IsString()
    @ApiProperty({
        type: 'string',
        example: 'xxx',
        required: true,
    })
    @IsNotEmpty({ message: 'user is required' })
    username: string;

    address: string;

    note: string;

    @IsString()
    phoneNumber: string;

    @IsNotEmpty({ message:' role không được để trống' })
    @IsString()
    role_id: string;
}

export class AuthSignInDto {
    @IsEmail({}, { message: 'Email is not valid' })
    @ApiProperty({
        type: 'string',
        example: 'demo@gmail.com',
        required: true,
    })
    @IsNotEmpty()
    @Transform(({ value }) => value.toLowerCase())
    email: string;

    @IsString()
    @ApiProperty({
        type: 'string',
        example: 'xxx',
        required: true,
    })
    @IsNotEmpty({ message: 'Password is required' })
    password: string;

    // @IsNotEmpty({ message: 'Password is required' })
    username?: string;
}

export class AuthResetPasswordDto {
    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters' })
    @ApiProperty({
        type: 'string',
        example: 'xxx',
        required: true,
    })
    password: string;

    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters' })
    @ApiProperty({
        type: 'string',
        example: 'xxx',
        required: true,
    })
    confirmPassword: string;

    @IsString()
    @ApiProperty({
        type: 'string',
        example: 'xxx',
        required: true,
    })
    @IsNotEmpty({ message: 'Token is required' })
    resetToken: string;
}

export class ChangePasswordDto {
    @IsNotEmpty({ message: 'Number is not empty' })
    userId:string;

    @IsString()
    oldPassword: string;

    @IsString()
    newPassword: string;
  }

export class upadtePasswordDto {
    @IsNotEmpty({ message: 'Number is not empty' })
    userId:string;
    @IsString()
    newPassword: string;
  }

export class AuthRefreshTokenDto {
    @IsString()
    @ApiProperty({
        type: 'string',
        example: 'xxx',
        required: true,
    })
    @IsNotEmpty({ message: 'Token is required' })
    refresh_token: string;
}

export class AuthChangePasswordDto {
    @IsString()
    @ApiProperty({
        type: 'string',
        example: '123',
        required: true,
    })
    userId: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        type: 'string',
        example: '123',
        required: false,
    })
    oldPassword: string;

    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters' })
    @ApiProperty({
        type: 'string',
        example: 'xxxxxxx',
        required: true,
    })
    password: string;

    @IsString()
    @IsOptional()
    @MinLength(8, { message: 'Password must be at least 8 characters' })
    @ApiProperty({
        type: 'string',
        example: '1234568901',
        required: true,
    })
    confirmPassword: string;
}