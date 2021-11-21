import { AuthStrategy } from '@mediaspy/auth-tools';
import * as config from '@mediaspy/config';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import configSchema from '../../config/schema/config.schema';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [
        config.load({
          validationSchema: configSchema,
        }),
      ],
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const host = configService.get<string>('services.mongodb.host');
        const port = configService.get<string>('services.mongodb.port');
        return {
          uri: `mongodb://${host}:${port}`,
          dbName: configService.get<string>('services.mongodb.database'),
          user: configService.get<string>('services.mongodb.username'),
          pass: configService.get<string>('services.mongodb.password'),
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: 'AUTH_STRATEGY',
      useFactory: (configService: ConfigService) => {
        const secret = configService.get<string>('auth.jwt.secret');
        return new AuthStrategy({ secret });
      },
      inject: [ConfigService],
    },
  ],
})
export class SharedModule {}
