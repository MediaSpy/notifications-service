import { Module } from '@nestjs/common';
import { SharedModule } from './modules/shared/shared.module';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [SharedModule, HealthModule],
})
export class AppModule {}
