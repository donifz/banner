import { Column, DataType, Table, Model } from 'sequelize-typescript';

@Table({ tableName: 'price' })
export class Price extends Model<Price> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 100 })
  price: number;

  @Column({ type: DataType.STRING })
  reason: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  currentPrice: boolean;
}
