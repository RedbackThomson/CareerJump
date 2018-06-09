import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table
export class BaseModel<T> extends Model<T> {
  @PrimaryKey
  @Column
  id: number;
}