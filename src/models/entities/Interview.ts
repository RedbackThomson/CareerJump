import {AllowNull, Column, Table, Unique, Length, Is, HasOne, DataType} from 'sequelize-typescript';

import {TimestampModel} from './TimestampModel';
import {CompanyUser} from './CompanyUser';
import {StudentUser} from './StudentUser';
import {Fair} from './Fair';

@Table
export class Interview extends TimestampModel<Interview> {
  @AllowNull(false)
  @Column
  scheduled: Date;

  @AllowNull(false)
  @Unique
  @Column
  roomName: string;

  @HasOne(() => CompanyUser, 'companyId')
  companyUser: CompanyUser;

  @HasOne(() => StudentUser, 'studentId')
  studentUser: StudentUser;

  @HasOne(() => Fair, 'fairId')
  fair: Fair;
}
