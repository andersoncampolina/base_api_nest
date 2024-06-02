import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // remove campos que nao estao no DTO
    forbidNonWhitelisted: true, // retorna erro se tiver campos que nao estao no DTO
    transform: true, // transforma os tipos dos campos para o tipo especificado no DTO
  }));

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('nest-base-api')
    .setDescription('A Nest.js base API with Swagger documentation.')
    .setVersion('1.0')
    .addTag('Documentation')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(8000);
}
bootstrap();
