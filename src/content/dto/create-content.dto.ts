import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export enum Status {
  PENDING = 'pending',
  CHECKED = 'checked',
  PAYED = 'payed',
  PUBLISHED = 'published',
  ENDED = 'ended',
}

export class CreateContentDto {
  @IsString()
  desc: string;

  img: string | Express.Multer.File;

  @IsEnum(Status)
  status: Status;

  @IsNumber()
  @Min(1)
  @Max(24)
  hours: number;

  @IsNumber()
  @Min(1)
  @Max(60)
  min: number;

  @IsNotEmpty()
  screens: [];
}
