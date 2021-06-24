export default interface IPatientDiagnosisAnamnesis {
  id?: string;
  value: string;
  date: string;
  patientDiagnosisId?: string;
  isEditMode?: boolean;
}
