import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class LoginDto {
    /**
     * @example anderson@email.com
     */
    @IsString()
    @IsEmail()
    username: string;

    /**
     * @example strong#Password123
     */
    @IsString()
    @IsStrongPassword()
    password: string;
}