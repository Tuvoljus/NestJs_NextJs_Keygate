"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    console.log('Main.ts:_PUBLIC_FRONTEND_URL', process.env.PUBLIC_FRONTEND_URL);
    app.enableCors({
        origin: process.env.PUBLIC_FRONTEND_URL || 'http://localhost:3000',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
        allowedHeaders: 'Content-Type, Authorization'
    });
    await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
