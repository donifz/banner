import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Post()
  @UseInterceptors(FileInterceptor('img'))
  create(@Body() createContentDto: CreateContentDto, @UploadedFile() img: any) {
    return this.contentService.create({ ...createContentDto, img });
  }

  @Post(':contentId/screens')
  addScreensToContent(
    @Param('contentId') contentId: number,
    @Body('screenIds') screenIds: number[],
  ) {
    return this.contentService.addScreensToContent(contentId, screenIds);
  }

  @Get()
  findAll() {
    return this.contentService.findAll();
  }
  @Get('screen/:screenId')
  findContentsByScreen(@Param('screenId') screenId: number) {
    return this.contentService.getContentsByScreen(screenId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContentDto: UpdateContentDto) {
    return this.contentService.update(+id, updateContentDto);
  }
  @Patch('approve/:id')
  approve(@Param('id') id: string) {
    console.log(id, 'id approve');
    return this.contentService.approve(+id);
  }
  @Patch('pay/:id')
  pay(@Param('id') id: string) {
    console.log(id, 'id approve');
    return this.contentService.pay(+id);
  }

  @Delete(':id')
  remove() {
    return this.contentService.remove();
  }
  @Delete('remove-all')
  removeAll() {
    return this.contentService.removeAll();
  }
}
