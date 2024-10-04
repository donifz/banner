import { PartialType } from '@nestjs/mapped-types';
import { CreateContentDto } from './create-content.dto';

export enum Status {
  PENDING = 'pending',
  CHECKED = 'checked',
  PAYED = 'payed',
  PUBLISHED = 'published',
  ENDED = 'ended',
}
export class UpdateContentDto extends PartialType(CreateContentDto) {
  desc?: string;

  img?: string | Express.Multer.File;

  status?: Status;

  hours?: number;

  min?: number;

  screens?: [];
}
