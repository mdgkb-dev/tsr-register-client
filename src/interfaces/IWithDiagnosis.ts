import IMkbConcreteDiagnosis from '@/interfaces/mkb/IMkbConcreteDiagnosis';
import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';
import IMkbSubDiagnosis from '@/interfaces/mkb/IMkbSubDiagnosis';
import IPatient from '@/interfaces/patients/IPatient';
import IPatientDiagnosisAnamnesis from '@/interfaces/patients/IPatientDiagnosisAnamnesis';

export default interface IWithDiagnosis {
  id?: string;
  primary: boolean;
  mkbSubDiagnosisId?: string;
  mkbSubDiagnosis: IMkbSubDiagnosis;
  mkbDiagnosisId?: string;
  mkbDiagnosis: IMkbDiagnosis;
  mkbConcreteDiagnosisId?: string;
  mkbConcreteDiagnosis: IMkbConcreteDiagnosis;
  patientId?: string;
  patient?: IPatient;
  patientDiagnosisAnamnesis: IPatientDiagnosisAnamnesis[];
  patientDiagnosisAnamnesisForDelete: string[];
}
