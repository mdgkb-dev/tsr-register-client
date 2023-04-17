import ClassHelper from '@/services/ClassHelper';

export default class PatientDiagnosisAnamnesis {
  id?: string;
  value = '';
  date = '';
  patientDiagnosisId?: string;
  isEditMode?: boolean;

  constructor(i?: PatientDiagnosisAnamnesis) {
    ClassHelper.BuildClass(this, i);
  }
}
