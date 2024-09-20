import { IsNotEmpty, Validate, IsNumber, Min, IsNumberString, Max } from 'class-validator';
import { IsCpfOrCnpj } from '../../validators/is-cpf-cnpj.validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProducerDto {
  @IsNotEmpty()
  @IsNumberString()
  @Validate(IsCpfOrCnpj)
  @ApiProperty({ example: '28069164026', description: 'Cpf ou Cnpj do produtor' })
  cpfCnpj: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'João da silva', description: 'Nome do produtor' })
  nameProducer: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Fazenda do João', description: 'Nome da fazenda' })
  nameFarm: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Recife', description: 'Cidade do produtor' })
  city: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'PE', description: 'Estado do produtor' })
  state: string;

  @IsNumber()
  @Min(0)
  @ApiProperty({ example: 1000, description: 'Área total em hectares da fazenda' })
  totalArea: number;

  @IsNumber()
  @Min(0)
  @ApiProperty({ example: 800, description: 'Área agricultável em hectares' })
  arableArea: number;

  @IsNumber()
  @Min(0)
  @ApiProperty({ example: 200, description: 'Área de vegetação em hectares' })
  vegetationArea: number;

  @IsNotEmpty()
  @ApiProperty({ example: ['ea847826-d16f-47da-814b-40f3c4ab50fa'], description: 'Culturas plantadas' })
  culturesIds: string[];
}
