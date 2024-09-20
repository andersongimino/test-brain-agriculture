import { Test, TestingModule } from '@nestjs/testing';
import { CultureController } from './culture.controller';
import { CultureService } from './culture.service';
import { CreateCultureDto } from './dto/create-culture.dto';

describe('CultureController', () => {
  let cultureController: CultureController;
  let cultureService: CultureService;

  beforeEach(async () => {
    const mockCultureService = {
      create: jest.fn().mockImplementation((dto: CreateCultureDto) => {
        return {
          id: '1',
          ...dto,
        };
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CultureController],
      providers: [
        {
          provide: CultureService,
          useValue: mockCultureService,
        },
      ],
    }).compile();

    cultureController = module.get<CultureController>(CultureController);
    cultureService = module.get<CultureService>(CultureService);
  });

  describe('create', () => {
    it('should create a new culture', async () => {
      const createCultureDto: CreateCultureDto = { name: 'New Culture' };

      expect(await cultureController.create(createCultureDto)).toEqual({
        id: '1',
        ...createCultureDto,
      });

      expect(cultureService.create).toHaveBeenCalledWith(createCultureDto);
    });
  });
});
