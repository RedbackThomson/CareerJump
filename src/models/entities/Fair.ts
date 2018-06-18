import {AllowNull, Column, Table} from 'sequelize-typescript';

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

  @AllowNull(false)
  @Column
  alias: string;
}
