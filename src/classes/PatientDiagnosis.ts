import MkbItem from '@/classes/MkbItem';
import Patient from '@/classes/Patient';
import PatientDiagnosisAnamnesis from '@/classes/PatientDiagnosisAnamnesis';
import ClassHelper from '@/services/ClassHelper';

export default class PatientDiagnosis {
  id?: string;
  primary = false;
  selected = false;
  editMode = false;
  patientId?: string;
  patient?: Patient;
  @ClassHelper.GetClassConstructor(PatientDiagnosisAnamnesis)
  patientDiagnosisAnamnesis: PatientDiagnosisAnamnesis[] = [];
  patientDiagnosisAnamnesisForDelete: string[] = [];
  @ClassHelper.GetClassConstructor(MkbItem)
  mkbItem?: MkbItem;
  mkbItemId?: string;
  constructor(i?: PatientDiagnosis) {
    ClassHelper.BuildClass(this, i);
  }

  // saveDiagnosis(mkbClass: MkbClass): void {
  //   if (!mkbClass.selectedDiagnosisId) {
  //     this.editMode = false;
  //     return;
  //   }
  //   const allDiagnosis = mkbClass.getAllDiagnosis();
  //   const diagnosis = allDiagnosis.find((d: MkbDiagnosis) => d.id === mkbClass.selectedDiagnosisId);
  //   if (diagnosis && diagnosis.id) {
  //     this.mkbDiagnosis = new MkbDiagnosis(diagnosis);
  //     this.mkbDiagnosisId = diagnosis.id;
  //   }
  //   if (mkbClass.selectedSubDiagnosisId) {
  //     const mkbSubDiagnosis = this.mkbDiagnosis.mkbSubDiagnosis.find((msd: MkbSubDiagnosis) => msd.id === mkbClass.selectedSubDiagnosisId);
  //     if (mkbSubDiagnosis && mkbSubDiagnosis.id) {
  //       this.mkbSubDiagnosis = new MkbSubDiagnosis(mkbSubDiagnosis);
  //       this.mkbSubDiagnosisId = mkbSubDiagnosis.id;
  //       if (this.mkbSubDiagnosis.mkbDiagnosis) {
  //         this.mkbSubDiagnosis.mkbDiagnosis.mkbGroup = undefined;
  //       }
  //     }
  //   }
  //   if (mkbClass.selectedConcreteDiagnosisId) {
  //     const mkbConcreteDiagnosis = this.mkbDiagnosis.getConcreteDiagnosis(mkbClass.selectedConcreteDiagnosisId);
  //     if (mkbConcreteDiagnosis && mkbConcreteDiagnosis.id) {
  //       this.mkbConcreteDiagnosis = new MkbConcreteDiagnosis(mkbConcreteDiagnosis);
  //       this.mkbConcreteDiagnosisId = mkbConcreteDiagnosis.id;
  //     }
  //   }
  //   this.mkbDiagnosis.mkbSubDiagnosis = [];
  //   this.mkbDiagnosis.mkbGroup = undefined;
  //   this.editMode = false;
  // }
  //
}
