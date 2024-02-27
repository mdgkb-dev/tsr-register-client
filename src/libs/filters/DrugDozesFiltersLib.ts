import DrugDoze from '@/classes/DrugDoze';
import FilterModel from '@/services/classes/filters/FilterModel';
import ClassHelper from '@/services/ClassHelper';
import { DataTypes } from '@/services/interfaces/DataTypes';

const DrugDozesFiltersLib = (() => {
  const modelName = 'drugDoze';

  function byDrugFormId(id?: string): FilterModel {
    const filterModel = FilterModel.CreateFilterModel(modelName, ClassHelper.GetPropertyName(DrugDoze).drugFormId, DataTypes.String);
    filterModel.value1 = id;
    return filterModel;
  }

  return {
    byDrugFormId,
  };
})();

export default DrugDozesFiltersLib;
