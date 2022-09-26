import RegisterDiagnosis from '@/classes/RegisterDiagnosis';
import RegisterGroup from '@/classes/RegisterGroup';
import RegisterToPatient from '@/classes/RegisterToPatient';
import IPatientDiagnosis from '@/interfaces/patients/IPatientDiagnosis';
import IRegister from '@/interfaces/IRegister';
import IRegisterDiagnosis from '@/interfaces/IRegisterDiagnosis';
import IRegisterGroup from '@/interfaces/IRegisterGroup';
import IRegisterProperty from '@/interfaces/IRegisterProperty';
import IRegisterToPatient from '@/interfaces/IRegisterToPatient';

export default class Register implements IRegister {
  id?: string;
  name = '';
  registerDiagnosis: IRegisterDiagnosis[] = [];
  registerDiagnosisForDelete: string[] = [];
  registerGroups: IRegisterGroup[] = [];
  registerGroupsForDelete: string[] = [];
  registerToPatient: IRegisterToPatient[] = [];
  registerGroupToRegisterForDelete: string[] = [];
  registerToPatientCount = 0;

  constructor(i?: IRegister) {
    if (!i) return;

    this.id = i.id;
    this.name = i.name;
    if (i.registerGroups) {
      this.registerGroups = i.registerGroups.map((item: IRegisterGroup) => new RegisterGroup(item));
    }
    if (i.registerDiagnosis) {
      this.registerDiagnosis = i.registerDiagnosis.map((registerDiagnosis: IRegisterDiagnosis) => new RegisterDiagnosis(registerDiagnosis));
    }
    if (i.registerToPatient) {
      this.registerToPatient = i.registerToPatient.map((item: IRegisterToPatient) => new RegisterToPatient(item));
    }
    this.registerToPatientCount = i.registerToPatientCount;
  }

  getProps(): IRegisterProperty[] {
    const props: IRegisterProperty[] = [];
    this.registerGroups.forEach((group: IRegisterGroup) =>
      group.registerProperties.forEach((property: IRegisterProperty) => {
        props.push(property);
      })
    );
    return props as IRegisterProperty[];
  }

  patientIncludableByDiagnosis(patientDiagnosis: IPatientDiagnosis[]): boolean {
    if (this.registerDiagnosis.length === 0) return true;
    const diagnosis = patientDiagnosis.find((d: IPatientDiagnosis) => {
      return !!this.registerDiagnosis.find((i) => i.mkbDiagnosisId === d.mkbDiagnosisId);
    });
    return !!diagnosis;
  }

  patientInRegister(registerToPatient: IRegisterToPatient[]): boolean {
    return !!registerToPatient.find((i: IRegisterToPatient) => i.registerId === this.id);
  }

  getTagName(): string {
    if (this.name.length > 10) return this.name.replace(/(?<=.{9}).+/g, '...');
    return this.name;
  }

  addRegisterGroup(item?: IRegisterGroup): void {
    const newItem = new RegisterGroup(item);
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
    this.registerGroups.forEach((item: IRegisterGroup, index: number) => (item.order = index));
  }
}
