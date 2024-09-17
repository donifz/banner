import { Module } from '@nestjs/common';
import { ScreenService } from './screen.service';
import { ScreenController } from './screen.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Screen } from './entities/screen.entity';
import { Content } from 'src/content/entities/content.entity';
import { ContentScreen } from 'src/content/entities/contentScreen';

@Module({
  imports: [SequelizeModule.forFeature([Screen, Content, ContentScreen])],
  controllers: [ScreenController],
  providers: [ScreenService],
})
export class ScreenModule {}
