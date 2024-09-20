import { Test, TestingModule } from '@nestjs/testing';
import { DashboardService } from './dashboard.service';
import { Producer } from '../producers/producer.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('DashboardService', () => {
  let service: DashboardService;
  let repository: Repository<Producer>;

  beforeEach(async () => {
    const mockQueryBuilder = {
      select: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      groupBy: jest.fn().mockReturnThis(),
      leftJoinAndSelect: jest.fn().mockReturnThis(), // Mock do leftJoinAndSelect
      getRawOne: jest.fn().mockResolvedValue({ totalArea: 1000, totalArableArea: 500, totalVegetationArea: 300 }),
      getRawMany: jest.fn().mockResolvedValue([{ state: 'SP', count: 10 }, { cultureName: 'Wheat', count: 20 }]),
    };

    const mockRepository = {
      count: jest.fn().mockResolvedValue(50),
      createQueryBuilder: jest.fn(() => mockQueryBuilder),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DashboardService,
        {
          provide: getRepositoryToken(Producer),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<DashboardService>(DashboardService);
    repository = module.get<Repository<Producer>>(getRepositoryToken(Producer));
  });

  describe('getTotals', () => {
    it('should return the totals correctly', async () => {
      await service.getTotals();
      expect(repository.count).toHaveBeenCalled();
      expect(repository.createQueryBuilder).toHaveBeenCalledTimes(4);
    });
  });
});
