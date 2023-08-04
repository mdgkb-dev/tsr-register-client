import CommissionDrugApplication from '@/classes/CommissionDrugApplication';
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
  function byCommissionsId(id: string, label: string): FilterModel {
    console.log(id);
    const filterModel = FilterModel.CreateFilterModelWithJoinV2(
      modelName,
      'id',
      'commissionDrugApplication',
      'id',
      ClassHelper.GetPropertyName(CommissionDrugApplication).drugApplicationId as string,
      id,
      ClassHelper.GetPropertyName(CommissionDrugApplication).commissionId as string
    );
    filterModel.joinTableId = id;
    filterModel.operator = Operators.Eq;
    filterModel.label = label;
    return filterModel;
  }

  return {
    byCommissionsId,
    byStatus,
  };
})();

export default DrugApplicationsFiltersLib;
