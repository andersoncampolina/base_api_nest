import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { ApiTags } from "@nestjs/swagger";
import { LoginDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { RefreshJwtGuard } from './guards/refresh.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private userService: UserService, private authService: AuthService) {}

    @Post('register')
    async register(@Body() dto: CreateUserDto) {
        return this.userService.create(dto);
    }

    @Post('login')
    async login(@Body() dto: LoginDto) {
        return await this.authService.login(dto);
    }

    @UseGuards(RefreshJwtGuard)
    @Post('refresh')
    async refreshToken(@Request() req) {
        return await this.authService.refreshToken(req.user);
    }
}
