import {AllowNull, Column, Table, Unique, Length, Is, HasOne, DataType, IsUrl} from 'sequelize-typescript';

import {TimestampModel} from './TimestampModel';
import {CompanyPayment} from './CompanyPayment';
import {StudentUser} from './StudentUser';
import {JobPosition} from '../enums/JobPosition';
import { CompanySize } from '../enums/CompanySize';

@Table
export class StudentProfile extends TimestampModel<StudentProfile> {
  @AllowNull(false)
  @Column
  firstName: string;

  @AllowNull(false)
  @Column
  lastName: string;

  @AllowNull(false)
  @Column
  university: string;

  @AllowNull(false)
  @Column
  major: string;

  @AllowNull(false)
  @Column(DataType.DOUBLE)
  gpa: number;

  @AllowNull(false)
  @Column
  gradDate: Date;

  @AllowNull(false)
  @Column
  sponsorship: boolean;

  @AllowNull(false)
  @Column(DataType.ARRAY(DataType.STRING))
  workHistory: string[];

  @AllowNull(false)
  @Column(DataType.ENUM(CompanySize.LARGE, CompanySize.STARTUP))
  preference: CompanySize;

  @AllowNull(false)
  @Column(DataType.ENUM(JobPosition.FULLTIME, JobPosition.INTERNSHIP))
  position: JobPosition;

  @AllowNull(false)
  @IsUrl
  @Column
  linkedIn: string;

  @AllowNull(false)
  @IsUrl
  @Column
  resume: string;

  @HasOne(() => StudentUser, 'userId')
  user: StudentUser;
}
