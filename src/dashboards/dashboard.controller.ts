import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  @ApiOperation({ summary: 'Consulta estatísticas' })
  getTotals() {
    return this.dashboardService.getTotals();
  }
}
