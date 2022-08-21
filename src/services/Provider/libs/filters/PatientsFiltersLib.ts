import FilterModel from '@/classes/filters/FilterModel';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import IFilterModel from '@/interfaces/filters/IFilterModel';
import { Operators } from '@/interfaces/filters/Operators';
import Provider from '@/services/Provider';

const PatientsFiltersLib = (() => {
  function withDisabilities(): IFilterModel {
    return FilterModel.CreateFilterModelWithJoin(
      Provider.schema.value.patient.tableName,
      Provider.schema.value.patient.id,
      Provider.schema.value.disability.tableName,
      Provider.schema.value.disability.id,
      Provider.schema.value.disability.patientId,
      DataTypes.Join
    );
  }

  function onlyMan(): IFilterModel {
    const filter = FilterModel.CreateFilterModel(
      Provider.schema.value.patient.tableName,
      Provider.schema.value.patient.isMale,
      DataTypes.Boolean
    );
    filter.boolean = true;
    filter.operator = Operators.Eq;
    filter.label = 'Мужской пол';
    return filter;
  }

  function onlyWoman(): IFilterModel {
    const filter = FilterModel.CreateFilterModel(
      Provider.schema.value.patient.tableName,
      Provider.schema.value.patient.isMale,
      DataTypes.Boolean
    );
    filter.boolean = false;
    filter.operator = Operators.Eq;
    filter.label = 'Женский пол';
    return filter;
  }

  function byRegister(set: string[]): IFilterModel {
    const filterModel: IFilterModel = FilterModel.CreateFilterModelWithJoin(
      Provider.schema.value.patient.tableName,
      Provider.schema.value.patient.id,
      Provider.schema.value.registerToPatient.tableName,
      Provider.schema.value.registerToPatient.id,
      Provider.schema.value.registerToPatient.patientId,
      DataTypes.Join,
      Provider.schema.value.registerToPatient.id,
      Provider.schema.value.registerToPatient.registerId
    );
    filterModel.operator = Operators.In;
    filterModel.set = set;
    return filterModel;
  }

  return {
    withDisabilities,
    onlyMan,
    onlyWoman,
    byRegister,
  };
})();

export default PatientsFiltersLib;
