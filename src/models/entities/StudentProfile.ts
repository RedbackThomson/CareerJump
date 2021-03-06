import {AllowNull, Column, Table, DataType, IsUrl, BelongsTo, ForeignKey} from 'sequelize-typescript';

import {TimestampModel} from './TimestampModel';
import {StudentUser} from './StudentUser';
import {JobPosition} from '../enums/JobPosition';
import { CompanySize } from '../enums/CompanySize';

@Table({
  tableName: 'StudentProfiles'
})
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
  @Column(DataType.ARRAY(DataType.INTEGER))
  skills: number[];

  @AllowNull(false)
  @IsUrl
  @Column
  linkedIn: string;

  @AllowNull(false)
  @IsUrl
  @Column
  resume: string;

  @ForeignKey(() => StudentUser)
  @Column
  userId: number;

  @BelongsTo(() => StudentUser)
  user: StudentUser;
}
