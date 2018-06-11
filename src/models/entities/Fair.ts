import {AllowNull, Column, Table, Unique, Length, Is, DataType} from 'sequelize-typescript';

import {TimestampModel} from './TimestampModel';

@Table({
  tableName: 'Fairs'
})
export class Fair extends TimestampModel<Fair> {
  @AllowNull(false)
  @Column
  name: string;
  
  @AllowNull(false)
  @Column
  description: string;

  @AllowNull(false)
  @Column
  fairDate: Date;
}
