import { DataTypes } from '@/interfaces/filters/DataTypes';
import { Operators } from '@/interfaces/filters/Operators';

export default interface IFilterModel {
  id?: string;
  table: string;
  col: string;
  operator: Operators;
  type: DataTypes;
  date1?: Date;
  date2?: Date;
  value1?: string;

  isUnaryFilter: () => boolean;
  isBetweenFilter: () => boolean;
  isSetFilter: () => boolean;
}
