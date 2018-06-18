import {AllowNull, Column, Table, Unique, HasOne, IsEmail, BeforeSave} from 'sequelize-typescript';

import {TimestampModel} from './TimestampModel';
import {StudentProfile} from './StudentProfile';
import {Encryption} from '../../utils/Encryption';

@Table({
  tableName: 'StudentUsers'
})
export class StudentUser extends TimestampModel<StudentUser> {
  @AllowNull(false)
  @Column
  password: string;

  @AllowNull(false)
  @IsEmail
  @Unique
  @Column
  email: string;

  @AllowNull(false)
  @Column
  confirmed: boolean;

  @AllowNull(false)
  @Column
  deleted: boolean;

  @HasOne(() => StudentProfile)
  profile: StudentProfile;

  @BeforeSave
  static encryptPassword(instance: StudentUser) {
    instance.password = Encryption.encryptPassword(instance.password);
  }

  validPassword(testPassword: string) {
    return Encryption.decryptPassword(this.password, testPassword);
  }
}
