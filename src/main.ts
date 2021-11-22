import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';
import { dump } from 'js-yaml';

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

  if (process.env.NODE_ENV !== 'production') {
    const options = new DocumentBuilder()
      .setTitle('test-api')
      .setDescription('')
      .addServer('localhost:3002')
      .setVersion('0.1.0')
      .addTag('test')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('_api', app, document);

    fs.writeFileSync('./swagger.yaml', dump(document, {}));
  }

  await app.listen(3002);
}
bootstrap();
