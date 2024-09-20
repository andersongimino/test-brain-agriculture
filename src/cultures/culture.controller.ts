import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { CultureService } from './culture.service';
import { CreateCultureDto } from './dto/create-culture.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('culture')
@Controller('culture')
export class CultureController {
  constructor(private readonly cultureService: CultureService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastra cultura' })
  create(@Body() createCultureDto: CreateCultureDto) {
    return this.cultureService.create(createCultureDto);
  }
}
