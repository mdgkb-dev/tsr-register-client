import FilterModel from '@/classes/filters/FilterModel';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import IFilterModel from '@/interfaces/filters/IFilterModel';
import Provider from '@/services/Provider';

const PatientsFiltersLib = (() => {
  function withDisabilities(): IFilterModel {
    const filterModel: IFilterModel = FilterModel.CreateFilterModelWithJoin(
      Provider.schema.value.patient.tableName,
      Provider.schema.value.patient.id,
      Provider.schema.value.disability.tableName,
      Provider.schema.value.disability.id,
      Provider.schema.value.disability.patientId,
      DataTypes.Join
    );
    // filterModel.operator = Operators.In;
    // filterModel.set = tagsIdSet;
    return filterModel;
  }

  return {
    withDisabilities,
  };
})();

export default PatientsFiltersLib;
