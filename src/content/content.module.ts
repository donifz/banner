import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Price } from 'src/price/entities/price.entity';
import { Content } from './entities/content.entity';
import { FileService } from 'src/file/file.service';
import { ContentScreen } from './entities/contentScreen';
import { Screen } from 'src/screen/entities/screen.entity';
import { CronService } from 'src/Cron/cron.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Content, Price, Screen, ContentScreen]),
  ],
  exports: [ContentService, CronService],
  controllers: [ContentController],
  providers: [ContentService, FileService, CronService],
})
export class ContentModule {}
