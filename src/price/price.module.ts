import { Module } from '@nestjs/common';
import { PriceService } from './price.service';
import { PriceController } from './price.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Price } from './entities/price.entity';
import { Content } from 'src/content/entities/content.entity';

@Module({
  imports: [SequelizeModule.forFeature([Price, Content])],
  exports: [PriceService],
  controllers: [PriceController],
  providers: [PriceService],
})
export class PriceModule {}
