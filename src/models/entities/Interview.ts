import {AllowNull, Column, Table, Unique, BelongsTo, ForeignKey} from 'sequelize-typescript';

import {TimestampModel} from './TimestampModel';
import {CompanyUser} from './CompanyUser';
import {StudentUser} from './StudentUser';
import {Fair} from './Fair';

@Table({
  tableName: 'Interviews'
})
export class Interview extends TimestampModel<Interview> {
  @AllowNull(false)
  @Column
  scheduled: Date;

  @AllowNull(false)
  @Unique
  @Column
  roomName: string;

  @ForeignKey(() => CompanyUser)
  @Column
  companyUserId: number;

  @ForeignKey(() => StudentUser)
  @Column
  studentUserId: number;

  @ForeignKey(() => Fair)
  @Column
  fairId: number;

  @BelongsTo(() => CompanyUser)
  companyUser: CompanyUser;

  @BelongsTo(() => StudentUser)
  studentUser: StudentUser;

  @BelongsTo(() => Fair)
  fair: Fair;
}
