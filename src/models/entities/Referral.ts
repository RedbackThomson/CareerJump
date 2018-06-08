import {AllowNull, Column, Table, Unique, Length, Is, HasOne, DataType} from 'sequelize-typescript';

import {TimestampModel} from './TimestampModel';
import {StudentUser} from './StudentUser';
import {Fair} from './Fair';

@Table
export class Referral extends TimestampModel<Referral> {
  @HasOne(() => StudentUser, 'referrer')
  referrer: StudentUser;

  @HasOne(() => StudentUser, 'referral')
  referral: StudentUser;

}
