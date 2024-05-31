import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UsePipes } from "@nestjs/common";
import { CreateUserDto, createUserSchema } from "./dto/create-user-schema";
import { UpdatePatchUserDto, updatePatchUserSchema } from "./dto/update-patch-user-schema";
import { ZodValidationPipe } from "src/pipes/ZodValidationPipe";

@Controller('users')
export class UserController {
    @Post()
    @UsePipes(new ZodValidationPipe(createUserSchema))
    async create(@Body() body: CreateUserDto) {
        return {body};
    }

    @Get()
    async readAll() {
        return {users: []}
    }

    @Get(':id')
    async readOne(@Param() params){
        return {user: {}, params}
    }

    @Put(':id')
    async update(@Body() body, @Param() params){
        return {body, params}
    }

    @Patch(':id')
    @UsePipes(new ZodValidationPipe(updatePatchUserSchema))
    async updatePartial(@Body() body: UpdatePatchUserDto, @Param() params){
        // console.log(body)
        return {body, params}
    }

    @Delete(':id')
    async delete(@Param() params){
        return {params}
    }
}