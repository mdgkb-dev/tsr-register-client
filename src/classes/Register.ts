import PatientDiagnosis from '@/classes/PatientDiagnosis';
import PatientRegister from '@/classes/PatientRegister';
import Question from '@/classes/Question';
import RegisterDiagnosis from '@/classes/RegisterDiagnosis';
import Research from '@/classes/Research';
import ClassHelper from '@/services/ClassHelper';

export default class Register {
  id?: string;
  name = '';
  @ClassHelper.GetClassConstructor(RegisterDiagnosis)
  registerDiagnosis: RegisterDiagnosis[] = [];
  registerDiagnosisForDelete: string[] = [];
  @ClassHelper.GetClassConstructor(Research)
  registerGroups: Research[] = [];
  registerGroupsForDelete: string[] = [];
  @ClassHelper.GetClassConstructor(PatientRegister)
  patientsRegisters: PatientRegister[] = [];
  registerGroupToRegisterForDelete: string[] = [];
  registerToPatientCount = 0;

  constructor(i?: Register) {
    ClassHelper.BuildClass(this, i);
  }

  getProps(): Question[] {
    const props: Question[] = [];
    this.registerGroups.forEach((group: Research) =>
      group.questions.forEach((property: Question) => {
        props.push(property);
      })
    );
    return props as Question[];
  }

  patientIncludableByDiagnosis(patientDiagnosis: PatientDiagnosis[]): boolean {
    if (this.registerDiagnosis.length === 0) return true;
    const diagnosis = patientDiagnosis.find((d: PatientDiagnosis) => {
      return !!this.registerDiagnosis.find((i) => i.mkbItemId === d.mkbItemId);
    });
    return !!diagnosis;
  }

  patientInRegister(registerToPatient: PatientRegister[]): boolean {
    return !!registerToPatient.find((i: PatientRegister) => i.registerId === this.id);
  }

  getTagName(): string {
    if (this.name.length > 30) return this.name.replace(/(?<=.{9}).+/g, '...');
    return this.name;
  }

  addRegisterGroup(item?: Research): void {
    const newItem = new Research(item);
    newItem.order = this.registerGroups.length;
    this.registerGroups.push(newItem);
  }

  removeRegisterGroup(index: number): void {
    const idForDelete = this.registerGroups[index].id;
    if (idForDelete) {
      this.registerGroupsForDelete.push(idForDelete);
    }
    this.registerGroups.splice(index, 1);
  }

  sortGroups(): void {
    this.registerGroups.forEach((item: Research, index: number) => (item.order = index));
  }
}
