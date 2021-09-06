import { DataTypes } from '@/interfaces/filters/DataTypes';
import IFilterModel from '@/interfaces/filters/IFilterModel';
import { Operators } from '@/interfaces/filters/Operators';
import { v4 as uuidv4 } from 'uuid';

export default class FilterModel implements IFilterModel {
  id?: string;
  table = '';
  col = '';
  operator: Operators = Operators.Eq;
  date1?: Date;
  date2?: Date;
  value1?: string = '';
  type: DataTypes = DataTypes.String;

  isUnaryFilter(): boolean {
    return this.operator === Operators.Eq || this.operator === Operators.Gt || this.operator === Operators.Lt;
  }

  isBetweenFilter(): boolean {
    return this.operator === Operators.Btw;
  }
  isSetFilter(): boolean {
    return this.operator === Operators.In;
  }

  static CreateFilterModel(table: string, col: string, type: DataTypes): IFilterModel {
    const filterModel = new FilterModel();
    filterModel.id = uuidv4();
    filterModel.table = table;
    filterModel.col = col;
    filterModel.type = type;
    return filterModel;
  }
}
