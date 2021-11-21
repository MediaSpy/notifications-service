import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserEmailSettings, UserEmailSettingsSchema } from './models';
import { SettingsController } from './settings.controller';
import { SettingsRepository } from './settings.repository';
import { SettingsService } from './settings.service';

@Module({
  controllers: [SettingsController],
  providers: [SettingsService, SettingsRepository],
  imports: [
    MongooseModule.forFeature([{ name: UserEmailSettings.name, schema: UserEmailSettingsSchema }]),
  ],
})
export class SettingsModule {}
