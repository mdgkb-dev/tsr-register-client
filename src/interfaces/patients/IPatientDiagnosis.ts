import IMkbSubDiagnosis from '@/interfaces/mkb/IMkbSubDiagnosis';
import IPatient from '@/interfaces/patients/IPatient';
import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';

export default interface IPatientDiagnosis {
  id?: string;
  primary: boolean;
  mkbSubDiagnosisId?: string;
  mkbSubDiagnosis?: IMkbSubDiagnosis;
  mkbDiagnosisId?: string;
  mkbDiagnosis?: IMkbDiagnosis;
  patientId: string;
  patient?: IPatient;
}
