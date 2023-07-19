import FilterModel from '@/services/classes/filters/FilterModel';
import { DataTypes } from '@/services/interfaces/DataTypes';
import { Operators } from '@/services/interfaces/Operators';

const PatientsFiltersLib = (() => {
  const table = 'patients_view';
  function onlyFemale(): FilterModel {
    const filterModel = FilterModel.CreateFilterModel('patients_view', 'is_male', DataTypes.Boolean);
    filterModel.boolean = true;
    filterModel.operator = Operators.Eq;
    filterModel.label = 'Женский';
    return filterModel;
  }

  function onlyMale(): FilterModel {
    const filterModel = FilterModel.CreateFilterModel('patients_view', 'is_male', DataTypes.Boolean);
    filterModel.boolean = false;
    filterModel.operator = Operators.Eq;
    filterModel.label = 'Мужской';
    return filterModel;
  }

  function genderSet(set: string[]): FilterModel {
    const filterModel = FilterModel.CreateFilterModel('patients_view', 'is_male', DataTypes.Boolean);
    filterModel.operator = Operators.In;
    filterModel.set = set;
    return filterModel;
  }

  function byRegisters(set: string[]): FilterModel {
    const filterModel = FilterModel.CreateFilterModelWithJoin(
      table,
      'id',
      'patients_registers',
      'id',
      'patient_id',
      DataTypes.Join,
      'id',
      'register_id'
    );
    filterModel.operator = Operators.In;
    filterModel.set = set;
    return filterModel;
  }

  function byQuestionVariantId(variantId: string, label: string): FilterModel {
    const filterModel = FilterModel.CreateFilterModelWithJoin(
      table,
      'id',
      'answers',
      'id',
      'patient_id',
      DataTypes.Join,
      variantId,
      'answer_variant_id'
    );
    filterModel.operator = Operators.Eq;
    filterModel.label = label;
    return filterModel;
  }

  function withDisabilities(): FilterModel {
    const filterModel = FilterModel.CreateFilterModelWithJoin(table, 'id', 'disabilities', 'id', 'patient_id', DataTypes.Join);
    filterModel.label = 'Только с инвалидностью';
    return filterModel;
  }

  return {
    byQuestionVariantId,
    withDisabilities,
    genderSet,
    onlyMale,
    onlyFemale,
    byRegisters,
  };
})();

export default PatientsFiltersLib;
