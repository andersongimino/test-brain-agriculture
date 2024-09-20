import { Test, TestingModule } from '@nestjs/testing';
import { ProducerController } from './producer.controller';
import { ProducerService } from './producer.service';
import { CreateProducerDto } from './dto/create-producer.dto';
import { UpdateProducerDto } from './dto/update-producer.dto';

describe('ProducerController', () => {
  let producerController: ProducerController;
  let producerService: ProducerService;

  beforeEach(async () => {
    const mockProducerService = {
      create: jest.fn().mockImplementation((dto: CreateProducerDto) => ({ id: '1', ...dto })),
      findAll: jest.fn().mockResolvedValue([{ id: '1', nameProducer: 'Anderson Gimino' }]),
      findOne: jest.fn().mockImplementation((id: string) => ({ id, nameProducer: 'Anderson Gimino' })),
      update: jest.fn().mockImplementation((id: string, dto: UpdateProducerDto) => ({ id, ...dto })),
      remove: jest.fn().mockResolvedValue({}),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProducerController],
      providers: [
        {
          provide: ProducerService,
          useValue: mockProducerService,
        },
      ],
    }).compile();

    producerController = app.get<ProducerController>(ProducerController);
    producerService = app.get<ProducerService>(ProducerService);
  });


  describe('create', () => {
    it('should create a producer', async () => {
      const createProducerDto: CreateProducerDto = { 
        cpfCnpj: '10067734448',
        nameProducer: 'Anderson Gimino',
        nameFarm: 'Balerina Farm',
        city: 'Recife',
        state: 'Pernambuco',
        totalArea: 1000,
        arableArea: 800,
        vegetationArea: 200,
        culturesIds: ['447eab2d-0031-4e16-8821-99481d715949']
      };
      expect(await producerController.create(createProducerDto)).toEqual({
        id: '1',
        ...createProducerDto,
      });
      expect(producerService.create).toHaveBeenCalledWith(createProducerDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of producers', async () => {
      expect(await producerController.findAll()).toEqual([{ id: '1', nameProducer: 'Anderson Gimino' }]);
      expect(producerService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single producer', async () => {
      const id = '1';
      expect(await producerController.findOne(id)).toEqual({ id, nameProducer: 'Anderson Gimino' });
      expect(producerService.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should update a producer', async () => {
      const updateProducerDto: UpdateProducerDto = { 
        cpfCnpj: '10067734448',
        nameProducer: 'Anderson Gimino',
        nameFarm: 'Balerina Farm',
        city: 'Recife',
        state: 'Pernambuco',
        totalArea: 1000,
        arableArea: 800,
        vegetationArea: 200,
        culturesIds: ['447eab2d-0031-4e16-8821-99481d715949']
      };
      const id = '1';
      expect(await producerController.update(id, updateProducerDto)).toEqual({
        id,
        ...updateProducerDto,
      });
      expect(producerService.update).toHaveBeenCalledWith(id, updateProducerDto);
    });
  });

  describe('remove', () => {
    it('should remove a producer', async () => {
      const id = '1';
      expect(await producerController.remove(id)).toEqual({});
      expect(producerService.remove).toHaveBeenCalledWith(id);
    });
  });
});
