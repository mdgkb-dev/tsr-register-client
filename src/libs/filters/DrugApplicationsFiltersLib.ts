import DrugApplication from '@/classes/DrugApplication';
import FilterModel from '@/services/classes/filters/FilterModel';
import ClassHelper from '@/services/ClassHelper';
import { DataTypes } from '@/services/interfaces/DataTypes';
import { Operators } from '@/services/interfaces/Operators';

const DrugApplicationsFiltersLib = (() => {
  const modelName = 'drugApplication';
  function byStatus(): FilterModel {
    const filterModel = FilterModel.CreateFilterModelV2(
      modelName,
      ClassHelper.GetPropertyName(DrugApplication).drugApplicationStatusId,
      DataTypes.Set
    );
    filterModel.operator = Operators.In;
    return filterModel;
  }

  return {
    byStatus,
  };
})();

export default DrugApplicationsFiltersLib;
