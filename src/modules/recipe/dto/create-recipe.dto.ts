import {
    IsString,
    MaxLength,
  } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'
  
export class CreateRecipeDTO {
    @ApiProperty()
    @IsString()
    @MaxLength(100)
    name: string;
  
    @ApiProperty()
    @IsString()
    @MaxLength(200)
    image: string;
}
  