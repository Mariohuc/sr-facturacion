import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Currency } from '../enums/currency.enum';
import { PaymentCondition } from '../enums/payment-condition.enum';

class InvoiceDetailItem {
  @IsString()
  invoicing_id: string;
  @IsNumber()
  quantity: number;
  @IsNumber()
  discount: number;
  @IsString()
  product_description: string;
  @IsNumber()
  product_unit_value: number;
  @IsString()
  product_unit_code: string;
  @IsBoolean()
  product_apply_igv: boolean;
}

export class CreateInvoiceDto {
  @IsString()
  invoicing_id: string;
  @IsDate()
  @Type(() => Date)
  issue_date: Date;
  @IsDate()
  @Type(() => Date)
  due_date: Date;
  @IsEnum(Currency)
  currency: Currency;
  @IsEnum(PaymentCondition)
  payment_condition: PaymentCondition;
  @IsNumber()
  client_id: number;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => InvoiceDetailItem)
  details: InvoiceDetailItem[];
}
