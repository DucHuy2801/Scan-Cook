import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { loginDTO } from './dto/login-dto';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/signup')
    @HttpCode(HttpStatus.CREATED)
    signup(@Body() dto: CreateUserDTO) {
        return this.authService.signup(dto)
    }

    @Post('/signin')
    @HttpCode(HttpStatus.OK)
    signinLocal(@Body() dto: loginDTO): Promise<Tokens> {
        return this.authService.signin(dto);
    }
}
