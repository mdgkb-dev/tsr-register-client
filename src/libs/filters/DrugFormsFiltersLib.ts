import DrugForm from '@/classes/DrugForm';
import FilterModel from '@/services/classes/filters/FilterModel';
import ClassHelper from '@/services/ClassHelper';
import { DataTypes } from '@/services/interfaces/DataTypes';

const DrugFormsFiltersLib = (() => {
  const modelName = 'drugForm';

  function byDrugId(id?: string): FilterModel {
    const filterModel = FilterModel.CreateFilterModel(modelName, ClassHelper.GetPropertyName(DrugForm).drugId, DataTypes.String);
    filterModel.value1 = id;
    return filterModel;
  }

  return {
    byDrugId,
  };
})();

export default DrugFormsFiltersLib;
