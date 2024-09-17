import { Injectable } from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { InjectModel } from '@nestjs/sequelize';
import { FileService } from 'src/file/file.service';
import { Content } from './entities/content.entity';
import { Screen } from 'src/screen/entities/screen.entity';

@Injectable()
export class ContentService {
  constructor(
    @InjectModel(Content) private readonly contentService: typeof Content,
    private readonly fileService: FileService,
    @InjectModel(Screen)
    private readonly screenModel: typeof Screen,
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
    return content;
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

  findOne(id: number) {
    return `This action returns a #${id} content`;
  }

  update(id: number, updateContentDto: UpdateContentDto) {
    return `This action updates a #${id} content`;
  }

  remove(id: number) {
    return `This action removes a #${id} content`;
  }
}
