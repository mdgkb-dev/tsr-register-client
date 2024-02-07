import Commission from '@/classes/Commission';
import FilterModel from '@/services/classes/filters/FilterModel';
import ClassHelper from '@/services/ClassHelper';
import { DataTypes } from '@/services/interfaces/DataTypes';
import { Operators } from '@/services/interfaces/Operators';

const CommissionsFiltersLib = (() => {
  const modelName = 'commission';

  function byStatus(): FilterModel {
    const filterModel = FilterModel.CreateFilterModel(modelName, ClassHelper.GetPropertyName(Commission).statusId, DataTypes.Set);
    filterModel.operator = Operators.In;
    return filterModel;
  }

  function byPatientId(patientId: string): FilterModel {
    const filterModel = FilterModel.CreateFilterModel(modelName, ClassHelper.GetPropertyName(Commission).patientId, DataTypes.Set);
    filterModel.operator = Operators.Eq;
    filterModel.value1 = patientId;
    return filterModel;
  }

  return {
    byPatientId,
    byStatus,
  };
})();

export default CommissionsFiltersLib;
