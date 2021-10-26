import RegisterDiagnosis from '@/classes/registers/RegisterDiagnosis';
import RegisterGroupToRegister from '@/classes/registers/RegisterGroupToRegister';
import RegisterToPatient from '@/classes/registers/RegisterToPatient';
import IPatientDiagnosis from '@/interfaces/patients/IPatientDiagnosis';
import IRegister from '@/interfaces/registers/IRegister';
import IRegisterDiagnosis from '@/interfaces/registers/IRegisterDiagnosis';
import IRegisterGroupToRegister from '@/interfaces/registers/IRegisterGroupToRegister';
import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';
import IRegisterToPatient from '@/interfaces/registers/IRegisterToPatient';

export default class Register implements IRegister {
  id?: string;
  name = '';
  registerDiagnosis: IRegisterDiagnosis[] = [];
  registerDiagnosisForDelete: string[] = [];
  registerGroupToRegister: IRegisterGroupToRegister[] = [];
  registerToPatient: IRegisterToPatient[] = [];
  registerGroupToRegisterForDelete: string[] = [];
  registerToPatientCount = 0;
  constructor(register?: IRegister) {
    if (!register) return;

    this.id = register.id;
    this.name = register.name;
    if (register.registerGroupToRegister) {
      this.registerGroupToRegister = register.registerGroupToRegister.map(
        (group: IRegisterGroupToRegister) => new RegisterGroupToRegister(group)
      );
    }
    if (register.registerDiagnosis) {
      this.registerDiagnosis = register.registerDiagnosis.map(
        (registerDiagnosis: IRegisterDiagnosis) => new RegisterDiagnosis(registerDiagnosis)
      );
    }
    if (register.registerToPatient) {
      this.registerToPatient = register.registerToPatient.map((item: IRegisterToPatient) => new RegisterToPatient(item));
    }
    this.registerToPatientCount = register.registerToPatientCount;
  }

  getProps(): IRegisterProperty[] {
    const props: IRegisterProperty[] = [];
    this.registerGroupToRegister.forEach((groupToRegister) =>
      groupToRegister.registerGroup?.registerPropertyToRegisterGroup.forEach((propToRegister) => {
        if (propToRegister.registerProperty) props.push(propToRegister.registerProperty);
      })
    );
    return props as IRegisterProperty[];
  }

  patientIncludableByDiagnosis(patientDiagnosis: IPatientDiagnosis[]): boolean {
    console.log(this.registerDiagnosis.length);
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
}
