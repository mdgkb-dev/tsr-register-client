import { v4 as uuidv4 } from 'uuid';

import Answer from '@/classes/Answer';
import Patient from '@/classes/Patient';
import Question from '@/classes/Question';
import RegisterPropertyToPatientToFile from '@/classes/RegisterPropertyToPatientToFile';
import Research from '@/classes/Research';
import ClassHelper from '@/services/ClassHelper';

export default class ResearchResult {
  id?: string;
  date = new Date();
  editMode = false;
  patientResearchId?: string;
  patient = new Patient();
  patientId?: string;
  fillingPercentage = 0;
  @ClassHelper.GetClassConstructor(Answer)
  answers: Answer[] = [];
  // patientQuestionsForDelete: string[] = [];
  // @ClassHelper.GetClassConstructor(RegisterPropertyOtherToPatient)
  // registerPropertyOthersToPatient: RegisterPropertyOtherToPatient[] = [];
  // @ClassHelper.GetClassConstructor(RegisterPropertySetToPatient)
  // registerPropertySetToPatient: RegisterPropertySetToPatient[] = [];
  // registerPropertySetToPatientForDelete: string[] = [];

  constructor(i?: ResearchResult) {
    ClassHelper.BuildClass(this, i);
  }

  findProperty(propertyId: string): Answer | undefined {
    return this.answers?.find((i: Answer) => i.registerPropertyId === propertyId);
  }

  pushRegisterProperty(propertyId: string): void {
    const registerPropertyToPatient = new Answer();
    registerPropertyToPatient.registerPropertyId = propertyId;
    this.answers.push(registerPropertyToPatient);
  }

  getOtherPropertyValue(property: Question): string | undefined {
    if (property.id) {
      const item = this.findProperty(property.id);
      return item?.valueOther;
    }
    return undefined;
  }

  getRegisterPropertyToPatient(propertyId: string): Answer[] {
    return this.answers.filter((r: Answer) => r.registerPropertyId === propertyId);
  }

  getRegisterPropertyValue(
    property: Question,
    originalValue: boolean
  ): boolean | string | number | Date | null | RegisterPropertyToPatientToFile[] {
    // if (property.valueType?.isSet()) {
    //   if (originalValue) {
    //     let res = '';
    //     property.registerPropertySets.forEach((propertySet: RegisterPropertySet) => {
    //       this.registerPropertySetToPatient.forEach((prop: RegisterPropertySetToPatient) => {
    //         if (propertySet.id === prop.registerPropertySetId) {
    //           res = `${res}\n${propertySet.name}`;
    //         }
    //       });
    //     });
    //     return res;
    //   }
    //   const item = this.registerPropertySetToPatient?.find((i: RegisterPropertySetToPatient) => i.registerPropertySetId === property.id);
    //   return !!item;
    // }

    if (property.id) {
      // let item = this.findProperty(property.id);
      // if (property.valueType?.isFiles()) {
      //   console.log('files', item);
      //   if (originalValue && item) {
      //     return item.registerPropertiesToPatientsToFileInfos;
      //   } else {
      //     item = new PatientQuestion();
      //     item.id = uuidv4();
      //     this.patientQuestions.push(item);
      //     item.registerPropertyId = property.id;
      //     return item.registerPropertiesToPatientsToFileInfos;
      //   }
      //   // const p = this.getRegisterPropertyToPatient(property.id);
      //
      //   // return ;
      // }
      // if (property.valueType?.isString() && item && item.valueString) {
      //   return item.valueString;
      // }
      // if (property.valueType?.isText() && item && item.valueString) {
      //   return item.valueString;
      // }
      // if (property.valueType?.isNumber() && item && item.valueNumber) {
      //   return item.valueNumber;
      // }
      // if (property.valueType?.isDate() && item && item.valueDate) {
      //   return item.valueDate;
      // }
      // if (property.valueType?.isRadio() && item && item.answerId) {
      //   if (originalValue) {
      //     return property.getRegisterPropertyRadioOriginalValue(item.answerId);
      //   }
      //   return item.answerId;
      // }
    }

    return null;
  }
  //
  // getRegisterPropertyValueSet(setId: string, registerPropWithDateId?: string): boolean {
  //   if (registerPropWithDateId) {
  //     return this.registerPropertySetToPatient?.some(
  //       (i: RegisterPropertySetToPatient) => i.registerPropertySetId === setId && i.propWithDateId === registerPropWithDateId
  //     );
  //   }
  //   return this.registerPropertySetToPatient?.some((i: RegisterPropertySetToPatient) => i.registerPropertySetId === setId);
  // }

  setRegisterPropertyValueOther(value: string, property: Question): void {
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

  setRegisterPropertyValue(value: number | string | Date, property: Question): void {
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

    // if (property.valueType?.isRadio()) {
    //   item.answerId = value as string;
    // }
  }

  setRegisterPropertyValueSet(isAdd: boolean, setId: string, registerPropWithDateId?: string): void {
    // if (isAdd) {
    //   const registerPropertySetToPatient = new RegisterPropertySetToPatient();
    //   registerPropertySetToPatient.registerPropertySetId = setId;
    //   registerPropertySetToPatient.patientId = this.id;
    //   if (registerPropWithDateId) {
    //     registerPropertySetToPatient.propWithDateId = registerPropWithDateId;
    //   }
    //   this.registerPropertySetToPatient.push(registerPropertySetToPatient);
    //   return;
    // }
    // let index = -1;
    // if (registerPropWithDateId) {
    //   index = this.registerPropertySetToPatient?.findIndex(
    //     (i: RegisterPropertySetToPatient) => i.registerPropertySetId === setId && i.propWithDateId === registerPropWithDateId
    //   );
    // } else {
    //   index = this.registerPropertySetToPatient?.findIndex((i: RegisterPropertySetToPatient) => i.registerPropertySetId === setId);
    // }
    // if (index <= -1) {
    //   return;
    // }
    // const idForDelete = this.registerPropertySetToPatient[index].id;
    // if (idForDelete) {
    //   this.registerPropertySetToPatientForDelete.push(idForDelete);
    // }
    // this.registerPropertySetToPatient.splice(index, 1);
  }

  // getRegisterPropertyValueOthers(propertyOtherId: string): string {
  //   const prop = this.registerPropertyOthersToPatient.find(
  //     (propertyOther: RegisterPropertyOtherToPatient) => propertyOther.id === propertyOtherId
  //   );
  //   if (prop) {
  //     return prop.value;
  //   }
  //   const registerPropertyOtherToPatient = new RegisterPropertyOtherToPatient();
  //   registerPropertyOtherToPatient.registerPropertyOtherId = propertyOtherId;
  //   this.registerPropertyOthersToPatient.push(registerPropertyOtherToPatient);
  //   return registerPropertyOtherToPatient.value;
  // }
  //
  // findRegisterPropertyOthers(propertyOtherId: string): RegisterPropertyOtherToPatient {
  //   const prop = this.registerPropertyOthersToPatient.find(
  //     (propertyOther: RegisterPropertyOtherToPatient) => propertyOther.registerPropertyOtherId === propertyOtherId
  //   );
  //   if (prop) {
  //     return prop;
  //   }
  //
  //   const registerPropertyOtherToPatient = new RegisterPropertyOtherToPatient();
  //   registerPropertyOtherToPatient.registerPropertyOtherId = propertyOtherId;
  //   this.registerPropertyOthersToPatient.push(registerPropertyOtherToPatient);
  //   return this.registerPropertyOthersToPatient[0];
  // }
  //
  // setRegisterPropertyOthers(value: string, propertyOtherId: string): void {
  //   const prop = this.findRegisterPropertyOthers(propertyOtherId);
  //   prop.value = value;
  // }
  //
  // getRegisterPropertyOthers(propertyOtherId: string): string {
  //   return this.findRegisterPropertyOthers(propertyOtherId).value;
  // }

  addRegisterValueWithDate(property: Question): void {
    const prop = new Answer();
    prop.valueDate = new Date();
    prop.id = uuidv4();
    prop.registerPropertyId = property.id;
    this.answers.push(prop);
  }

  // getRegisterValuesWithDate(propertyId: string): Answer[] {
  //   return this.answers.filter((r: Answer) => r.registerPropertyId === propertyId);
  // }
  //
  // removeRegisterValueWithDate(propertyId: string): void {
  //   const i = this.answers.findIndex((r: Answer) => r.id === propertyId);
  //   if (i < 0) {
  //     return;
  //   }
  //   const idForDelete = this.answers[i].id;
  //   if (idForDelete) {
  //     this.patientQuestionsForDelete.push(idForDelete);
  //   }
  //   this.answers.splice(i, 1);
  // }
  //
  // getMeasureId(propertyId: string): string {
  //   const prop = this.answers.find((p: Answer) => p.registerPropertyId === propertyId);
  //   if (!prop) {
  //     return '';
  //   }
  //   return prop.questionMeasureId ?? '';
  // }
  //
  // setMeasureId(measureId: string, propertyId: string): void {
  //   const prop = this.answers.find((p: Answer) => p.registerPropertyId === propertyId);
  //   if (!prop) {
  //     return;
  //   }
  //   prop.questionMeasureId = measureId;
  // }

  // static GetFileInfos(items: PatientResearchSection[]): IFileInfo[] {
  //   const fileInfos: IFileInfo[] = [];
  //   items.forEach((i: PatientResearchSection) => {
  //     i.patientQuestions.forEach((r: PatientQuestion) => {
  //       r.registerPropertiesToPatientsToFileInfos.forEach((f: RegisterPropertyToPatientToFile) => fileInfos.push(f.fileInfo));
  //     });
  //   });
  //   return fileInfos;
  // }
}
