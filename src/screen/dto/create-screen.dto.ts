import { IsLatitude, IsLongitude, IsString } from 'class-validator';

export class CreateScreenDto {
  @IsString()
  type: string;

  @IsString()
  address: string;

  @IsLongitude()
  longitude: string;

  @IsLatitude()
  latitude: string;
}
