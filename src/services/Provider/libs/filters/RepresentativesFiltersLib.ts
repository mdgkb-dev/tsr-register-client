import FilterModel from '@/classes/filters/FilterModel';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import IFilterModel from '@/interfaces/filters/IFilterModel';
import { Operators } from '@/interfaces/filters/Operators';
import Provider from '@/services/Provider';

const RepresentativesFiltersLib = (() => {
  function onlyMan(): IFilterModel {
    const filter = FilterModel.CreateFilterModel(
      Provider.schema.value.representative.tableName,
      Provider.schema.value.representative.isMale,
      DataTypes.Boolean
    );
    filter.boolean = true;
    filter.operator = Operators.Eq;
    filter.label = 'Мужской пол';
    return filter;
  }

  function onlyWoman(): IFilterModel {
    const filter = FilterModel.CreateFilterModel(
      Provider.schema.value.representative.tableName,
      Provider.schema.value.representative.isMale,
      DataTypes.Boolean
    );
    filter.boolean = false;
    filter.operator = Operators.Eq;
    filter.label = 'Женский пол';
    return filter;
  }

  return {
    onlyMan,
    onlyWoman,
  };
})();

export default RepresentativesFiltersLib;
