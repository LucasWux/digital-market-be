import { Controller, Get } from '@nestjs/common';
import { HealthCheckService } from './health-check.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';

@ApiTags('Health Check')
@Controller('health-check')
export class HealthCheckController {
  constructor(private readonly healthCheckService: HealthCheckService) {}

  @Get()
  @Public()
  async healthCheck() {
    return this.healthCheckService.healthCheck();
  }
}
