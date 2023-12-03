import { Injectable } from '@nestjs/common';
import { Disk } from 'src/entity/disk.entity';
import { Repository } from 'typeorm';
import { CreateDiskDTO } from './dto/create-disk.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DiskService {
    constructor(
        @InjectRepository(Disk)
        private diskRepository: Repository<Disk>
    ) {}

    async createDisk(body: CreateDiskDTO) {
        const { name, description, category, image } = body;
        try {
            return this.diskRepository.save({
                name, description, category, image
            })
        } catch (error) {
            console.log(error);
        }
    }

    async getDiskById(id: number): Promise<Disk> {
        const disk = await this.diskRepository.findOne({
            where: {id: id}
        })
        return disk
    }

    async getAllDisks(): Promise<Disk[]> {
        const diskList = await this.diskRepository.find()
        return diskList
    }
}
