import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Producer } from '../producers/producer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Producer)
    private readonly producerRepository: Repository<Producer>,
  ) {}

  async getTotals() {
    const totalFarms = await this.producerRepository.count();

    const totalHectares = await this.producerRepository
      .createQueryBuilder('producer')
      .select('SUM(producer.totalArea)', 'totalArea')
      .getRawOne();

    const farmsByState = await this.producerRepository
      .createQueryBuilder('producer')
      .select('producer.state', 'state')
      .addSelect('COUNT(producer.id)', 'count')
      .groupBy('producer.state')
      .getRawMany();

    const farmsByCulture = await this.producerRepository
      .createQueryBuilder('producer')
      .leftJoinAndSelect('producer.cultures', 'culture')
      .select('culture.name', 'cultureName')
      .addSelect('COUNT(producer.id)', 'count')
      .groupBy('culture.name')
      .getRawMany();

    const landUsage = await this.producerRepository
      .createQueryBuilder('producer')
      .select('SUM(producer.arableArea)', 'totalArableArea')
      .addSelect('SUM(producer.vegetationArea)', 'totalVegetationArea')
      .getRawOne();

    return {
      totalFarms,
      totalHectares: totalHectares.totalArea,
      farmsByState: farmsByState.map(stateData => ({
        state: stateData.state,
        count: Number(stateData.count),
      })),
      farmsByCulture: farmsByCulture.map(cultureData => ({
        cultureName: cultureData.cultureName,
        count: Number(cultureData.count),
      })),
      landUsage: {
        totalArableArea: Number(landUsage.totalArableArea),
        totalVegetationArea: Number(landUsage.totalVegetationArea),
      },
    };
  }
}
