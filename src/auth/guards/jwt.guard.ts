import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";

// Esse guard funciona como um middleware que intercepta a requisicao antes de chegar ao controller
@Injectable()
export class JwtGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if(!token) throw new UnauthorizedException('Token não fornecido');
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET_KEY,            
            });
            request.user = payload;
        } catch (error) {
            throw new UnauthorizedException('Token inválido');
        }
        return true;
    }

    // Pega o token do header da requisicao
    private extractTokenFromHeader(request: Request) {
        // divide a palavra Bearer do token e armazena em type e token, respectivamente
        const [type, token] = request.headers.authorization!.split(' ') ?? [];
        return type === 'Bearer' || type === 'bearer' ? token : undefined;
    }
}