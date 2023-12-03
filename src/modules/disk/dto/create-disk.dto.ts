import {
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'

export class CreateDiskDTO {
    @ApiProperty()
    @IsString()
    @MaxLength(100)
    name: string;

    @ApiProperty()
    @IsString()
    @MaxLength(200)
    description: string;

    @ApiProperty()
    @IsString()
    @MaxLength(100)
    category: string;

    @ApiProperty()
    @IsString()
    @MaxLength(200)
    image: string;
}
