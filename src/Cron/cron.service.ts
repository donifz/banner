import { Injectable } from '@nestjs/common';
import * as cron from 'node-cron';
// import { LedScreensService } from '../led-screens/led-screens.service';
import { ContentService } from 'src/content/content.service';

@Injectable()
export class CronService {
  constructor(
    private readonly contentService: ContentService,
    // private readonly ledScreensService: LedScreensService,
  ) {
    this.scheduleTasks();
  }

  scheduleTasks() {
    cron.schedule('*/5 * * * *', () => {
      // this.updateLedScreens();
    });
  }

  // async updateLedScreens() {
  //   const approvedMedia = await this.contentService.findApproved();
  //   // Логика для выбора экрана и медиа
  //   const screens = ['1', '2', '3']; // список идентификаторов экранов
  //   approvedMedia.forEach(media => {
  //     screens.forEach(screenId => {
  //       this.ledScreensService.updateScreen(screenId, media.url, media.duration);
  //     });
  //   });
  // }
}
