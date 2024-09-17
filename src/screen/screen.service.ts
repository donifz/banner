import { Injectable } from '@nestjs/common';
import { CreateScreenDto } from './dto/create-screen.dto';
import { UpdateScreenDto } from './dto/update-screen.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Screen } from './entities/screen.entity';

@Injectable()
export class ScreenService {
  constructor(
    @InjectModel(Screen) private readonly screenService: typeof Screen,
  ) {}
  create(createScreenDto: CreateScreenDto) {
    return this.screenService.create(createScreenDto);
  }

  findAll() {
    return this.screenService.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return `This action returns a #${id} screen`;
  }

  update(id: number, updateScreenDto: UpdateScreenDto) {
    return `This action updates a #${id} screen`;
  }

  remove(id: number) {
    return `This action removes a #${id} screen`;
  }
}
