import DrugApplication from '@/classes/DrugApplication';
import FilterModel from '@/services/classes/filters/FilterModel';
import ClassHelper from '@/services/ClassHelper';
import { DataTypes } from '@/services/interfaces/DataTypes';
import { Operators } from '@/services/interfaces/Operators';

const DrugApplicationsFiltersLib = (() => {
  const modelName = 'drugApplication';

  function byStatus(): FilterModel {
    const filterModel = FilterModel.CreateFilterModel(modelName, ClassHelper.GetPropertyName(DrugApplication).statusId, DataTypes.Set);
    filterModel.operator = Operators.In;
    return filterModel;
  }

  function byCommissionsId(id: string, label: string): FilterModel {
    // const filterModel = FilterModel.CreateFilterModelWithJoinV2(modelName, 'id', 'commissionDrugApplication', 'id');
    // filterModel.joinTableId = id;
    // filterModel.operator = Operators.Eq;
    // filterModel.label = label;
    return new FilterModel();
  }

  return {
    byCommissionsId,
    byStatus,
  };
})();

export default DrugApplicationsFiltersLib;
