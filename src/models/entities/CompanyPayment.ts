import {AllowNull, Column, Table, Unique, Length, Is, HasOne, DataType} from 'sequelize-typescript';

import {TimestampModel} from './TimestampModel';
import {Company} from './Company';
import {Fair} from './Fair';

const HEX_REGEX = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

@Table
export class CompanyPayment extends TimestampModel<Company> {
  @AllowNull(false)
  @Column(DataType.DOUBLE)
  amount: number;

  @AllowNull(false)
  @Column
  paymentDate: Date;

  @HasOne(() => Company, 'companyId')
  company: Company;

  @HasOne(() => Fair, 'fairId')
  fair: Fair[];
}
