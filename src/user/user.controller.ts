import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from "@nestjs/swagger";
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@ApiTags('user')
@Controller('user')
export class UserController {

    constructor(private userService: UserService) {}

    @UseGuards(JwtGuard)
    @Get(':id')
    async getUserById(@Param('id') id: number) {
        return await this.userService.findById(id);
    }

}