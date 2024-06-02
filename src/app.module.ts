import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [UserModule, ConfigModule.forRoot(), AuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService /*verificar, talvez nao seja necessario*/],
})
export class AppModule {}
