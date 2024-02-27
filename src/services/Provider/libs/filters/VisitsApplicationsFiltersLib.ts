import VisitsApplication from '@/classes/VisitsApplication';
import FilterModel from '@/services/classes/filters/FilterModel';
import ClassHelper from '@/services/ClassHelper';
import { DataTypes } from '@/services/interfaces/DataTypes';
import { Operators } from '@/services/interfaces/Operators';
import Provider from '@/services/Provider/Provider';

const VisitsApplicationsFiltersLib = (() => {
  function byStatus(): FilterModel {
    const filterModel = FilterModel.CreateFilterModel(
      Provider.schema.value.visitsApplication.tableName,
      ClassHelper.GetPropertyName(VisitsApplication).formStatusId,
      DataTypes.Set
    );
    filterModel.operator = Operators.In;
    return filterModel;
  }

  return {
    byStatus,
  };
})();

export default VisitsApplicationsFiltersLib;
