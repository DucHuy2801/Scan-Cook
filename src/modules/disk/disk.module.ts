import { Module } from '@nestjs/common';
import { DiskController } from './disk.controller';
import { DiskService } from './disk.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Disk } from 'src/entity/disk.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Disk])
  ],
  controllers: [DiskController],
  providers: [DiskService]
})
export class DiskModule {}
