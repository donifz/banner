import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { ContentService } from 'src/content/content.service';

@Injectable()
export class QueueService {
  constructor(
    @InjectQueue('contentQueue') private contentQueue: Queue,
    private readonly contentService: ContentService,
  ) {}

  async addToQueue(contentId: number, delay: number) {
    // Добавление контента в очередь с задержкой, равной времени публикации
    await this.contentQueue.add('publish', { contentId }, { delay });
  }

  async processQueue() {
    // Обрабатываем очередь (например, каждые 60 секунд показываем контент)
    this.contentQueue.process('publish', async (job) => {
      const { contentId } = job.data;
      const content = await this.contentService.getContentById(contentId);
      if (content) {
        // Публикация контента, например через WebSocket
        this.contentService.publishToWebSocket(content);
      }
    });
  }
}
