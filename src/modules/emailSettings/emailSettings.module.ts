import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserEmailSettings, UserEmailSettingsSchema } from './models';
import { EmailSettingsController } from './emailSettings.controller';
import { EmailSettingsRepository } from './emailSettings.repository';
import { EmailSettingsService } from './emailSettings.service';

@Module({
  controllers: [EmailSettingsController],
  providers: [EmailSettingsService, EmailSettingsRepository],
  imports: [
    MongooseModule.forFeature([{ name: UserEmailSettings.name, schema: UserEmailSettingsSchema }]),
  ],
})
export class EmailSettingsModule {}
