import { v4 as uuidv4 } from 'uuid';

import Anamnesis from '@/classes/Anamnesis';
import Commission from '@/classes/Commission';
import CommissionTemplate from '@/classes/CommissionTemplate';
import Disability from '@/classes/Disability';
import Human from '@/classes/Human';
import MkbItem from '@/classes/MkbItem';
import PatientDiagnosis from '@/classes/PatientDiagnosis';
import PatientDrugRegimen from '@/classes/PatientDrugRegimen';
import PatientHistory from '@/classes/PatientHistory';
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
import ClassHelper from '@/services/ClassHelper';
import DateTimeFormat from '@/services/DateFormat';

export default class Patient {
  id?: string;
  patientHistoryId?: string;
  human = new Human();
  humanId?: string;
  regionId?: string;
  // history?: IHistory = new History();
  @ClassHelper.GetClassConstructor(PatientRepresentative)
  patientsRepresentatives: PatientRepresentative[] = [];
  representativeToPatientForDelete: string[] = [];
  @ClassHelper.GetClassConstructor(Disability)
  disabilities: Disability[] = [];
  disabilitiesForDelete: string[] = [];
  @ClassHelper.GetClassConstructor(PatientDiagnosis)
  patientDiagnosis: PatientDiagnosis[] = [];
  patientDiagnosisForDelete: string[] = [];

  // @ClassHelper.GetClassConstructor(PatientDiagnosis)
  // patientDiagnosis: PatiDo[] = [];
  // patientDiagnosisForDelete: string[] = [];

  @ClassHelper.GetClassConstructor(PatientRegister)
  patientsRegisters: PatientRegister[] = [];
  // registerToPatientForDelete: string[] = [];
  @ClassHelper.GetClassConstructor(PatientResearch)
  patientsResearches: PatientResearch[] = [];
  registerGroupsToPatientForDelete: string[] = [];

  @ClassHelper.GetClassConstructor(PatientResearchesPool)
  patientsResearchesPools: PatientResearchesPool[] = [];
  patientsResearchesPoolsForDelete: string[] = [];

  @ClassHelper.GetClassConstructor(PatientDrugRegimen)
  patientDrugRegimen: PatientDrugRegimen[] = [];
  patientDrugRegimenForDelete: string[] = [];

  @ClassHelper.GetClassConstructor(PatientHistory)
  patientHistories: PatientHistory[] = [];

  // @ClassHelper.GetClassConstructor(Commission)
  commissions: Commission[] = [];

  @ClassHelper.GetClassConstructor(Date)
  createdAt?: Date;
  @ClassHelper.GetClassConstructor(Date)
  updatedAt?: Date;
  createdById?: string;
  updatedById?: string;
  @ClassHelper.GetClassConstructor(User)
  createdBy?: User;
  @ClassHelper.GetClassConstructor(User)
  updatedBy?: User;

  fullName?: string;
  dateBirth?: string;

  constructor(i?: Patient) {
    ClassHelper.BuildClass(this, i);
    if (!i) {
      return;
    }
    this.commissions = i.commissions ? i.commissions.map((i: Commission) => new Commission(i)) : [];
  }

  static Create(user: User): Patient {
    const item = new Patient();
    item.id = uuidv4();
    item.human.id = uuidv4();
    item.humanId = item.human.id;

    item.createdBy = user;
    item.createdById = user.id;

    item.createdAt = new Date();
    item.updatedAt = new Date();

    return item;
  }

  getActuallyDisability(): Disability | undefined {
    return this.disabilities[this.disabilities.length - 1];
  }

  getFileInfos(): IFileInfo[] {
    return [
      ...Human.GetFileInfos(this.human),
      ...Disability.GetFileInfos(this.disabilities),
      // ...PatientResearchSection.GetFileInfos(this.registerGroupsToPatient),
    ];
  }

  getAnamnesis(id: string): Anamnesis {
    for (const diagnosis of this.patientDiagnosis) {
      const anamnesis = diagnosis.anamneses.find((i: Anamnesis) => i.id === id);
      if (anamnesis) {
        return anamnesis;
      }
    }
    return new Anamnesis();
  }

  getParentsAddresses(): string[] {
    const addresses: string[] = [];
    this.patientsRepresentatives.forEach((rtp: PatientRepresentative) => {
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

  addRegisterGroupToPatient(): void {
    const registerGroupToPatient = new ResearchResult();
    registerGroupToPatient.id = uuidv4();
    // registerGroupToPatient.researchId = registerGroupId;
    // this.registerGroupsToPatient.push(registerGroupToPatient);
  }

  addMkbItem(mkbItem: MkbItem): void {
    const patientDiagnosis = new PatientDiagnosis();
    patientDiagnosis.id = uuidv4();
    patientDiagnosis.mkbItem = new MkbItem(mkbItem);
    patientDiagnosis.mkbItemId = mkbItem.id;
    patientDiagnosis.patientId = this.id;
    this.patientDiagnosis.push(patientDiagnosis);
  }

  removeMkbItem(index: number): void {
    ClassHelper.RemoveFromClassByIndex(index, this.patientDiagnosis, this.patientDiagnosisForDelete);
  }

  getMkbItems(): PatientDiagnosis[] {
    return this.patientDiagnosis;
  }

  addRepresentative(representative: Representative): PatientRepresentative {
    const item = PatientRepresentative.Create(representative, this);
    this.patientsRepresentatives.push(item);
    return item;
  }

  representativeExists(representativeId: string): boolean {
    return this.patientsRepresentatives.some((rtp: PatientRepresentative) => rtp.representativeId === representativeId);
  }

  addRegister(register: Register, user: User): PatientRegister {
    const item = PatientRegister.Create(this.id as string, register);
    item.userId = user.id;
    this.patientsRegisters.push(item);
    return item;
  }

  inRegister(registerId: string | undefined): boolean {
    return this.patientsRegisters.some((i: PatientRegister) => registerId === i.registerId);
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

  hasRegister(id: string): boolean {
    return this.patientsRegisters.some((p: PatientRegister) => p.registerId === id);
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

  removeDisability(id: string): void {
    ClassHelper.RemoveFromClassById(id, this.disabilities, this.disabilitiesForDelete);
  }

  getHuman(): Human {
    return this.human;
  }

  addCommission(template: CommissionTemplate): Commission {
    const item = Commission.CreateFromTemplate(template);
    item.patientId = this.id;
    this.commissions.push(item);
    return item;
  }

  getLastMeta(): string {
    const f = new DateTimeFormat();
    const createdBy = this.createdBy?.login ?? 'Неизвестный создатель';
    return `${f.format(this.createdAt)} (${createdBy})`;
  }
}
