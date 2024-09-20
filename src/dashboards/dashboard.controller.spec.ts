import { Test, TestingModule } from '@nestjs/testing';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

describe('DashboardController', () => {
  let dashboardController: DashboardController;
  let dashboardService: DashboardService;

  beforeEach(async () => {
    const mockDashboardService = {
      getTotals: jest.fn().mockReturnValue({
        totalUsers: 100,
        totalSales: 200,
        totalRevenue: 300,
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [DashboardController],
      providers: [
        {
          provide: DashboardService,
          useValue: mockDashboardService,
        },
      ],
    }).compile();

    dashboardController = module.get<DashboardController>(DashboardController);
    dashboardService = module.get<DashboardService>(DashboardService);
  });

  describe('getTotals', () => {
    it('should return totals', () => {
      const result = dashboardController.getTotals();
      expect(result).toEqual({
        totalUsers: 100,
        totalSales: 200,
        totalRevenue: 300,
      });
      expect(dashboardService.getTotals).toHaveBeenCalled();
    });
  });
});
