import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCultureDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'Soy', description: 'Nome do tipo de cultura' })
  name: string;
}
