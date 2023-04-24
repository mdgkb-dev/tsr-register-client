import { v4 as uuidv4 } from 'uuid';

import Answer from '@/classes/Answer';
import Question from '@/classes/Question';
import RegisterPropertyToPatientToFile from '@/classes/RegisterPropertyToPatientToFile';
import Research from '@/classes/Research';
import ClassHelper from '@/services/ClassHelper';

export default class ResearchResult {
  id?: string;
  date = new Date();
  editMode = false;
  patientResearchId?: string;
  // patient = new Patient();
  // patientId?: string;
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

  static Create(research: Research, patientResearchId?: string): ResearchResult {
    const item = new ResearchResult();
    item.id = uuidv4();
    item.patientResearchId = patientResearchId;
    item.answers.push(...Answer.CreateMany(research.questions));
    return item;
  }

  addAnswer(answer: Answer): void {
    this.answers.push(answer);
  }

  getResult(questionId: string): Answer | undefined {
    return this.answers?.find((i: Answer) => i.questionId === questionId);
  }

  pushRegisterProperty(propertyId: string): void {
    const registerPropertyToPatient = new Answer();
    registerPropertyToPatient.researchResultId = propertyId;
    this.answers.push(registerPropertyToPatient);
  }

  // getOtherPropertyValue(property: Question): string | undefined {
  //   if (property.id) {
  //     const item = this.getResult(property.id);
  //     return item?.valueOther;
  //   }
  //   return undefined;
  // }

  getRegisterPropertyToPatient(propertyId: string): Answer[] {
    return this.answers.filter((r: Answer) => r.researchResultId === propertyId);
  }

  getValue(question: Question, originalValue: boolean): boolean | string | number | Date | null | RegisterPropertyToPatientToFile[] {
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
    if (!question.id) {
      return null;
    }
    const result = this.getResult(question.id);
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
    if (question.valueType?.isNumber() && result) {
      return result.valueNumber as number;
    }
    // if (property.valueType?.isDate() && item && item.valueDate) {
    //   return item.valueDate;
    // }
    // if (property.valueType?.isRadio() && item && item.answerId) {
    //   if (originalValue) {
    //     return property.getRegisterPropertyRadioOriginalValue(item.answerId);
    //   }
    //   return item.answerId;
    // }

    return null;
  }

  setRegisterPropertyValueOther(value: string, property: Question): void {
    if (!property.id) {
      return;
    }

    let item = this.getResult(property.id);

    if (!item) {
      this.pushRegisterProperty(property.id);
      item = this.getResult(property.id);
    }

    if (!item) {
      return;
    }

    item.valueOther = value as string;
  }

  getAnswer(questionId: string): Answer {
    let item = this.getResult(questionId);
    if (!item) {
      this.pushRegisterProperty(questionId);
      item = this.getResult(questionId);
    }
    return item as Answer;
  }

  setValue(value: number | string | Date, question: Question): void {
    const item = this.getAnswer(question.id as string);
    if (question.valueType?.isString() || question.valueType?.isText()) {
      item.valueString = value as string;
    }
    if (question.valueType?.isNumber()) {
      item.valueNumber = value as number;
    }
    if (question.valueType?.isDate()) {
      item.valueDate = value as Date;
    }
    // if (property.valueType?.isRadio()) {
    //   item.answerId = value as string;
    // }
  }

  setStringValue(value: string, question: Question): void {
    const item = this.getAnswer(question.id as string);
    item.valueString = value;
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
    prop.researchResultId = property.id;
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

  calculateFilling(): void {
    const filledAnswers = this.answers.filter((a: Answer) => a.filled).length;
    const allAnswers = this.answers.length;
    this.fillingPercentage = Math.round((filledAnswers / allAnswers) * 100);
  }
}
