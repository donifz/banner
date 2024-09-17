import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as uuid from 'uuid';
import * as fs from 'fs';

@Injectable()
export class FileService {
  constructor() {}
  create(file: Express.Multer.File): unknown {
    try {
      const extennsion = file.originalname.split('.').pop();
      const fileName = uuid.v4() + '.' + extennsion;
      const filepath = path.resolve(__dirname, '../../', 'uploads');
      if (!fs.existsSync(filepath)) {
        fs.mkdirSync(filepath, { recursive: true });
      }
      fs.writeFileSync(path.resolve(filepath, fileName), file.buffer);
      return '/' + fileName;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
