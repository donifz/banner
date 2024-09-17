import {
  Column,
  DataType,
  Table,
  Model,
  BelongsToMany,
} from 'sequelize-typescript';
import { Screen } from 'src/screen/entities/screen.entity';
import { ContentScreen } from './contentScreen';

export enum Status {
  PENDING = 'pending',
  CHECKED = 'checked',
  PAYED = 'payed',
  PUBLISHED = 'published',
  ENDED = 'ended',
}

@Table({ tableName: 'contents' })
export class Content extends Model<Content> {
  @Column({
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    type: DataType.INTEGER,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  desc: string;

  @Column({ type: DataType.STRING, allowNull: false })
  img: string;

  @Column({ type: DataType.ENUM, values: Object.values(Status) })
  status: Status;

  @Column({ type: DataType.INTEGER, allowNull: false })
  hours: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  min: number;

  @BelongsToMany(() => Screen, () => ContentScreen)
  screens: Screen[];
}
