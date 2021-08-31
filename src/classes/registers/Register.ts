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

  constructor(i?: IRegister) {
    if (!i) return;

    this.id = i.id;
    this.name = i.name;
    if (i.registerGroupToRegister) {
      this.registerGroupToRegister = i.registerGroupToRegister.map((group: IRegisterGroupToRegister) => new RegisterGroupToRegister(group));
    }
    if (i.registerDiagnosis) {
      this.registerDiagnosis = i.registerDiagnosis.map((registerDiagnosis: IRegisterDiagnosis) => new RegisterDiagnosis(registerDiagnosis));
    }
    if (i.registerToPatient) {
      this.registerToPatient = i.registerToPatient.map((item: IRegisterToPatient) => new RegisterToPatient(item));
    }
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
    if (this.registerDiagnosis.length === 0) return true;
    const diagnosis = patientDiagnosis.find((d: IPatientDiagnosis) => {
      return !!this.registerDiagnosis.find((i) => i.mkbDiagnosisId === d.mkbDiagnosisId);
    });
    return !!diagnosis;
  }
  patientInRegister(registerToPatient: IRegisterToPatient[]): boolean {
    return !!registerToPatient.find((i: IRegisterToPatient) => i.registerId === this.id);
  }
}
