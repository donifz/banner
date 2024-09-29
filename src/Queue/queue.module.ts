import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { QueueService } from './queue.service';
import { ContentModule } from 'src/content/content.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'contentQueue', // The queue name used in QueueService
    }),
    ContentModule, // Importing ContentModule to interact with the content
  ],
  providers: [QueueService],
  exports: [QueueService],
})
export class QueueModule {}
