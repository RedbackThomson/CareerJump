import {Column, CreatedAt, Table, UpdatedAt} from 'sequelize-typescript';

import {BaseModel} from './BaseModel';

@Table
export class TimestampModel<T> extends BaseModel<T> {
  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}