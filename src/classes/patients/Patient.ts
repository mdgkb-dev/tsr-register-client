import AnthropometryData from '@/classes/anthropometry/AnthropometryData';
import HeightWeight from '@/classes/anthropometry/HeightWeight';
import Bmi from '@/classes/bmi/Bmi';
import Disability from '@/classes/disability/Disability';
import Human from '@/classes/humans/Human';
import PatientDiagnosis from '@/classes/patients/PatientDiagnosis';
import RegisterPropertySetToPatient from '@/classes/registers/RegisterPropertySetToPatient';
import RegisterPropertyToPatient from '@/classes/registers/RegisterPropertyToPatient';
import RegisterToPatient from '@/classes/registers/RegisterToPatient';
import RepresentativeToPatient from '@/classes/representatives/RepresentativeToPatient';
import IAnthropometryData from '@/interfaces/anthropometry/IAnthropometryData';
import IHeightWeight from '@/interfaces/anthropometry/IHeightWeight';
import IDisability from '@/interfaces/disabilities/IDisability';
import IHuman from '@/interfaces/humans/IHuman';
import IPatient from '@/interfaces/patients/IPatient';
import IPatientDiagnosis from '@/interfaces/patients/IPatientDiagnosis';
import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';
import IRegisterPropertySetToPatient from '@/interfaces/registers/IRegisterPropertySetToPatient';
import IRegisterPropertyToPatient from '@/interfaces/registers/IRegisterPropertyToPatient';
import IRegisterToPatient from '@/interfaces/registers/IRegisterToPatient';
import IRepresentativeToPatient from '@/interfaces/representatives/IRepresentativeToPatient';

export default class Patient implements IPatient {
  id?: string;
  human: IHuman = new Human();
  anthropometryData: IAnthropometryData[] = [];
  representativeToPatient: IRepresentativeToPatient[] = [];
  disabilities: IDisability[] = [];
  patientDiagnosis: IPatientDiagnosis[] = [];
  heightWeight: IHeightWeight[] = [];
  registerToPatient?: IRegisterToPatient[] = [];
  registerPropertyToPatient: IRegisterPropertyToPatient[] = [];
  registerPropertySetToPatient: IRegisterPropertySetToPatient[] = [];

  constructor(patient?: IPatient) {
    if (!patient) {
      return;
    }

    this.id = patient.id;
    this.human = new Human(patient.human);
    if (patient.anthropometryData) {
      patient.anthropometryData.sort((a: IAnthropometryData, b: IAnthropometryData) => new Date(a.date).getTime() - new Date(b.date).getTime());
      this.anthropometryData = patient.anthropometryData.map((a: IAnthropometryData) => new AnthropometryData(a));
      this.heightWeight = HeightWeight.anthropometryDataToHeightWeightArr(this.anthropometryData);
    }
    if (patient.patientDiagnosis) {
      this.patientDiagnosis = patient.patientDiagnosis.map((patientDiagnosis: IPatientDiagnosis) => new PatientDiagnosis(patientDiagnosis));
    }
    if (patient.representativeToPatient) {
      this.representativeToPatient = patient.representativeToPatient.map(
        (representativeToPatient: IRepresentativeToPatient) => new RepresentativeToPatient(representativeToPatient)
      );
    }
    if (patient.disabilities) {
      this.disabilities = patient.disabilities.map((disability: IDisability) => new Disability(disability));
    }
    if (patient.registerToPatient) {
      this.registerToPatient = patient.registerToPatient.map((i: IRegisterToPatient) => new RegisterToPatient(i));
    }
    if (patient.registerPropertyToPatient) {
      this.registerPropertyToPatient = patient.registerPropertyToPatient.map((i: IRegisterPropertyToPatient) => new RegisterPropertyToPatient(i));
    }
    if (patient.registerPropertySetToPatient) {
      this.registerPropertySetToPatient = patient.registerPropertySetToPatient.map((i: IRegisterPropertySetToPatient) => new RegisterPropertySetToPatient(i));
    }
  }

  getAnthropometryDataFull(): string {
    let total = '';
    // const anthropometryNames: (string | undefined)[] = [...new Set(this.anthropometryData.map((data: IAnthropometryData) => data.anthropometry?.name))];
    const anthropometryNames: string[] = ['Вес', 'Рост'];
    anthropometryNames.forEach((name: string) => {
      const currentAnthropometryData = this.anthropometryData.filter((data: IAnthropometryData) => data.anthropometry?.name.toLowerCase() === name.toLowerCase());
      if (currentAnthropometryData.length) {
        const lastAnthropometry = currentAnthropometryData.reduce((mostRecent: IAnthropometryData, item: IAnthropometryData) =>
          new Date(item.date) > new Date(mostRecent.date) ? item : mostRecent
        );
        total = `<div>${total} ${lastAnthropometry.getFullInfo()}</div>`;
      }
    });
    return total;
  }

  getActuallyDisability(): IDisability {
    return this.disabilities[this.disabilities.length - 1];
  }

  getLastAnthropometryValue(name: string): number {
    const currentAnthropometryData = this.anthropometryData.filter(data => data.anthropometry?.name.toLowerCase() === name.toLowerCase());
    if (!currentAnthropometryData.length) return 0;
    const lastAnthropometry = currentAnthropometryData.reduce((mostRecent: IAnthropometryData, item: IAnthropometryData) =>
      new Date(item.date) > new Date(mostRecent.date) ? item : mostRecent
    );
    return lastAnthropometry.value;
  }

  getBmiGroup(): string {
    const lastWeight = this.getLastAnthropometryValue('вес');
    const lastHeight = this.getLastAnthropometryValue('рост');
    if (!lastWeight || !lastHeight) return 'Недостаточно данных';
    const bmi = Bmi.calculate(lastWeight, lastHeight);
    const month = Bmi.birthDateToMonth(this.human.dateBirth);
    const bmiMonth = Bmi.findBmiMonth(month, this.human.isMale);
    if (!bmiMonth) return 'Данные по данной дате рождения неизвестны';
    const group = Bmi.calculateGroup(bmi, bmiMonth);
    if (!group) return 'Некорректные данные антропометрии';
    const weightClass = Bmi.getWeightClass(group);
    return `${group}, ${weightClass}`;
  }

  findProperty(propertyId: string): RegisterPropertyToPatient | undefined {
    return this.registerPropertyToPatient?.find((i: IRegisterPropertyToPatient) => i.registerPropertyId === propertyId);
  }

  pushRegisterProperty(propertyId: string): void {
    const registerPropertyToPatient = new RegisterPropertyToPatient();
    registerPropertyToPatient.registerPropertyId = propertyId;
    this.registerPropertyToPatient.push(registerPropertyToPatient);
  }

  getRegisterPropertyValue(property: IRegisterProperty): boolean | string | number | Date | null {
    if (property.valueType?.isSet()) {
      const item = this.registerPropertySetToPatient?.find((i: IRegisterPropertySetToPatient) => i.registerPropertySetId === property.id);
      return !!item;
    }
    if (property.id) {
      const item = this.findProperty(property.id);
      if (property.valueType?.isString() && item && item.valueString) return item.valueString;
      if (property.valueType?.isText() && item && item.valueString) return item.valueString;
      if (property.valueType?.isNumber() && item && item.valueNumber) return item.valueNumber;
      if (property.valueType?.isDate() && item && item.valueDate) return item.valueDate;
      if (property.valueType?.isRadio() && item && item.registerPropertyRadioId) return item.registerPropertyRadioId;
    }
    return null;
  }

  getRegisterPropertyValueSet(setId: string): boolean {
    return !!this.registerPropertySetToPatient?.find((i: IRegisterPropertySetToPatient) => i.registerPropertySetId === setId);
  }

  setRegisterPropertyValue(value: number | string | Date, property: IRegisterProperty): void {
    if (!property.id) return;
    let item = this.findProperty(property.id);
    if (!item) {
      this.pushRegisterProperty(property.id);
      item = this.findProperty(property.id);
    }
    if (!item) return;
    if (property.valueType?.isString() || property.valueType?.isText()) item.valueString = value as string;
    if (property.valueType?.isNumber()) item.valueNumber = value as number;
    if (property.valueType?.isDate()) item.valueDate = value as Date;
    if (property.valueType?.isRadio()) item.registerPropertyRadioId = value as string;
  }

  setRegisterPropertyValueSet(check: boolean, setId: string): void {
    if (check) {
      const registerPropertySetToPatient = new RegisterPropertySetToPatient();
      registerPropertySetToPatient.registerPropertySetId = setId;
      registerPropertySetToPatient.patientId = this.id;
      this.registerPropertySetToPatient.push(registerPropertySetToPatient);
      return;
    }
    const index = this.registerPropertySetToPatient?.findIndex((i: IRegisterPropertySetToPatient) => i.registerPropertySetId === setId);
    if (index > -1) {
      this.registerPropertySetToPatient.splice(index, 1);
    }
  }
}
