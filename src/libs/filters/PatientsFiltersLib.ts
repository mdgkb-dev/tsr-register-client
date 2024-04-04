import Answer from '@/classes/Answer';
import Disability from '@/classes/Disability';
import Human from '@/classes/Human';
import Patient from '@/classes/Patient';
import SelectedAnswerVariant from '@/classes/SelectedAnswerVariant';
import FilterModel from '@/services/classes/filters/FilterModel';
import ClassHelper from '@/services/ClassHelper';
import { DataTypes } from '@/services/interfaces/DataTypes';
import { Operators } from '@/services/interfaces/Operators';
const PatientsFiltersLib = (() => {
  const table = 'patients_view';

  function onlyFemale(): FilterModel {
    const filterModel = FilterModel.Create(Patient, ClassHelper.GetPropertyName(Human).isMale, DataTypes.Boolean);
    filterModel.boolean = false;
    filterModel.label = 'Ж';
    return filterModel;
  }

  function onlyMale(): FilterModel {
    const filterModel = FilterModel.Create(Patient, ClassHelper.GetPropertyName(Human).isMale, DataTypes.Boolean);
    filterModel.boolean = true;
    filterModel.label = 'М';
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
    const filterModel = FilterModel.OnlyIfSecondModelExists(Patient, Answer);
    filterModel.col = 'answerVariantId';
    filterModel.operator = Operators.In;
    filterModel.set = [variantId];
    filterModel.label = label;
    return filterModel;
  }

  function bySelectedAnswerVariantId(variantId: string, label: string): FilterModel {
    const filterModel = FilterModel.OnlyIfSecondModelExists(Patient, SelectedAnswerVariant);
    filterModel.col = 'answerVariantId';
    filterModel.operator = Operators.In;
    filterModel.set = [variantId];
    filterModel.label = label;
    return filterModel;
  }
  function withDisabilities(): FilterModel {
    const filterModel = FilterModel.OnlyIfSecondModelExists(Patient, Disability);
    filterModel.label = 'Только с инвалидностью';
    return filterModel;
  }

  function byDateBirth(): FilterModel {
    const filterModel = FilterModel.Create(Patient, ClassHelper.GetPropertyName(Patient).dateBirth, DataTypes.Date);
    filterModel.operator = Operators.Btw;
    return filterModel;
  }
  return {
    bySelectedAnswerVariantId,
    byDateBirth,
    byQuestionVariantId,
    withDisabilities,
    onlyMale,
    onlyFemale,
    byRegisters,
  };
})();

export default PatientsFiltersLib;
