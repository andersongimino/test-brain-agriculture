import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCultureDto } from './dto/create-culture.dto';
import { Culture } from './culture.entity';

@Injectable()
export class CultureService {
  constructor(
    @InjectRepository(Culture)
    private readonly cultureRepository: Repository<Culture>
  ) {}

  async create(createCultureDto: CreateCultureDto): Promise<Culture> {
    const culture = this.cultureRepository.create({
      ...createCultureDto,
    });

    return this.cultureRepository.save(culture);
  }
}
