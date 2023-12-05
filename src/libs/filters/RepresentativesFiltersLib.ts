import FilterModel from '@/services/classes/filters/FilterModel';
import { DataTypes } from '@/services/interfaces/DataTypes';
import { Operators } from '@/services/interfaces/Operators';

const RepresentativesFiltersLib = (() => {
  const table = 'representatives_view';

  function onlyFemale(): FilterModel {
    const filterModel = FilterModel.CreateFilterModel(table, 'is_male', DataTypes.Boolean);
    filterModel.boolean = false;
    filterModel.operator = Operators.Eq;
    filterModel.label = 'Ж';
    return filterModel;
  }

  function onlyMale(): FilterModel {
    const filterModel = FilterModel.CreateFilterModel(table, 'is_male', DataTypes.Boolean);
    filterModel.boolean = true;
    filterModel.operator = Operators.Eq;
    filterModel.label = 'М';
    return filterModel;
  }
  return {
    onlyMale,
    onlyFemale,
  };
})();
export default RepresentativesFiltersLib;
