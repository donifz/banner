import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePriceDto {
  @IsNumber()
  price: number;
  @IsString()
  reason: string;

  @IsOptional()
  @IsBoolean()
  currentPrice?: boolean;
}
