import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async create(dto: CreateUserDto) {
        const existingUser = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });

        if (existingUser) throw new Error('Usuário já existe com este email');

        const newUser = await this.prisma.user.create({
            data: {
                ...dto,
                password: await hash(dto.password, 10),
            },
        });
        
        // remove o password e retorna ao cliente sem essa info sensivel
        const { password, ...result } = newUser 

        return result; // TODO: Criar um PIPE para melhor o padrao de resposta com um trycatch, data: {}, message: [], etc
    }

    async findByEmail(email: string) {
        return await this.prisma.user.findUnique({
            where: {
                email,
            },
        });
    }

    async findById(id: number) {
        return await this.prisma.user.findUnique({
            where: {
                id,
            },
        });
    }
}
