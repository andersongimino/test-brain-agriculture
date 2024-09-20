import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProducerController } from './producer.controller';
import { ProducerService } from './producer.service';
import { Producer } from './producer.entity';
import { Culture } from '../cultures/culture.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Producer, Culture])],
  controllers: [ProducerController],
  providers: [ProducerService],
  exports: [ProducerService],
})
export class ProducerModule {}
