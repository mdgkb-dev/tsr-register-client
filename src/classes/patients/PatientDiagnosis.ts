import IPatient from '@/interfaces/patients/IPatient';
import Patient from '@/classes/patients/Patient';
import MkbSubDiagnosis from '@/classes/mkb/MkbSubDiagnosis';
import IMkbSubDiagnosis from '@/interfaces/mkb/IMkbSubDiagnosis';
import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';
import IPatientDiagnosis from '@/interfaces/patients/IPatientDiagnosis';
import MkbDiagnosis from '@/classes/mkb/MkbDiagnosis';

export default class PatientDiagnosis implements IPatientDiagnosis {
  id?: string;
  primary = false;
  mkbSubDiagnosisId?: string;
  mkbSubDiagnosis?: IMkbSubDiagnosis;
  mkbDiagnosisId?: string;
  mkbDiagnosis?: IMkbDiagnosis;
  patientId = '';
  patient?: IPatient;

  constructor(patientDiagnosis?: IPatientDiagnosis) {
    if (!patientDiagnosis) {
      return;
    }
    this.id = patientDiagnosis.id;
    this.primary = patientDiagnosis.primary ?? false;
    this.mkbDiagnosisId = patientDiagnosis.mkbDiagnosisId;
    if (patientDiagnosis.mkbDiagnosis) {
      this.mkbDiagnosis = new MkbDiagnosis(patientDiagnosis.mkbDiagnosis);
    }
    this.mkbSubDiagnosisId = patientDiagnosis.mkbSubDiagnosisId;
    if (patientDiagnosis.mkbSubDiagnosis) {
      this.mkbSubDiagnosis = new MkbSubDiagnosis(patientDiagnosis.mkbSubDiagnosis);
    }
    this.patientId = patientDiagnosis.patientId;
    if (patientDiagnosis.patient) {
      this.patient = new Patient(patientDiagnosis.patient);
    }
  }
}
