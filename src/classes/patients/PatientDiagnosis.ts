import MkbConcreteDiagnosis from '@/classes/mkb/MkbConcreteDiagnosis';
import MkbDiagnosis from '@/classes/mkb/MkbDiagnosis';
import MkbSubDiagnosis from '@/classes/mkb/MkbSubDiagnosis';
import MkbClass from '@/classes/mkb/MkbСlass';
import Patient from '@/classes/patients/Patient';
import PatientDiagnosisAnamnesis from '@/classes/patients/PatientDiagnosisAnamnesis';
import IMkbClass from '@/interfaces/mkb/IMkbClass';
import IMkbConcreteDiagnosis from '@/interfaces/mkb/IMkbConcreteDiagnosis';
import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';
import IMkbSubDiagnosis from '@/interfaces/mkb/IMkbSubDiagnosis';
import IPatient from '@/interfaces/patients/IPatient';
import IPatientDiagnosis from '@/interfaces/patients/IPatientDiagnosis';
import IPatientDiagnosisAnamnesis from '@/interfaces/patients/IPatientDiagnosisAnamnesis';

export default class PatientDiagnosis implements IPatientDiagnosis {
  id?: string;
  primary = false;
  selected = false;
  editMode = false;
  mkbSubDiagnosisId?: string;
  mkbSubDiagnosis: IMkbSubDiagnosis = new MkbSubDiagnosis();
  mkbDiagnosisId?: string;
  mkbDiagnosis: IMkbDiagnosis = new MkbDiagnosis();
  patientId?: string;
  patient?: IPatient;
  patientDiagnosisAnamnesis: IPatientDiagnosisAnamnesis[] = [];
  patientDiagnosisAnamnesisForDelete: string[] = [];
  mkbConcreteDiagnosisId?: string;
  mkbConcreteDiagnosis: IMkbConcreteDiagnosis = new MkbConcreteDiagnosis();
  selectedClass: IMkbClass = new MkbClass();
  constructor(i?: IPatientDiagnosis) {
    if (!i) return;
    this.id = i.id;
    this.primary = i.primary ?? false;
    this.mkbDiagnosisId = i.mkbDiagnosisId;
    if (i.mkbDiagnosis) this.mkbDiagnosis = new MkbDiagnosis(i.mkbDiagnosis);
    this.mkbSubDiagnosisId = i.mkbSubDiagnosisId;
    if (i.mkbSubDiagnosis) this.mkbSubDiagnosis = new MkbSubDiagnosis(i.mkbSubDiagnosis);
    this.mkbConcreteDiagnosisId = i.mkbConcreteDiagnosisId;
    if (i.mkbConcreteDiagnosis) this.mkbConcreteDiagnosis = new MkbConcreteDiagnosis(i.mkbConcreteDiagnosis);
    this.patientId = i.patientId;
    if (i.patient) this.patient = new Patient(i.patient);
    if (i.patientDiagnosisAnamnesis)
      this.patientDiagnosisAnamnesis = i.patientDiagnosisAnamnesis.map((a: IPatientDiagnosisAnamnesis) => new PatientDiagnosisAnamnesis(a));
  }

  changeEditMode(): void {
    this.editMode = !this.editMode;
  }

  saveDiagnosis(mkbClass: IMkbClass): void {
    if (!mkbClass.selectedDiagnosisId) {
      this.editMode = false;
      return;
    }
    const allDiagnosis = mkbClass.getAllDiagnosis();
    const diagnosis = allDiagnosis.find((d: IMkbDiagnosis) => d.id === mkbClass.selectedDiagnosisId);
    if (diagnosis && diagnosis.id) {
      this.mkbDiagnosis = new MkbDiagnosis(diagnosis);
      this.mkbDiagnosisId = diagnosis.id;
    }
    if (mkbClass.selectedSubDiagnosisId) {
      const mkbSubDiagnosis = this.mkbDiagnosis.mkbSubDiagnosis.find((msd: IMkbSubDiagnosis) => msd.id === mkbClass.selectedSubDiagnosisId);
      if (mkbSubDiagnosis && mkbSubDiagnosis.id) {
        this.mkbSubDiagnosis = new MkbSubDiagnosis(mkbSubDiagnosis);
        this.mkbSubDiagnosisId = mkbSubDiagnosis.id;
        if (this.mkbSubDiagnosis.mkbDiagnosis) {
          this.mkbSubDiagnosis.mkbDiagnosis.mkbGroup = undefined;
        }
      }
    }
    if (mkbClass.selectedConcreteDiagnosisId) {
      const mkbConcreteDiagnosis = this.mkbDiagnosis.getConcreteDiagnosis(mkbClass.selectedConcreteDiagnosisId);
      if (mkbConcreteDiagnosis && mkbConcreteDiagnosis.id) {
        this.mkbConcreteDiagnosis = new MkbConcreteDiagnosis(mkbConcreteDiagnosis);
        this.mkbConcreteDiagnosisId = mkbConcreteDiagnosis.id;
      }
    }
    this.mkbDiagnosis.mkbSubDiagnosis = [];
    this.mkbDiagnosis.mkbGroup = undefined;
    this.editMode = false;
  }

  getFullName(): string {
    if (this.mkbSubDiagnosis.id) {
      return `${this.mkbDiagnosis.code}.${this.mkbSubDiagnosis.subCode} ${this.mkbSubDiagnosis.name}`;
    }
    return this.mkbDiagnosis.getFullName();
  }
}
