import { IsNumber, IsString } from 'class-validator';

export class CreateClientDto {
  @IsString()
  name: string;
  @IsNumber()
  id_card_number: number;
  @IsString()
  address: string;
  @IsString()
  phone: string;
}
