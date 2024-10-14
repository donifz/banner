import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import { Status, UpdateContentDto } from './dto/update-content.dto';
import { InjectModel } from '@nestjs/sequelize';
import { FileService } from 'src/file/file.service';
import { Content } from './entities/content.entity';
import { Screen } from 'src/screen/entities/screen.entity';
import { BroadcastService } from 'src/Broadcast/broadcast.service';

@Injectable()
export class ContentService {
  constructor(
    @InjectModel(Content) private readonly contentService: typeof Content,
    private readonly fileService: FileService,
    @InjectModel(Screen)
    private readonly screenModel: typeof Screen,
    private readonly broadcastService: BroadcastService,
  ) {}
  async create(createContentDto: CreateContentDto) {
    const file = this.fileService.create(
      createContentDto.img as unknown as Express.Multer.File,
    );
    const content = await this.contentService.create({
      ...createContentDto,
      img: file as string,
    });
    content.$set('screens', [...createContentDto.screens]);

    const contents = await this.findAll();
    this.broadcastService.sendToClients(contents);
    return content;
  }
  async getContentById(contentId: number): Promise<Content> {
    // Получение контента по ID
    return this.contentService.findByPk(contentId);
  }

  async getContentsByScreen(screenId: number) {
    const screen = await this.screenModel.findByPk(screenId, {
      include: [{ model: Content, where: { status: Status.PUBLISHED } }], // Include the associated Content
    });

    if (!screen) {
      throw new NotFoundException(`Screen with id ${screenId} not found`);
    }

    return screen.contents; // Return the contents associated with the screen
  }

  async publishToWebSocket(content: Content) {
    // Публикация контента через WebSocket
    this.broadcastService.sendToClients(content);
  }
  async addScreensToContent(
    contentId: number,
    screenIds: number[],
  ): Promise<void> {
    const content = await this.contentService.findByPk(contentId);
    if (content) {
      const screens = await this.screenModel.findAll({
        where: {
          id: screenIds,
        },
      });
      await content.$set('screens', screens);
    }
  }

  findAll() {
    return this.contentService.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return await this.contentService.findByPk(id);
  }

  update(id: number, updateContentDto: UpdateContentDto) {
    return `This action updates a #${id} content${JSON.stringify(updateContentDto)}`;
  }
  async approve(id: number) {
    const changedStatus = { status: Status.CHECKED };
    const [numberOfAffectedRows, [updatedContent]] =
      await this.contentService.update(
        { ...changedStatus },
        { where: { id }, returning: true },
      );
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException(`Content with id ${id} not found`);
    }
    const contents = await this.findAll();
    this.broadcastService.sendToClients(contents);
    return updatedContent;
  }
  async pay(id: number) {
    const changedStatus = { status: Status.PUBLISHED };
    const [numberOfAffectedRows, [updatedContent]] =
      await this.contentService.update(
        { ...changedStatus },
        { where: { id }, returning: true },
      );
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException(`Content with id ${id} not found`);
    }
    const content = await this.contentService.findByPk(id, {
      include: [Screen],
    });
    // Loop through each screen asynchronously
    console.log(content, 'contetn');

    for (const screen of content.screens) {
      // Find each screen by its ID and include associated contents
      const fullScreen = await this.screenModel.findByPk(screen.id, {
        include: [{ model: Content, where: { status: Status.PUBLISHED } }],
      });
      console.log(fullScreen, 'fullScreen');

      this.broadcastService.sendToClientsScreenContents(fullScreen);
      // Perform any additional operations with `fullScreen` if needed
    }
    return updatedContent;
  }

  async remove() {
    await this.contentService.destroy({
      where: {},
    });
  }
  async removeAll() {
    await this.contentService.destroy({
      where: {},

      // No condition means all records will be deleted
    });
  }
}
