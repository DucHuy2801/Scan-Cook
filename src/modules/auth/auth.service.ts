import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { CreateUserDTO } from './dto/create-user.dto';
import { ErrorException } from 'src/utils/Error';
import { Tokens } from './types';
import { loginDTO } from './dto/login-dto';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    hashData(data: string) {
        return bcrypt.hash(data, 10)
    }

    async getTokens(user_id: number, email: string) : Promise<Tokens> {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    user_id,
                    email
                }, 
                {
                    secret: 'access_token-secret',
                    expiresIn: 60 * 60 * 24 * 7,
                }
            ),
            this.jwtService.signAsync(
                {
                    user_id,
                    email
                }, 
                {
                    secret: 'refresh_token-secret',
                    expiresIn: 60 * 60 * 24 * 7,
                }
            )
        ])

        return {
            access_token: accessToken,
            refresh_token: refreshToken
        }
    }

    async updateRefreshTokenHash(user_id: number, refreshToken: string) {
        const hash = await this.hashData(refreshToken)
        await this.userRepository
            .createQueryBuilder()
            .update(User)
            .set({ hashedRt: hash})
            .where('user_id = :id', {id: user_id})
            .execute()
    }

    async signup(dto: CreateUserDTO) {
        const existEmail = await this.userRepository.findOne({
            where: { email: dto.email }
        })

        if (existEmail) {
            throw new ErrorException(
                "Email is used to register before, welcome use another email!",
                HttpStatus.BAD_REQUEST
            )
        }

        const hash = await this.hashData(dto.password)

        const newUser = this.userRepository.create({
            ...dto,
            password: hash
        })

        const result = await this.userRepository.save(newUser)
        const tokens = await this.getTokens(
            result.user_id,
            dto.email
        )
            
        await this.updateRefreshTokenHash(result.user_id, tokens.refresh_token)
        return {
            message: "Register successfully!"
        }
    }

    async signin(dto: loginDTO): Promise<Tokens> {
        const { email, password } = dto;
    
        const user = await this.userRepository
            .createQueryBuilder()
            .where('email = :email', { email })
            .getOne();
    
        if (!user)
            throw new ErrorException(
                'Email or password is wrong!',
                HttpStatus.BAD_REQUEST,
        );
    
        const passwordMatches = await bcrypt.compare(password, user.password);
    
        if (!passwordMatches)
          throw new ErrorException(
            'Email or password is wrong!',
            HttpStatus.BAD_REQUEST,
          );
    
        const tokens = await this.getTokens(
            user.user_id,
            user.email,
        );
        await this.updateRefreshTokenHash(user.user_id, tokens.refresh_token);
        return tokens;
    }
}
