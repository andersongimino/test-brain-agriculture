import { Test, TestingModule } from '@nestjs/testing';
import { CultureService } from './culture.service';
import { Culture } from './culture.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateCultureDto } from './dto/create-culture.dto';

describe('CultureService', () => {
  let service: CultureService;
  let repository: Repository<Culture>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CultureService,
        {
          provide: getRepositoryToken(Culture),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CultureService>(CultureService);
    repository = module.get<Repository<Culture>>(getRepositoryToken(Culture));
  });

  describe('create', () => {
    it('should create and return a new culture', async () => {
      const createCultureDto: CreateCultureDto = { name: 'New Culture' };

      const culture = { id: '1', name: 'New Culture' };

      jest.spyOn(repository, 'create').mockReturnValue(culture as any);
      jest.spyOn(repository, 'save').mockResolvedValue(culture);

      const result = await service.create(createCultureDto);

      expect(result).toEqual(culture);
      expect(repository.create).toHaveBeenCalledWith(createCultureDto);
      expect(repository.save).toHaveBeenCalledWith(culture);
    });
  });
});
