import Representative from '@/classes/Representative';
import FilterModel from '@/services/classes/filters/FilterModel';
import Human from '@/services/classes/Human';
import ClassHelper from '@/services/ClassHelper';
import { DataTypes } from '@/services/interfaces/DataTypes';
const RepresentativesFiltersLib = (() => {
  function onlyFemale(): FilterModel {
    const filterModel = FilterModel.Create(Representative, ClassHelper.GetPropertyName(Human).isMale, DataTypes.Boolean);
    filterModel.boolean = false;
    filterModel.label = 'Ж';
    return filterModel;
  }

  function onlyMale(): FilterModel {
    const filterModel = FilterModel.Create(Representative, ClassHelper.GetPropertyName(Human).isMale, DataTypes.Boolean);
    filterModel.boolean = true;
    filterModel.label = 'М';
    return filterModel;
  }
  return {
    onlyMale,
    onlyFemale,
  };
})();
export default RepresentativesFiltersLib;
