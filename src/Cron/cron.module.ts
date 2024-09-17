import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { ContentService } from 'src/content/content.service';
import { ScreenService } from 'src/screen/screen.service';

@Module({
  imports: [],
  controllers: [],
  providers: [CronService],
  exports: [CronService, ContentService, ScreenService],
})
export class CronModule {}
