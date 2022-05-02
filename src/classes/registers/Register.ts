import RegisterDiagnosis from '@/classes/registers/RegisterDiagnosis';
import RegisterGroup from '@/classes/registers/RegisterGroup';
import RegisterToPatient from '@/classes/registers/RegisterToPatient';
import IPatientDiagnosis from '@/interfaces/patients/IPatientDiagnosis';
import IRegister from '@/interfaces/registers/IRegister';
import IRegisterDiagnosis from '@/interfaces/registers/IRegisterDiagnosis';
import IRegisterGroup from '@/interfaces/registers/IRegisterGroup';
import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';
import IRegisterToPatient from '@/interfaces/registers/IRegisterToPatient';

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
    this.registerGroups.push(new RegisterGroup(item));
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
