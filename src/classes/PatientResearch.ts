import { v4 as uuidv4 } from 'uuid';

import Question from '@/classes/Question';
import RegisterPropertyToPatientToFile from '@/classes/RegisterPropertyToPatientToFile';
import Research from '@/classes/Research';
import ResearchResult from '@/classes/ResearchResult';
import ClassHelper from '@/services/ClassHelper';

export default class PatientResearch {
  id?: string;
  date = new Date();
  editMode = false;
  @ClassHelper.GetClassConstructor(Research)
  research?: Research;
  researchId?: string;
  order = 0;
  // @ClassHelper.GetClassConstructor(Patient)
  // patient?: Patient;
  patientId?: string;
  fillingPercentage = 0;
  @ClassHelper.GetClassConstructor(ResearchResult)
  researchResults: ResearchResult[] = [];
  // patientQuestionsForDelete: string[] = [];
  // @ClassHelper.GetClassConstructor(RegisterPropertyOtherToPatient)
  // registerPropertyOthersToPatient: RegisterPropertyOtherToPatient[] = [];
  // @ClassHelper.GetClassConstructor(RegisterPropertySetToPatient)
  // registerPropertySetToPatient: RegisterPropertySetToPatient[] = [];
  // registerPropertySetToPatientForDelete: string[] = [];

  constructor(i?: PatientResearch) {
    ClassHelper.BuildClass(this, i);
  }

  static Create(patientId: string | undefined, research: Research): PatientResearch {
    const item = new PatientResearch();
    item.id = uuidv4();
    item.patientId = patientId;
    item.research = research;
    item.researchId = research.id;
    return item;
  }

  //
  // findProperty(propertyId: string): Answer | undefined {
  //   return this.answers?.find((i: Answer) => i.registerPropertyId === propertyId);
  // }
  //
  // pushRegisterProperty(propertyId: string): void {
  //   const registerPropertyToPatient = new Answer();
  //   registerPropertyToPatient.registerPropertyId = propertyId;
  //   this.answers.push(registerPropertyToPatient);
  // }
  //
  // getOtherPropertyValue(property: Question): string | undefined {
  //   if (property.id) {
  //     const item = this.findProperty(property.id);
  //     return item?.valueOther;
  //   }
  //   return undefined;
  // }
  //
  // getRegisterPropertyToPatient(propertyId: string): Answer[] {
  //   return this.answers.filter((r: Answer) => r.registerPropertyId === propertyId);
  // }

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

  recalculate(newResult: ResearchResult): void {
    const findedResult = this.getResult(newResult.id as string);
    if (!findedResult) {
      return;
    }
    findedResult.fillingPercentage = newResult.fillingPercentage;
    const filled = this.researchResults.filter((r: ResearchResult) => r.fillingPercentage === 100).length;
    const all = this.researchResults.length;
    this.fillingPercentage = Math.round((filled / all) * 100);
  }
  getResult(resultId: string): ResearchResult | undefined {
    return this.researchResults.find((r: ResearchResult) => r.id === resultId);
  }
}
