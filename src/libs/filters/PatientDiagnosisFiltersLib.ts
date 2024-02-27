import PatientDiagnosis from '@/classes/PatientDiagnosis';
import FilterModel from '@/services/classes/filters/FilterModel';
import { DataTypes } from '@/services/interfaces/DataTypes';

const PatientDiagnosisFiltersLib = (() => {
  function byPatientId(patientId: string): FilterModel {
    return FilterModel.CreateFilterModel(PatientDiagnosis.GetClassName(), patientId, DataTypes.String);
  }

  return {
    byPatientId,
  };
})();

export default PatientDiagnosisFiltersLib;
