import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';

@Module({
    imports: [
        JwtModule.register({}),
        TypeOrmModule.forFeature([User])
    ],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {}
