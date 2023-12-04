import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards, Req, Request, Get, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { loginDTO } from './dto/login-dto';
import { Tokens } from './types';
import { ApiTags } from '@nestjs/swagger';
import { access } from 'fs';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('/signup')
    @HttpCode(HttpStatus.CREATED)
    signup(@Body() dto: CreateUserDTO) {
        return this.userService.signup(dto)
    }

    @Post('/signin')
    @HttpCode(HttpStatus.OK)
    signin(@Body() dto: loginDTO): Promise<Tokens> {
        return this.userService.signin(dto);
    }

    @UseGuards(AuthGuard('accessToken'))
    @Post('/logout')
    @HttpCode(HttpStatus.OK)
    logout(@Param('accessToken') accessToken: string, @Req() req: Request) {
        const user = req.body
        return this.userService.logout(user['userId']);
    }

    @UseGuards(AuthGuard('accessToken'))
    @Get('/info')
    @HttpCode(HttpStatus.OK)
    getMySelf(@Param('accessToken') accessToken: string, @Req() req: Request) {
        const user = req?.body;
        return this.userService.getUserInfo(user['user_id']);
    }

    @Get('/wishlist')
    @HttpCode(HttpStatus.OK)
    getWishList(@Param('accessToken') accessToken: string, @Req() req: Request) {
        return {
            data: "My Wish List!"
        }
    }
}
