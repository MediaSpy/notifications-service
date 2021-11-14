import { LogLevels, SimpleLogger } from '@mediaspy/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap(): Promise<number> {
  const app = await NestFactory.create(AppModule, { logger: false });
  app.enableCors();
  app.enableShutdownHooks();

  const configService = app.get(ConfigService);
  const logLevels = configService.get<LogLevels>('logger.logLevels');
  app.useLogger(new SimpleLogger({ logLevels }));

  const isDeployment = process.env.NODE_ENV === 'local';
  if (isDeployment) {
    app.setGlobalPrefix('/api/notifications');
  }

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Notifications service')
    .setDescription('Notifications service API description')
    .setVersion('1.0')
    .addTag('notifications')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'accessToken')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig, { ignoreGlobalPrefix: true });
  SwaggerModule.setup('docs/notifications', app, document);

  const port = configService.get<number>('app.port');
  await app.listen(port);
  return port;
}

bootstrap().then((port) => {
  console.log(`Server listening at http://localhost:${port}`);
});
