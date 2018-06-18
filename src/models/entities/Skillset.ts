import {AllowNull, Column, Table} from 'sequelize-typescript';

import {BaseModel} from './BaseModel';

@Table({
  tableName: 'Skillsets',
  timestamps: false
})
export class Skillset extends BaseModel<Skillset> {
  @AllowNull(false)
  @Column
  name: string;
}
