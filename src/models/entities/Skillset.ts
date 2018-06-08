import {AllowNull, Column, Table, Unique, Length, Is, HasOne, DataType} from 'sequelize-typescript';

import {BaseModel} from './BaseModel';

@Table
export class Skillset extends BaseModel<Skillset> {
  @AllowNull(false)
  @Column
  name: string;
}
