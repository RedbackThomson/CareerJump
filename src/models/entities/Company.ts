import {AllowNull, Column, Table, Unique, Length, Is, HasMany, DataType} from 'sequelize-typescript';

import {TimestampModel} from './TimestampModel';
import {CompanyPayment} from './CompanyPayment';
import {CompanyUser} from './CompanyUser';
import {CompanySize} from '../enums/CompanySize';

const HEX_REGEX = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

@Table({
  tableName: 'Companies'
})
export class Company extends TimestampModel<Company> {
  @AllowNull(false)
  @Unique
  @Column
  name: string;

  @AllowNull(false)
  @Column
  description: string;

  @AllowNull(false)
  @Column
  field: string;

  @AllowNull(false)
  @Column(DataType.ENUM(CompanySize.LARGE, CompanySize.STARTUP))
  size: CompanySize;

  @AllowNull(false)
  @Column
  website: string;

  @AllowNull(false)
  @Column
  logo: string;

  @Is(function hexColor(value: string): void {
    if (!HEX_REGEX.test(value)) {
      throw new Error(`"${value}" is not a hex color value.`);
    }
  })
  @AllowNull(false)
  @Length({min:3, max: 6})
  @Column
  colour: string;

  @HasMany(() => CompanyUser, 'companyId')
  companyUsers: CompanyUser[];

  @HasMany(() => CompanyPayment, 'companyId')
  companyPayments: CompanyPayment[];
}
