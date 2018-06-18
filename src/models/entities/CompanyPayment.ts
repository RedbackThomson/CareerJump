import {AllowNull, Column, Table, DataType, BelongsTo, ForeignKey} from 'sequelize-typescript';

import {TimestampModel} from './TimestampModel';
import {Company} from './Company';
import {Fair} from './Fair';

@Table({
  tableName: 'CompanyPayments'
})
export class CompanyPayment extends TimestampModel<Company> {
  @AllowNull(false)
  @Column(DataType.DOUBLE)
  amount: number;

  @AllowNull(false)
  @Column
  paymentDate: Date;

  @ForeignKey(() => Company)
  @Column
  companyId: number;

  @ForeignKey(() => Fair)
  @Column
  fairId: number;

  @BelongsTo(() => Company)
  company: Company;

  @BelongsTo(() => Fair)
  fair: Fair[];
}
