import IPatientDiagnosisAnamnesis from '@/interfaces/patients/IPatientDiagnosisAnamnesis';

export default class PatientDiagnosisAnamnesis implements IPatientDiagnosisAnamnesis {
  id?: string;
  value = '';
  date = '';
  patientDiagnosisId?: string;
  isEditMode?: boolean;

  constructor(patientDiagnosisAnamnesis?: IPatientDiagnosisAnamnesis) {
    if (!patientDiagnosisAnamnesis) {
      return;
    }
    this.id = patientDiagnosisAnamnesis.id;
    this.value = patientDiagnosisAnamnesis.value;
    this.date = patientDiagnosisAnamnesis.date;
    this.patientDiagnosisId = patientDiagnosisAnamnesis.patientDiagnosisId;
    this.isEditMode = patientDiagnosisAnamnesis?.isEditMode;
  }
}
