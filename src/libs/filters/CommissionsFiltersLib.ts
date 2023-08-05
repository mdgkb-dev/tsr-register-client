import DrugApplication from '@/classes/DrugApplication';
import FilterModel from '@/services/classes/filters/FilterModel';
import ClassHelper from '@/services/ClassHelper';
import { DataTypes } from '@/services/interfaces/DataTypes';
import { Operators } from '@/services/interfaces/Operators';

const CommissionsFiltersLib = (() => {
  const modelName = 'commission';
  function byStatus(): FilterModel {
    const filterModel = FilterModel.CreateFilterModelV2(modelName, ClassHelper.GetPropertyName(DrugApplication).statusId, DataTypes.Set);
    filterModel.operator = Operators.In;
    return filterModel;
  }
  return {
    byStatus,
  };
})();

export default CommissionsFiltersLib;
