import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { ContentService } from 'src/content/content.service';
import { ContentModule } from 'src/content/content.module';

@Module({
  imports: [ContentModule],
  controllers: [],
  providers: [ContentModule, CronService],
  exports: [ContentService, CronService],
})
export class CronModule {}
