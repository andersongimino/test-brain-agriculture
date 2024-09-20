import { IsNotEmpty, IsOptional, IsNumber, Min, Validate } from 'class-validator';
import { IsCpfOrCnpj } from '../../validators/is-cpf-cnpj.validator';

export class UpdateProducerDto {
  @IsOptional()
  @Validate(IsCpfOrCnpj)
  cpfCnpj?: string;

  @IsOptional()
  @IsNotEmpty()
  nameProducer?: string;

  @IsOptional()
  @IsNotEmpty()
  nameFarm?: string;

  @IsOptional()
  @IsNotEmpty()
  city?: string;

  @IsOptional()
  @IsNotEmpty()
  state?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  totalArea?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  arableArea?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  vegetationArea?: number;

  @IsOptional()
  culturesIds?: string[];
}
