import { DataTypes } from '@/interfaces/filters/DataTypes';
import { Operators } from '@/interfaces/filters/Operators';

export default interface IFilterModel {
  index: number;
  table: string;
  col: string;
  operator: Operators;
  type: DataTypes;
  date1?: Date;
  date2?: Date;

  isUnaryFilter: () => boolean;
  isBetweenFilter: () => boolean;
  isSetFilter: () => boolean;
}
