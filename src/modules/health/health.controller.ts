import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService, MongooseHealthIndicator } from '@nestjs/terminus';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(
    private readonly healthService: HealthCheckService,
    private readonly mongo: MongooseHealthIndicator,
  ) {}

  @Get()
  @HttpCode(200)
  @HealthCheck()
  @ApiOperation({ summary: 'Audio service health status' })
  check() {
    return this.healthService.check([() => this.mongo.pingCheck('mongodb', { timeout: 5000 })]);
  }
}
