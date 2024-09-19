import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContentModule } from './content/content.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { PriceModule } from './price/price.module';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ScreenModule } from './screen/screen.module';
import { Content } from './content/entities/content.entity';
import { Price } from './price/entities/price.entity';
import { Screen } from './screen/entities/screen.entity';
import { ContentScreen } from './content/entities/contentScreen';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.PGHOST || 'localhost',
      port: parseInt(process.env.PGPORT, 10) || 5432,
      username: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'miramax92',
      database: process.env.POSTGRES_DB || 'banner',
      autoLoadModels: true,
      models: [Content, Price, Screen, ContentScreen],
    }),
    ContentModule,
    PriceModule,
    FileModule,
    ScreenModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    console.log(
      'Database Host:+++++++++++++++++++++++++++++++++++++++++++++++++++++',
      process.env.PGHOST,
    );
  }
}
