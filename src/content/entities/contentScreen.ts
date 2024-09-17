import { Column, ForeignKey, Table, Model } from 'sequelize-typescript';
import { Content } from './content.entity';
import { Screen } from 'src/screen/entities/screen.entity';

@Table({ tableName: 'ContentScreen' })
export class ContentScreen extends Model {
  @ForeignKey(() => Content)
  @Column
  contentId: number;

  @ForeignKey(() => Screen)
  @Column
  screenId: number;
}
