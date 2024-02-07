import FilterModel from '@/services/classes/filters/FilterModel';
import { DataTypes } from '@/services/interfaces/DataTypes';
import { Operators } from '@/services/interfaces/Operators';

const StatusesFiltersLib = (() => {
  const model = 'status';

  function byModel(value: string): FilterModel {
    const filterModel = FilterModel.CreateFilterModel(model, 'model', DataTypes.String);
    filterModel.value1 = value;
    filterModel.operator = Operators.Eq;
    return filterModel;
  }

  return {
    byModel,
  };
})();

export default StatusesFiltersLib;
