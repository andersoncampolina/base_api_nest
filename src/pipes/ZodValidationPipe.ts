/* IMPORTANT: I've tryed to use Zod for validation, but it dont worth it since we couldn`t use swagger in a propper way */

// import { PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
// import { ZodSchema, ZodError } from 'zod';

// export class ZodValidationPipe implements PipeTransform {
//     constructor(private schema: ZodSchema) {}

//     transform(value: unknown, metadata: ArgumentMetadata) {
//         // Verifica se a origem dos dados é o body
//         // TODO: Validar e transformar tambem futuramente os dados dos parametros, query, etc
//         if (metadata.type === 'body') {
//             try {
//                 const parsedValue = this.schema.parse(value);
//                 if (Object.keys(parsedValue).length === 0) {
//                     throw new BadRequestException(["Pelomenos um campo deve ser preenchido"]);
//                 }
//                 return parsedValue;
//             } catch (error) {
//                 // Verificamos se o erro é do tipo ZodError, caso nao seja, repassamos o erro acima
//                 if (error instanceof ZodError) {
//                     // Captura os erros do Zod e manda para o usuário
//                     const errorMessages = error.errors.map(err => err.message);
//                     throw new BadRequestException(errorMessages.length ? errorMessages : ["Erro de validação"]);
//                 }
//                 throw error;
//             }
//         }

//         // Se não for body, apenas retorna o valor sem validar, pois só queremos validar o body
//         return value;
//     }
// }
