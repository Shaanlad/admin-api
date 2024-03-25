import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdatePdtDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsOptional()
  price: number;
}
