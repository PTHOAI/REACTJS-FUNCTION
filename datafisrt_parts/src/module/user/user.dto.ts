import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
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
    example: '',
    required: false,
  })
  @IsNotEmpty()
  username: string;

  @IsString()
  @ApiProperty({
    type: 'string',
    example: '',
    required: false,
  })
  @IsNotEmpty()
  fullname: string;

  @IsNotEmpty()
  @ApiProperty({
    type: 'number',
    example: '',
    required: false,
  })
  @Transform(({ value }) => Number(value))
  status: number;

  @IsNotEmpty()
  @ApiProperty({
    type: 'boolean',
    example: '',
    required: false,
  })
  deleted: boolean;

  @IsString()
  @ApiProperty({
    type: 'string',
    example: '',
    required: false,
  })
  avatar: string;

  @ApiProperty({
    type: 'number',
    example: 0,
    required: false,
  })
  @IsNotEmpty()
  age: number;
}

export class UserDtoUpdate {
  @ApiProperty({
    type: 'number',
    example: '1',
    required: true,
  })
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  id: number;

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
    example: '',
    required: false,
  })
  @IsNotEmpty()
  username: string;

  @IsString()
  @ApiProperty({
    type: 'string',
    example: '',
    required: false,
  })
  @IsNotEmpty()
  fullname: string;

  @IsNotEmpty()
  @ApiProperty({
    type: 'number',
    example: '',
    required: false,
  })
  @Transform(({ value }) => Number(value))
  status: number;

  @IsNotEmpty()
  @ApiProperty({
    type: 'boolean',
    example: '',
    required: false,
  })
  deleted: boolean;

  @IsString()
  @ApiProperty({
    type: 'string',
    example: '',
    required: false,
  })
  avatar: string;

  @ApiProperty({
    type: 'number',
    example: 0,
    required: false,
  })
  @IsNotEmpty()
  age: number;
}