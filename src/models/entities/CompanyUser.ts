import {AllowNull, Column, Table, Unique, Length, Is, HasOne, DataType, IsEmail, BeforeSave, ForeignKey} from 'sequelize-typescript';

import {TimestampModel} from './TimestampModel';
import {CompanyPayment} from './CompanyPayment';
import {Company} from './Company';
import {CompanySize} from '../enums/CompanySize';
import {Encryption} from '../../utils/Encryption';

const HEX_REGEX = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

@Table
export class CompanyUser extends TimestampModel<CompanyUser> {
  @AllowNull(false)
  @Column
  firstName: string;

  @AllowNull(false)
  @Column
  lastName: string;

  @AllowNull(false)
  @Column
  jobTitle: string;

  @AllowNull(false)
  @Column
  admin: boolean;

  @AllowNull(false)
  @Column
  password: string;

  @AllowNull(false)
  @IsEmail
  @Unique
  @Column
  email: string;

  @Is(function hexColor(value: string): void {
    if (!HEX_REGEX.test(value)) {
      throw new Error(`"${value}" is not a hex color value.`);
    }
  })
  @AllowNull(false)
  @Length({min:3, max: 6})
  @Column
  colour: string;

  @HasOne(() => Company, 'companyId')
  company: Company[];

  @BeforeSave
  static encryptPassword(instance: CompanyUser) {
    instance.password = Encryption.encryptPassword(instance.password);
  }

  validPassword(testPassword: string) {
    return Encryption.decryptPassword(this.password, testPassword);
  }
}
