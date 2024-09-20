import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { ProducerService } from './producer.service';
import { CreateProducerDto } from './dto/create-producer.dto';
import { UpdateProducerDto } from './dto/update-producer.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('producer')
@Controller('producer')
export class ProducerController {
  constructor(private readonly producerService: ProducerService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastra produtor' })
  create(@Body() createProducerDto: CreateProducerDto) {
    return this.producerService.create(createProducerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Consulta todos os produtores' })
  findAll() {
    return this.producerService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Consulta produtor por id' })
  findOne(@Param('id') id: string) {
    return this.producerService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza produtor' })
  update(@Param('id') id: string, @Body() updateProducerDto: UpdateProducerDto) {
    return this.producerService.update(id, updateProducerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta produtor' })
  remove(@Param('id') id: string) {
    return this.producerService.remove(id);
  }
}
