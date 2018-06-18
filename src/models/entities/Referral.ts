import {Column, Table, ForeignKey} from 'sequelize-typescript';

import {TimestampModel} from './TimestampModel';
import {StudentUser} from './StudentUser';

@Table({
  tableName: 'Referrals'
})
export class Referral extends TimestampModel<Referral> {
  @ForeignKey(() => StudentUser)
  @Column
  referrer: number;

  @ForeignKey(() => StudentUser)
  @Column
  referral: number;
}
