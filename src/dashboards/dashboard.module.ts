import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { Culture } from '../cultures/culture.entity';
import { Producer } from '../producers/producer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Producer, Culture])],
  controllers: [DashboardController],
  providers: [DashboardService],
  exports: [DashboardService],
})
export class DashboardModule {}
