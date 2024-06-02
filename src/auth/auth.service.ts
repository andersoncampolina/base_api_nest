import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor (private userService: UserService, private jwtService: JwtService) {}

    async login(dto: LoginDto) {
        const validatedUser = await this.validateUser(dto);
        const payload = {
            username: validatedUser.email,
            sub: { name: validatedUser.name }
        }
        return {
            user: validatedUser,
            backendTokens: {
                accessToken: await this.jwtService.signAsync(payload, {
                    expiresIn: '20d',
                    secret: process.env.JWT_SECRET_KEY,
                }),
                refreshtoken: await this.jwtService.signAsync(payload, {
                    expiresIn: '7d',
                    secret: process.env.JWT_REFRESH_TOKEN_KEY,
                }),
            }
        }
    }

    async validateUser(dto: LoginDto) {
        const existingUser = await this.userService.findByEmail(dto.username);
        if(existingUser && (await compare(dto.password, existingUser.password))) {
            const { password, ...result } = existingUser;
            return result;
        }
        throw new UnauthorizedException('Credenciais inválidas');
    }

    async refreshToken(user: any) {
        const payload = {
            username: user.username,
            sub: user.sub
        }

        return {
            accessToken: await this.jwtService.signAsync(payload, {
                expiresIn: '20d',
                secret: process.env.JWT_SECRET_KEY,
            }),
            refreshtoken: await this.jwtService.signAsync(payload, {
                expiresIn: '7d',
                secret: process.env.JWT_REFRESH_TOKEN_KEY,
            }),            
        }
    }
}
