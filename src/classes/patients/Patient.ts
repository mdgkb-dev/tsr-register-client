import Circumference from '@/classes/anthropometry/Circumference';
import HeightWeight from '@/classes/anthropometry/HeightWeight';
import Disability from '@/classes/disability/Disability';
import History from '@/classes/history/History';
import Human from '@/classes/humans/Human';
import PatientDiagnosis from '@/classes/patients/PatientDiagnosis';
import PatientDiagnosisAnamnesis from '@/classes/patients/PatientDiagnosisAnamnesis';
import PatientDrugRegimen from '@/classes/patients/PatientDrugRegimen';
import RegisterPropertyOtherToPatient from '@/classes/registers/RegisterPropertyOtherToPatient';
import RegisterPropertySetToPatient from '@/classes/registers/RegisterPropertySetToPatient';
import RegisterPropertyToPatient from '@/classes/registers/RegisterPropertyToPatient';
import RegisterToPatient from '@/classes/registers/RegisterToPatient';
import RepresentativeToPatient from '@/classes/representatives/RepresentativeToPatient';
import User from '@/classes/user/User';
import ICircumference from '@/interfaces/anthropometry/ICircumference';
import IHeightWeight from '@/interfaces/anthropometry/IHeightWeight';
import IDisability from '@/interfaces/disabilities/IDisability';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IHistory from '@/interfaces/history/IHistory';
import IHuman from '@/interfaces/humans/IHuman';
import IPatient from '@/interfaces/patients/IPatient';
import IPatientConstructor from '@/interfaces/patients/IPatientConstructor';
import IPatientDiagnosis from '@/interfaces/patients/IPatientDiagnosis';
import IPatientDiagnosisAnamnesis from '@/interfaces/patients/IPatientDiagnosisAnamnesis';
import IPatientDrugRegimen from '@/interfaces/patients/IPatientDrugRegimen';
import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';
import IRegisterPropertyOtherToPatient from '@/interfaces/registers/IRegisterPropertyOtherToPatient';
import IRegisterPropertySet from '@/interfaces/registers/IRegisterPropertySet';
import IRegisterPropertySetToPatient from '@/interfaces/registers/IRegisterPropertySetToPatient';
import IRegisterPropertyToPatient from '@/interfaces/registers/IRegisterPropertyToPatient';
import IRegisterToPatient from '@/interfaces/registers/IRegisterToPatient';
import IRepresentativeToPatient from '@/interfaces/representatives/IRepresentativeToPatient';
import IUser from '@/interfaces/users/IUser';
import { v4 as uuidv4 } from 'uuid';

export default class Patient implements IPatient {
  id?: string;
  patientHistoryId?: string;
  human: IHuman = new Human();
  regionId?: string;
  history?: IHistory = new History();
  representativeToPatient: IRepresentativeToPatient[] = [];
  representativeToPatientForDelete: string[] = [];
  disabilities: IDisability[] = [];
  disabilitiesForDelete: string[] = [];
  patientDiagnosis: IPatientDiagnosis[] = [];
  patientDiagnosisForDelete: string[] = [];
  heightWeight: IHeightWeight[] = [];
  heightWeightForDelete: string[] = [];
  chestCircumference: ICircumference[] = [];
  chestCircumferenceForDelete: string[] = [];
  headCircumference: ICircumference[] = [];
  headCircumferenceForDelete: string[] = [];
  registerToPatient: IRegisterToPatient[] = [];
  registerToPatientForDelete: string[] = [];
  registerPropertyToPatient: IRegisterPropertyToPatient[] = [];
  registerPropertyToPatientForDelete: string[] = [];
  registerPropertyOthersToPatient: IRegisterPropertyOtherToPatient[] = [];
  registerPropertySetToPatient: IRegisterPropertySetToPatient[] = [];
  registerPropertySetToPatientForDelete: string[] = [];
  patientDrugRegimen: IPatientDrugRegimen[] = [];
  patientDrugRegimenForDelete: string[] = [];

  createdAt?: Date;
  updatedAt?: Date;
  createdById?: string;
  updatedById?: string;
  createdBy?: IUser;
  updatedBy?: IUser;

  constructor(i?: IPatientConstructor) {
    if (!i) {
      return;
    }

    this.id = i.id;
    this.patientHistoryId = i.patientHistoryId;
    this.regionId = i.regionId;
    this.human = new Human(i.human);
    if (i.history) {
      this.history = new History(i.history);
    }
    if (i.heightWeight) {
      this.heightWeight = i.heightWeight.map((i: IHeightWeight) => new HeightWeight(i));
    }
    if (i.chestCircumference) {
      this.chestCircumference = i.chestCircumference.map((i: ICircumference) => new Circumference(i));
    }
    if (i.headCircumference) {
      this.headCircumference = i.headCircumference.map((i: ICircumference) => new Circumference(i));
    }
    if (i.patientDiagnosis) {
      this.patientDiagnosis = i.patientDiagnosis.map((patientDiagnosis: IPatientDiagnosis) => new PatientDiagnosis(patientDiagnosis));
    }
    if (i.representativeToPatient) {
      this.representativeToPatient = i.representativeToPatient.map(
        (representativeToPatient: IRepresentativeToPatient) => new RepresentativeToPatient(representativeToPatient)
      );
    }
    if (i.disabilities) {
      this.disabilities = i.disabilities.map((disability: IDisability) => new Disability(disability));
    }
    if (i.registerToPatient) {
      this.registerToPatient = i.registerToPatient.map((i: IRegisterToPatient) => new RegisterToPatient(i));
    }
    if (i.registerPropertyToPatient) {
      this.registerPropertyToPatient = i.registerPropertyToPatient.map((i: IRegisterPropertyToPatient) => new RegisterPropertyToPatient(i));
    }
    if (i.registerPropertySetToPatient) {
      this.registerPropertySetToPatient = i.registerPropertySetToPatient.map(
        (i: IRegisterPropertySetToPatient) => new RegisterPropertySetToPatient(i)
      );
    }
    if (i.registerPropertyOthersToPatient) {
      this.registerPropertyOthersToPatient = i.registerPropertyOthersToPatient.map(
        (item: IRegisterPropertyOtherToPatient) => new RegisterPropertyOtherToPatient(item)
      );
    }
    if (i.patientDrugRegimen) {
      this.patientDrugRegimen = i.patientDrugRegimen.map((i: IPatientDrugRegimen) => new PatientDrugRegimen(i));
    }
    this.createdAt = i.createdAt;
    this.updatedAt = i.updatedAt;
    this.createdById = i.createdById;
    this.updatedById = i.updatedById;
    if (i.createdBy) this.createdBy = new User(i.createdBy);
    if (i.updatedBy) this.updatedBy = new User(i.updatedBy);
  }

  getActuallyDisability(): IDisability {
    return this.disabilities[this.disabilities.length - 1];
  }

  getLastHeightWeight(): IHeightWeight | undefined {
    if (!this.heightWeight.length) {
      return;
    }

    return this.heightWeight.reduce((mostRecent: IHeightWeight, item: IHeightWeight) => {
      return new Date(item.date) > new Date(mostRecent.date) ? item : mostRecent;
    });
  }

  getLastCircumference(circumference: ICircumference[]): ICircumference | undefined {
    if (!circumference.length) {
      return;
    }

    return circumference.reduce((mostRecent: ICircumference, item: ICircumference) => {
      return new Date(item.date) > new Date(mostRecent.date) ? item : mostRecent;
    });
  }

  getHeightWeightShort(): string {
    const lastHeightWeight = this.getLastHeightWeight();

    if (lastHeightWeight?.weight && lastHeightWeight.height) {
      return `${lastHeightWeight.weight} кг ${lastHeightWeight.height} см`;
    }

    return '';
  }

  // getBmiGroup(): string {
  //   const lastHeightWeight = this.getLastHeightWeight();
  //   const lastWeight = lastHeightWeight?.weight;
  //   const lastHeight = lastHeightWeight?.height;

  //   if (!lastWeight || !lastHeight) {
  //     return 'Недостаточно данных';
  //   }

  //   const bmi = Bmi.calculate(lastWeight, lastHeight);
  //   const month = Bmi.birthDateToMonth(this.human.dateBirth);
  //   const bmiMonth = Bmi.findBmiMonth(month, this.human.isMale);

  //   if (!bmiMonth) {
  //     return 'Данные по данной дате рождения неизвестны';
  //   }

  //   const group = Bmi.calculateGroup(bmi, bmiMonth);

  //   if (!group) {
  //     return 'Некорректные данные антропометрии';
  //   }

  //   const weightClass = Bmi.getWeightClass(group);
  //   return `${group}, ${weightClass}`;
  // }

  // getChestCircumferenceGroup(): string {
  //   const lastChestCircumference = this.getLastCircumference(this.chestCircumference);
  //   if (!lastChestCircumference?.value) {
  //     return 'Недостаточно данных';
  //   }
  //   const month = Bmi.birthDateToMonth(this.human.dateBirth);
  //   const monthGroups = Circumference.findChestCircumferenceGroup(month, this.human.isMale);
  //   if (!monthGroups) {
  //     return 'Данные по данной дате рождения неизвестны';
  //   }
  //   const group = Circumference.calculateChestCircumferenceGroup(lastChestCircumference.value, monthGroups);
  //   if (!group) {
  //     return 'Некорректные данные окружности груди';
  //   }
  //   const groupRecomendation = Circumference.getCircumferenceGroupRecomendation(group);
  //   return `${group}, ${groupRecomendation}`;
  // }

  findProperty(propertyId: string): IRegisterPropertyToPatient | undefined {
    return this.registerPropertyToPatient?.find((i: IRegisterPropertyToPatient) => i.registerPropertyId === propertyId);
  }

  pushRegisterProperty(propertyId: string): void {
    const registerPropertyToPatient = new RegisterPropertyToPatient();
    registerPropertyToPatient.registerPropertyId = propertyId;
    this.registerPropertyToPatient.push(registerPropertyToPatient);
  }

  getOtherPropertyValue(property: IRegisterProperty): string | undefined {
    if (property.id) {
      const item = this.findProperty(property.id);
      return item?.valueOther;
    }
    return undefined;
  }

  getRegisterPropertyValue(property: IRegisterProperty, originalValue: boolean): boolean | string | number | Date | null {
    if (property.valueType?.isSet()) {
      if (originalValue) {
        let res = '';
        property.registerPropertySets.forEach((propertySet: IRegisterPropertySet) => {
          this.registerPropertySetToPatient.forEach((prop: IRegisterPropertySetToPatient) => {
            if (propertySet.id === prop.registerPropertySetId) {
              res = `${res}\n${propertySet.name}`;
            }
          });
        });
        return res;
      }
      const item = this.registerPropertySetToPatient?.find((i: IRegisterPropertySetToPatient) => i.registerPropertySetId === property.id);
      return !!item;
    }

    if (property.id) {
      const item = this.findProperty(property.id);

      if (property.valueType?.isString() && item && item.valueString) {
        return item.valueString;
      }
      if (property.valueType?.isText() && item && item.valueString) {
        return item.valueString;
      }
      if (property.valueType?.isNumber() && item && item.valueNumber) {
        return item.valueNumber;
      }
      if (property.valueType?.isDate() && item && item.valueDate) {
        return item.valueDate;
      }
      if (property.valueType?.isRadio() && item && item.registerPropertyRadioId) {
        if (originalValue) {
          return property.getRegisterPropertyRadioOriginalValue(item.registerPropertyRadioId);
        }
        return item.registerPropertyRadioId;
      }
    }

    return null;
  }

  getRegisterPropertyValueSet(setId: string, registerPropWithDateId?: string): boolean {
    if (registerPropWithDateId) {
      return this.registerPropertySetToPatient?.some(
        (i: IRegisterPropertySetToPatient) => i.registerPropertySetId === setId && i.propWithDateId === registerPropWithDateId
      );
    }
    return this.registerPropertySetToPatient?.some((i: IRegisterPropertySetToPatient) => i.registerPropertySetId === setId);
  }

  setRegisterPropertyValueOther(value: string, property: IRegisterProperty): void {
    if (!property.id) {
      return;
    }

    let item = this.findProperty(property.id);

    if (!item) {
      this.pushRegisterProperty(property.id);
      item = this.findProperty(property.id);
    }

    if (!item) {
      return;
    }

    item.valueOther = value as string;
  }

  setRegisterPropertyValue(value: number | string | Date, property: IRegisterProperty): void {
    if (!property.id) {
      return;
    }

    let item = this.findProperty(property.id);

    if (!item) {
      this.pushRegisterProperty(property.id);
      item = this.findProperty(property.id);
    }

    if (!item) {
      return;
    }

    if (property.valueType?.isString() || property.valueType?.isText()) {
      item.valueString = value as string;
    }

    if (property.valueType?.isNumber()) {
      item.valueNumber = value as number;
    }

    if (property.valueType?.isDate()) {
      item.valueDate = value as Date;
    }

    if (property.valueType?.isRadio()) {
      item.registerPropertyRadioId = value as string;
    }
  }

  setRegisterPropertyValueSet(isAdd: boolean, setId: string, registerPropWithDateId?: string): void {
    if (isAdd) {
      const registerPropertySetToPatient = new RegisterPropertySetToPatient();
      registerPropertySetToPatient.registerPropertySetId = setId;
      registerPropertySetToPatient.patientId = this.id;
      if (registerPropWithDateId) {
        registerPropertySetToPatient.propWithDateId = registerPropWithDateId;
      }
      this.registerPropertySetToPatient.push(registerPropertySetToPatient);
      return;
    }
    let index = -1;
    if (registerPropWithDateId) {
      index = this.registerPropertySetToPatient?.findIndex(
        (i: IRegisterPropertySetToPatient) => i.registerPropertySetId === setId && i.propWithDateId === registerPropWithDateId
      );
    } else {
      index = this.registerPropertySetToPatient?.findIndex((i: IRegisterPropertySetToPatient) => i.registerPropertySetId === setId);
    }
    if (index <= -1) {
      return;
    }
    const idForDelete = this.registerPropertySetToPatient[index].id;
    if (idForDelete) {
      this.registerPropertySetToPatientForDelete.push(idForDelete);
    }
    this.registerPropertySetToPatient.splice(index, 1);
  }

  getFileInfos(): IFileInfo[] {
    return [...Human.GetFileInfos(this.human), ...Disability.GetFileInfos(this.disabilities)];
  }

  getAnamnesis(id: string): IPatientDiagnosisAnamnesis {
    for (const diagnosis of this.patientDiagnosis) {
      const anamnesis = diagnosis.patientDiagnosisAnamnesis.find((i: IPatientDiagnosisAnamnesis) => i.id === id);

      if (anamnesis) {
        return anamnesis;
      }
    }

    return new PatientDiagnosisAnamnesis();
  }

  getRegisterPropertyValueOthers(propertyOtherId: string): string {
    const prop = this.registerPropertyOthersToPatient.find(
      (propertyOther: IRegisterPropertyOtherToPatient) => propertyOther.id === propertyOtherId
    );
    if (prop) {
      return prop.value;
    }
    const registerPropertyOtherToPatient = new RegisterPropertyOtherToPatient();
    registerPropertyOtherToPatient.registerPropertyOtherId = propertyOtherId;
    this.registerPropertyOthersToPatient.push(registerPropertyOtherToPatient);
    return registerPropertyOtherToPatient.value;
  }

  findRegisterPropertyOthers(propertyOtherId: string): IRegisterPropertyOtherToPatient {
    const prop = this.registerPropertyOthersToPatient.find(
      (propertyOther: IRegisterPropertyOtherToPatient) => propertyOther.registerPropertyOtherId === propertyOtherId
    );
    if (prop) {
      return prop;
    }

    const registerPropertyOtherToPatient = new RegisterPropertyOtherToPatient();
    registerPropertyOtherToPatient.registerPropertyOtherId = propertyOtherId;
    this.registerPropertyOthersToPatient.push(registerPropertyOtherToPatient);
    return this.registerPropertyOthersToPatient[0];
  }

  setRegisterPropertyOthers(value: string, propertyOtherId: string): void {
    const prop = this.findRegisterPropertyOthers(propertyOtherId);
    prop.value = value;
  }

  getRegisterPropertyOthers(propertyOtherId: string): string {
    return this.findRegisterPropertyOthers(propertyOtherId).value;
  }

  addRegisterValueWithDate(property: IRegisterProperty): void {
    const prop = new RegisterPropertyToPatient();
    prop.valueDate = new Date();
    prop.id = uuidv4();
    prop.registerPropertyId = property.id;
    this.registerPropertyToPatient.push(prop);
  }

  getRegisterValuesWithDate(propertyId: string): IRegisterPropertyToPatient[] {
    return this.registerPropertyToPatient.filter((r: IRegisterPropertyToPatient) => r.registerPropertyId === propertyId);
  }

  removeRegisterValueWithDate(propertyId: string): void {
    const i = this.registerPropertyToPatient.findIndex((r: IRegisterPropertyToPatient) => r.id === propertyId);
    if (i < 0) {
      return;
    }
    const idForDelete = this.registerPropertyToPatient[i].id;
    if (idForDelete) {
      this.registerPropertyToPatientForDelete.push(idForDelete);
    }
    this.registerPropertyToPatient.splice(i, 1);
  }
}
