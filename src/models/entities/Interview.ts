import {AllowNull, Column, Table, Unique, Length, Is, HasOne, DataType, BelongsTo} from 'sequelize-typescript';

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

  @BelongsTo(() => CompanyUser, 'companyId')
  companyUser: CompanyUser;

  @BelongsTo(() => StudentUser, 'studentId')
  studentUser: StudentUser;

  @BelongsTo(() => Fair, 'fairId')
  fair: Fair;
}
