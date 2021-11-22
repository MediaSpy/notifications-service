import { Module } from '@nestjs/common';
import { SharedModule } from './modules/shared/shared.module';
import { HealthModule } from './modules/health/health.module';
import { EmailSettingsModule } from './modules/emailSettings/emailSettings.module';

@Module({
  imports: [SharedModule, HealthModule, EmailSettingsModule],
})
export class AppModule {}
