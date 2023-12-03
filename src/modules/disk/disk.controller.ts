import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { DiskService } from './disk.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateDiskDTO } from './dto/create-disk.dto';

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

    @Get(':id')
    getDiskById(@Param('id') id: number) {
        return this.diskService.getDiskById(id)
    }
}
