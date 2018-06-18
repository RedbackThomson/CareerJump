import {AllowNull, Column, Table, BelongsTo, ForeignKey} from 'sequelize-typescript';

import {TimestampModel} from './TimestampModel';
import {CompanyPayment} from './CompanyPayment';
import {Company} from './Company';
import {Fair} from './Fair';

@Table({
  tableName: 'FairAttendance'
})
export class FairAttendance extends TimestampModel<FairAttendance> {
  @AllowNull(false)
  @Column
  userCount: number;

  @ForeignKey(() => Company)
  @Column
  companyId: number;

  @ForeignKey(() => CompanyPayment)
  @Column
  paymentId: number;

  @ForeignKey(() => Fair)
  @Column
  fairId: number;

  @BelongsTo(() => Company)
  company: Company;

  @BelongsTo(() => CompanyPayment)
  payment: CompanyPayment;

  @BelongsTo(() => Fair)
  fair: Fair;
}
