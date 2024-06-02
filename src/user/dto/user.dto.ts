import { IsEmail, IsNotEmpty, IsString, Min, MinLength } from "class-validator";

export class CreateUserDto {
  /**
   * @example Anderson
   */
  @IsString()
  @IsNotEmpty()
  name: string;

  /**
   * @example anderson@email.com
   */
  @IsEmail()
  email: string;

  /**
   * @example strong#Password123
   */
  @IsString({
    message: 'Senha deve ser uma string',
  })
  password: string;
}