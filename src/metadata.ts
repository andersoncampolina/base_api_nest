/* eslint-disable */
export default async () => {
    const t = {};
    return { "@nestjs/swagger": { "models": [[import("./user/dto/user.dto"), { "CreateUserDto": { name: { required: true, type: () => String }, email: { required: true, type: () => String }, password: { required: true, type: () => String } } }]], "controllers": [[import("./app.controller"), { "AppController": { "getHello": { type: String } } }], [import("./user/user.controller"), { "UserController": { "registerUser": {} } }], [import("./auth/auth.controller"), { "AuthController": { "registerUser": {} } }]] } };
};