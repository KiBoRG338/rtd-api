import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ValidationPipe } from './utils/validation.pipe';
import { ResponseMiddleware } from './utils/responses.middleware';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  const options = new DocumentBuilder().addSecurity('Basic',
    {
      type: "apiKey",
      in: "header",
      name: "Authorization",
    }
  )
  .setTitle('Project')
  .setDescription('The Project API description')
  .setVersion('1.0')
  .addTag('Project')
  .build();
  
const document = SwaggerModule.createDocument(app, options);

SwaggerModule.setup('api', app, document);


  app.use(ResponseMiddleware);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
