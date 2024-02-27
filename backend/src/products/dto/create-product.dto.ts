import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  description: string;
  @IsNumber()
  unit_value: number;
  @IsString()
  unit_code: string;
  @IsNumber()
  stock: number;
  @IsBoolean()
  apply_igv: boolean;
}
