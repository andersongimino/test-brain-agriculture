import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Producer } from './producer.entity';
import { Repository } from 'typeorm';
import { CreateProducerDto } from './dto/create-producer.dto';
import { Culture } from '../cultures/culture.entity';
import { UpdateProducerDto } from './dto/update-producer.dto';

@Injectable()
export class ProducerService {
  constructor(
    @InjectRepository(Producer)
    private readonly produtorRepository: Repository<Producer>,
    @InjectRepository(Culture)
    private readonly culturaRepository: Repository<Culture>,
  ) {}

  async create(createProdutorDto: CreateProducerDto): Promise<Producer> {
    const { totalArea, arableArea, vegetationArea, culturesIds } = createProdutorDto;

    this.validateArea(arableArea, vegetationArea, totalArea);

    const cultures = await this.culturaRepository.findByIds(culturesIds);

    const producer = this.produtorRepository.create({
      ...createProdutorDto,
      cultures,
    });

    return this.produtorRepository.save(producer);
  }

  async findAll(): Promise<Producer[]> {
    return this.produtorRepository.find({ relations: ['cultures'] });
  }

  async findOne(id: string): Promise<Producer> {
    const producer = await this.produtorRepository.findOne({
      where: { id },
      relations: ['cultures'],
    });

    if (!producer) {
      throw new NotFoundException(`Produtor com ID ${id} não encontrado.`);
    }

    return producer;
  }

  async update(id: string, updateProdutorDto: UpdateProducerDto): Promise<Producer> {
    const { totalArea, arableArea, vegetationArea, culturesIds } = updateProdutorDto;

    this.validateArea(arableArea, vegetationArea, totalArea);

    const producer = await this.findOne(id);

    const cultures = await this.culturaRepository.findByIds(culturesIds);

    Object.assign(producer, {
      ...updateProdutorDto,
      cultures,
    });

    return this.produtorRepository.save(producer);
  }

  async remove(id: string): Promise<void> {
    const producer = await this.findOne(id);

    await this.produtorRepository.remove(producer);
  }

  private validateArea(arableArea: number, vegetationArea: number, totalArea: number) {
    if (arableArea + vegetationArea > totalArea) {
      throw new BadRequestException(
        'A soma das áreas não pode ser maior que a área total.'
      );
    }
  }
}
