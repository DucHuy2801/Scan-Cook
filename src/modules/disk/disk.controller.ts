import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { DiskService } from './disk.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateDiskDTO } from './dto/create-disk.dto';
import { query } from 'express';
import { MatchDTO } from './dto/recipe-match.dto';

@ApiTags('disk')
@Controller('disk')
export class DiskController {
    constructor(private readonly diskService: DiskService) {}

    @Post()
    create(@Body() body: CreateDiskDTO) {
        return this.diskService.createDisk(body)
    }

    @Get()
    getAllDisks() {
        return this.diskService.getAllDisks()
    }

    @Post('/recipe-matching')
    matchRecipe(@Body() body: MatchDTO){
        return {
            data: "Matching recipe successfully!"
        }
    }

    @Get(':id')
    getDiskById(@Param('id') id: number) {
        return this.diskService.getDiskById(id)
    }

    @Get('/search')
    searchDisk(@Query('query') query: string){
        return {
            "disks": [
                {
                  "id": "string",
                  "name": "string"
                }
            ]
        }
    }
}
