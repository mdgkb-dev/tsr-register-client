import { v4 as uuidv4 } from 'uuid';

import Disability from '@/classes/Disability';
import Human from '@/classes/Human';
import MkbItem from '@/classes/MkbItem';
import PatientDiagnosis from '@/classes/PatientDiagnosis';
import PatientDiagnosisAnamnesis from '@/classes/PatientDiagnosisAnamnesis';
import PatientDrugRegimen from '@/classes/PatientDrugRegimen';
import PatientRegister from '@/classes/PatientRegister';
import PatientRepresentative from '@/classes/PatientRepresentative';
import PatientResearch from '@/classes/PatientResearch';
import PatientResearchesPool from '@/classes/PatientResearchesPool';
import Register from '@/classes/Register';
import Representative from '@/classes/Representative';
import Research from '@/classes/Research';
import ResearchResult from '@/classes/ResearchResult';
import User from '@/classes/User';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IWithMkbItem from '@/interfaces/IWithMkbItem';
import ClassHelper from '@/services/ClassHelper';

export default class Patient {
  id?: string;
  patientHistoryId?: string;
  human = new Human();
  regionId?: string;
  // history?: IHistory = new History();
  @ClassHelper.GetClassConstructor(PatientRepresentative)
  representativeToPatient: PatientRepresentative[] = [];
  representativeToPatientForDelete: string[] = [];
  @ClassHelper.GetClassConstructor(Disability)
  disabilities: Disability[] = [];
  disabilitiesForDelete: string[] = [];
  @ClassHelper.GetClassConstructor(PatientDiagnosis)
  patientDiagnosis: PatientDiagnosis[] = [];
  patientDiagnosisForDelete: string[] = [];

  @ClassHelper.GetClassConstructor(PatientRegister)
  registerToPatient: PatientRegister[] = [];
  registerToPatientForDelete: string[] = [];
  @ClassHelper.GetClassConstructor(PatientResearch)
  patientsResearches: PatientResearch[] = [];
  registerGroupsToPatientForDelete: string[] = [];

  @ClassHelper.GetClassConstructor(PatientResearchesPool)
  patientsResearchesPools: PatientResearchesPool[] = [];
  patientsResearchesPoolsForDelete: string[] = [];

  @ClassHelper.GetClassConstructor(PatientDrugRegimen)
  patientDrugRegimen: PatientDrugRegimen[] = [];
  patientDrugRegimenForDelete: string[] = [];

  createdAt?: Date;
  updatedAt?: Date;
  createdById?: string;
  updatedById?: string;
  createdBy?: User;
  updatedBy?: User;

  fullName?: string;
  dateBirth?: string;

  constructor(i?: Patient) {
    ClassHelper.BuildClass(this, i);
  }

  getActuallyDisability(): Disability {
    return this.disabilities[this.disabilities.length - 1];
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

  getFileInfos(): IFileInfo[] {
    return [
      ...Human.GetFileInfos(this.human),
      ...Disability.GetFileInfos(this.disabilities),
      // ...PatientResearchSection.GetFileInfos(this.registerGroupsToPatient),
    ];
  }

  getAnamnesis(id: string): PatientDiagnosisAnamnesis {
    for (const diagnosis of this.patientDiagnosis) {
      const anamnesis = diagnosis.patientDiagnosisAnamnesis.find((i: PatientDiagnosisAnamnesis) => i.id === id);
      if (anamnesis) {
        return anamnesis;
      }
    }
    return new PatientDiagnosisAnamnesis();
  }

  getParentsAddresses(): string[] {
    const addresses: string[] = [];
    this.representativeToPatient.forEach((rtp: PatientRepresentative) => {
      if (rtp.representative?.human.addressResidential != '' && rtp.representative?.human.addressResidential) {
        addresses.push(rtp.representative?.human.addressResidential);
      }
      if (
        rtp.representative?.human.addressResidential !== rtp.representative?.human.addressRegistration &&
        rtp.representative?.human.addressRegistration
      ) {
        addresses.push(rtp.representative?.human.addressRegistration);
      }
    });
    return [...new Set(Array.from(new Set(addresses)))];
  }

  addRegisterGroupToPatient(registerGroupId: string): void {
    const registerGroupToPatient = new ResearchResult();
    registerGroupToPatient.id = uuidv4();
    // registerGroupToPatient.researchId = registerGroupId;
    // this.registerGroupsToPatient.push(registerGroupToPatient);
  }
  //
  // removeRegisterGroupToPatient(paneName: string): void {
  //   const i = this.registerGroupsToPatient.findIndex((r: PatientResearchSection) => r.id === paneName);
  //   if (i > -1) {
  //     ClassHelper.RemoveFromClassByIndex(i, this.registerGroupsToPatient, this.registerGroupsToPatientForDelete);
  //   }
  // }
  //
  // getRegisterGroupsToPatientByGroupId(groupId: string): PatientResearchSection[] {
  //   return this.registerGroupsToPatient.filter((r: PatientResearchSection) => r.researchSectionId === groupId);
  // }
  //
  // initRegisterGroupsToPatient(registerGroupId: string): void {
  //   const groupExists = this.registerGroupsToPatient.find((r: PatientResearchSection) => r.researchSectionId === registerGroupId);
  //   if (groupExists) {
  //     return;
  //   }
  //   const newGroup = new PatientResearchSection();
  //   newGroup.researchSectionId = registerGroupId;
  //   this.registerGroupsToPatient.push(newGroup);
  // }

  addMkbItem(mkbItem: MkbItem): void {
    const patientDiagnosis = new PatientDiagnosis();
    patientDiagnosis.mkbItem = new MkbItem(mkbItem);
    patientDiagnosis.mkbItemId = mkbItem.id;
    patientDiagnosis.patientId = this.id;
    this.patientDiagnosis.push(patientDiagnosis);
  }

  removeMkbItem(index: number): void {
    ClassHelper.RemoveFromClassByIndex(index, this.patientDiagnosis, this.patientDiagnosisForDelete);
  }

  getMkbItems(): IWithMkbItem[] {
    return this.patientDiagnosis;
  }

  addRepresentative(representative: Representative): void {
    const item = new PatientRepresentative();
    item.representative = new Representative(representative);
    item.representativeId = representative.id;
    this.representativeToPatient.push(item);
  }

  representativeExists(representativeId: string): boolean {
    return this.representativeToPatient.some((rtp: PatientRepresentative) => rtp.representativeId === representativeId);
  }

  addRegisterToPatient(register: Register): void {
    const item = new PatientRegister();
    item.register = new Register(register);
    item.registerId = register.id;
    this.registerToPatient.push(item);
  }

  patientInRegister(registerId: string | undefined): boolean {
    return this.registerToPatient.some((i: PatientRegister) => registerId === i.registerId);
  }

  createPatientResearch(research: Research): void {
    const item = new PatientResearch();
    item.order = research.order;
    item.research = research;
    item.researchId = research.id;

    // research.questions.forEach((q: Question) => {
    //   const answer = new Answer();
    //   answer.order = q.order;
    //   item.answers.push(answer);
    // });

    this.patientsResearches.push(item);
  }

  createPatientResearches(researches: Research[]): void {
    researches.forEach((r: Research) => this.createPatientResearch(r));
  }

  getPatientResearch(researchId: string | undefined): PatientResearch | undefined {
    return this.patientsResearches.find((p: PatientResearch) => p.researchId === researchId);
  }

  hasResearchesPool(poolId: string): boolean {
    return this.patientsResearchesPools.some((p: PatientResearchesPool) => p.researchesPoolId === poolId);
  }

  getResearchFillingPercentage(researchId: string): number {
    const patientResearch = this.getPatientResearch(researchId);
    return patientResearch ? patientResearch.fillingPercentage : 0;
  }

  addDisability(): Disability {
    const item = new Disability();
    item.id = uuidv4();
    item.patientId = this.id;
    this.disabilities.push(item);
    return item;
  }

  removeDisability(id: string) {
    ClassHelper.RemoveFromClassById(id, this.disabilities, this.disabilitiesForDelete);
  }
}
