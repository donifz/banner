import {
  Column,
  DataType,
  Table,
  Model,
  BelongsToMany,
} from 'sequelize-typescript';
import { Content } from 'src/content/entities/content.entity';
import { ContentScreen } from 'src/content/entities/contentScreen';

@Table({ tableName: 'screen' })
export class Screen extends Model<Screen> {
  @Column({
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    type: DataType.INTEGER,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  type: string;

  @Column({ type: DataType.STRING, allowNull: false })
  address: string;

  @Column({ type: DataType.STRING, allowNull: false })
  longitude: string;

  @Column({ type: DataType.STRING, allowNull: false })
  latitude: string;

  @BelongsToMany(() => Content, () => ContentScreen)
  contents: Content[];
}
