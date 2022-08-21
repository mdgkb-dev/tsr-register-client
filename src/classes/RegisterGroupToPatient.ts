import { v4 as uuidv4 } from 'uuid';

import Patient from '@/classes/patients/Patient';
import RegisterGroup from '@/classes/registers/RegisterGroup';
import RegisterPropertyOtherToPatient from '@/classes/registers/RegisterPropertyOtherToPatient';
import RegisterPropertySetToPatient from '@/classes/registers/RegisterPropertySetToPatient';
import RegisterPropertyToPatient from '@/classes/registers/RegisterPropertyToPatient';
import IRegisterGroupToPatient from '@/interfaces/registers/IRegisterGroupToPatient';
import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';
import IRegisterPropertyOtherToPatient from '@/interfaces/registers/IRegisterPropertyOtherToPatient';
import IRegisterPropertySet from '@/interfaces/registers/IRegisterPropertySet';
import IRegisterPropertySetToPatient from '@/interfaces/registers/IRegisterPropertySetToPatient';
import IRegisterPropertyToPatient from '@/interfaces/registers/IRegisterPropertyToPatient';

export default class RegisterGroupToPatient implements IRegisterGroupToPatient {
  id?: string;
  date = new Date();
  registerGroupId?: string;
  editMode = false;
  registerGroup = new RegisterGroup();
  registerPropertyToPatient: IRegisterPropertyToPatient[] = [];
  registerPropertyToPatientForDelete: string[] = [];
  registerPropertyOthersToPatient: IRegisterPropertyOtherToPatient[] = [];
  registerPropertySetToPatient: IRegisterPropertySetToPatient[] = [];
  registerPropertySetToPatientForDelete: string[] = [];
  patient = new Patient();
  patientId?: string;
  constructor(i?: IRegisterGroupToPatient) {
    if (!i) {
      return;
    }

    this.id = i.id;
    if (i.date) {
      this.date = new Date(i.date);
    }
    this.registerGroupId = i.registerGroupId;
    if (i.registerGroup) {
      this.registerGroup = new RegisterGroup(i.registerGroup);
    }
    this.patientId = i.patientId;
    if (i.patient) {
      this.patient = new Patient(i.patient);
    }
    if (i.registerPropertyToPatient) {
      this.registerPropertyToPatient = i.registerPropertyToPatient.map((i: IRegisterPropertyToPatient) => new RegisterPropertyToPatient(i));
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
  }

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
    console.log(value, property);
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

  getMeasureId(propertyId: string): string {
    const prop = this.registerPropertyToPatient.find((p: IRegisterPropertyToPatient) => p.registerPropertyId === propertyId);
    if (!prop) {
      return '';
    }
    console.log(prop.registerPropertyMeasureId);
    return prop.registerPropertyMeasureId ?? '';
  }

  setMeasureId(measureId: string, propertyId: string): void {
    const prop = this.registerPropertyToPatient.find((p: IRegisterPropertyToPatient) => p.registerPropertyId === propertyId);
    if (!prop) {
      return;
    }
    prop.registerPropertyMeasureId = measureId;
  }
}
