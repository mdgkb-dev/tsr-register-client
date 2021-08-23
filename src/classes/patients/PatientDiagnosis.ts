import MkbDiagnosis from '@/classes/mkb/MkbDiagnosis';
import MkbSubDiagnosis from '@/classes/mkb/MkbSubDiagnosis';
import Patient from '@/classes/patients/Patient';
import PatientDiagnosisAnamnesis from '@/classes/patients/PatientDiagnosisAnamnesis';
import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';
import IMkbSubDiagnosis from '@/interfaces/mkb/IMkbSubDiagnosis';
import IPatient from '@/interfaces/patients/IPatient';
import IPatientDiagnosis from '@/interfaces/patients/IPatientDiagnosis';
import IPatientDiagnosisAnamnesis from '@/interfaces/patients/IPatientDiagnosisAnamnesis';

export default class PatientDiagnosis implements IPatientDiagnosis {
  id?: string;
  primary = false;
  mkbSubDiagnosisId?: string;
  mkbSubDiagnosis?: IMkbSubDiagnosis;
  mkbDiagnosisId?: string;
  mkbDiagnosis?: IMkbDiagnosis;
  patientId?: string;
  patient?: IPatient;
  patientDiagnosisAnamnesis: IPatientDiagnosisAnamnesis[] = [];

  constructor(i?: IPatientDiagnosis) {
    if (!i) return;
    this.id = i.id;
    this.primary = i.primary ?? false;
    this.mkbDiagnosisId = i.mkbDiagnosisId;
    if (i.mkbDiagnosis) this.mkbDiagnosis = new MkbDiagnosis(i.mkbDiagnosis);
    this.mkbSubDiagnosisId = i.mkbSubDiagnosisId;
    if (i.mkbSubDiagnosis) this.mkbSubDiagnosis = new MkbSubDiagnosis(i.mkbSubDiagnosis);
    this.patientId = i.patientId;
    if (i.patient) this.patient = new Patient(i.patient);
    if (i.patientDiagnosisAnamnesis) {
      this.patientDiagnosisAnamnesis = i.patientDiagnosisAnamnesis.map((a: IPatientDiagnosisAnamnesis) => new PatientDiagnosisAnamnesis(a));
    }
  }
}
