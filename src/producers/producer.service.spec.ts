import { Test, TestingModule } from '@nestjs/testing';
import { ProducerService } from './producer.service';
import { Producer } from './producer.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateProducerDto } from './dto/create-producer.dto';
import { Culture } from '../cultures/culture.entity';
import { UpdateProducerDto } from './dto/update-producer.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('ProducerService', () => {
  let service: ProducerService;
  let producerRepository: Repository<Producer>;
  let cultureRepository: Repository<Culture>;

  beforeEach(async () => {
    const mockProducerRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      remove: jest.fn(),
    };

    const mockCultureRepository = {
      findByIds: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProducerService,
        {
          provide: getRepositoryToken(Producer),
          useValue: mockProducerRepository,
        },
        {
          provide: getRepositoryToken(Culture),
          useValue: mockCultureRepository,
        },
      ],
    }).compile();

    service = module.get<ProducerService>(ProducerService);
    producerRepository = module.get<Repository<Producer>>(getRepositoryToken(Producer));
    cultureRepository = module.get<Repository<Culture>>(getRepositoryToken(Culture));
  });

  describe('create', () => {
    it('should create a producer with valid data', async () => {
      const createProducerDto: CreateProducerDto = {
        cpfCnpj: '10067734448',
        nameProducer: 'Anderson Gimino',
        nameFarm: 'Balerina Farm',
        city: 'Recife',
        state: 'Pernambuco',
        totalArea: 100,
        arableArea: 50,
        vegetationArea: 50,
        culturesIds: ['1', '2'],
      };

      const cultures: Culture[] = [{ id: '1', name: 'Culture1' }, { id: '2', name: 'Culture2' }];
      const producer = { id: '1', ...createProducerDto, cultures };

      jest.spyOn(cultureRepository, 'findByIds').mockResolvedValue(cultures);
      jest.spyOn(producerRepository, 'create').mockReturnValue(producer as any);
      jest.spyOn(producerRepository, 'save').mockResolvedValue(producer);

      const result = await service.create(createProducerDto);

      expect(result).toEqual(producer);
      expect(cultureRepository.findByIds).toHaveBeenCalledWith(['1', '2']);
      expect(producerRepository.create).toHaveBeenCalledWith({
        ...createProducerDto,
        cultures,
      });
      expect(producerRepository.save).toHaveBeenCalledWith(producer);
    });

    it('should throw BadRequestException if area validation fails', async () => {
      const createProducerDto: CreateProducerDto = {
        cpfCnpj: '10067734448',
        nameProducer: 'Anderson Gimino',
        nameFarm: 'Balerina Farm',
        city: 'Recife',
        state: 'Pernambuco',
        totalArea: 100,
        arableArea: 60,
        vegetationArea: 50,
        culturesIds: ['1', '2'],
      };

      await expect(service.create(createProducerDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('should return an array of producers', async () => {
      const producers: Producer[] = [{
        id: '1',
        cpfCnpj: '10067734448',
        nameProducer: 'Anderson Gimino',
        nameFarm: 'Balerina Farm',
        city: 'Recife',
        state: 'Pernambuco',
        totalArea: 100,
        arableArea: 60,
        vegetationArea: 40,
        cultures: [{id: '1', name: 'Soy'}],
      }];
      jest.spyOn(producerRepository, 'find').mockResolvedValue(producers);

      const result = await service.findAll();

      expect(result).toEqual(producers);
      expect(producerRepository.find).toHaveBeenCalledWith({ relations: ['cultures'] });
    });
  });

  describe('findOne', () => {
    it('should return a producer if found', async () => {
      const producer = { id: '1', name: 'Producer1' };
      jest.spyOn(producerRepository, 'findOne').mockResolvedValue(producer as any);

      const result = await service.findOne('1');

      expect(result).toEqual(producer);
      expect(producerRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
        relations: ['cultures'],
      });
    });

    it('should throw NotFoundException if producer not found', async () => {
      jest.spyOn(producerRepository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update and return the producer', async () => {
      const producerResponse: Producer = {
        id: '1',
        cpfCnpj: '10067734448',
        nameProducer: 'Anderson Gimino',
        nameFarm: 'Balerina Farm',
        city: 'Recife',
        state: 'Pernambuco',
        totalArea: 100,
        arableArea: 60,
        vegetationArea: 40,
        cultures: [{id: '1', name: 'Soy'}],
      };
      const updateProducerDto: UpdateProducerDto = {
        cpfCnpj: '10067734448',
        nameProducer: 'Anderson Gimino',
        nameFarm: 'Balerina Farm',
        city: 'Recife',
        state: 'Pernambuco',
        totalArea: 100,
        arableArea: 60,
        vegetationArea: 40,
        culturesIds: ['1'],
      };

      const producer = { id: '1', ...updateProducerDto, cultures: [{id: '1', name: 'Soy'}] };
      jest.spyOn(service, 'findOne').mockResolvedValue(producer as any);
      jest.spyOn(cultureRepository, 'findByIds').mockResolvedValue([{ id: '1', name: 'Soy' }]);
      jest.spyOn(producerRepository, 'save').mockResolvedValue(producerResponse);

      const result = await service.update('1', updateProducerDto);
      expect(cultureRepository.findByIds).toHaveBeenCalledWith(['1']);
      expect(producerRepository.save).toHaveBeenCalledWith(producer);
    });

    it('should throw BadRequestException if area validation fails on update', async () => {
      const updateProducerDto: UpdateProducerDto = {
        cpfCnpj: '10067734448',
        nameProducer: 'Anderson Gimino',
        nameFarm: 'Balerina Farm',
        city: 'Recife',
        state: 'Pernambuco',
        totalArea: 100,
        arableArea: 60,
        vegetationArea: 50,
        culturesIds: [''],
      };

      await expect(service.update('1', updateProducerDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('remove', () => {
    it('should remove the producer', async () => {
      const producer = { id: '1', name: 'Producer1' };
      jest.spyOn(service, 'findOne').mockResolvedValue(producer as any);
      jest.spyOn(producerRepository, 'remove').mockResolvedValue(producer as any);

      await service.remove('1');

      expect(producerRepository.remove).toHaveBeenCalledWith(producer);
    });
  });

  describe('validateArea', () => {
    it('should throw BadRequestException if arable and vegetation area exceed total area', () => {
      expect(() =>
        service['validateArea'](60, 50, 100),
      ).toThrow(BadRequestException);
    });

    it('should not throw an error if areas are valid', () => {
      expect(() =>
        service['validateArea'](50, 30, 100),
      ).not.toThrow();
    });
  });
});
