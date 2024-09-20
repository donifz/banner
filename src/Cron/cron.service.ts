import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Content } from 'src/content/entities/content.entity';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor(
    @InjectModel(Content) private readonly contentModel: typeof Content,
  ) {
    console.log('CronService');
  }

  // Cron-задача, которая выполняется каждый день в полночь
  @Cron('*/3 * * * *')
  async handleCron() {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    this.logger.debug('Running daily media deletion task...');
    console.log('Running daily media deletion task');

    try {
      // Находим все медиафайлы, которые были созданы более 24 часов назад
      const mediaToDelete = await this.contentModel.findAll({
        where: {
          createdAt: {
            [Op.lt]: oneDayAgo,
          },
        },
      });

      // Удаляем найденные медиафайлы
      for (const media of mediaToDelete) {
        await this.contentModel.destroy({ where: { id: media.id } });
        this.logger.debug(`Deleted media with ID: ${media.id}`);
      }
    } catch (error) {
      this.logger.error('Error in deleting media files:', error);
    }
  }
}
