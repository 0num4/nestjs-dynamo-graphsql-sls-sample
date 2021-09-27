import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
    credentials: true,
  });
  const options = new DocumentBuilder()
    .setTitle('nestjs-dynamo-graphsql-sls-sample')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('sample_api', app, document);

  await app.listen(3002);
}
bootstrap();
