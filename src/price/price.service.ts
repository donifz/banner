import { Injectable } from '@nestjs/common';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Price } from './entities/price.entity';

@Injectable()
export class PriceService {
  constructor(
    @InjectModel(Price) private readonly priceService: PriceService,
  ) {}

  create(createPriceDto: CreatePriceDto) {
    return this.priceService.create(createPriceDto);
  }

  findAll() {
    return this.priceService.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} price`;
  }

  async update(id: number, updatePriceDto: UpdatePriceDto) {
    console.log(id + ' updatedID');
    console.log(updatePriceDto);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return await this.priceService.update(updatePriceDto, {
      where: { id: 1 },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} price`;
  }
}
