import {AllowNull, Column, Table, Unique, Length, Is, HasOne, DataType, BelongsTo, ForeignKey} from 'sequelize-typescript';

import {TimestampModel} from './TimestampModel';
import {StudentUser} from './StudentUser';
import {Fair} from './Fair';

@Table({
  tableName: 'Referrals'
})
export class Referral extends TimestampModel<Referral> {
  @ForeignKey(() => StudentUser)
  referrer: StudentUser;

  @ForeignKey(() => StudentUser)
  referral: StudentUser;

}
