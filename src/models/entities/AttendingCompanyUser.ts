import {Column, Table, BelongsTo, ForeignKey} from 'sequelize-typescript';

import {TimestampModel} from './TimestampModel';
import {CompanyUser} from './CompanyUser';
import {FairAttendance} from './FairAttendance';

@Table({
  tableName: 'AttendingCompanyUsers'
})
export class AttendingCompanyUser extends TimestampModel<AttendingCompanyUser> {
  @ForeignKey(() => FairAttendance)
  @Column
  attendanceId: number;

  @ForeignKey(() => CompanyUser)
  @Column
  companyUserId: number;

  @BelongsTo(() => FairAttendance)
  attendance: FairAttendance;

  @BelongsTo(() => CompanyUser)
  companyUser: CompanyUser;
}
