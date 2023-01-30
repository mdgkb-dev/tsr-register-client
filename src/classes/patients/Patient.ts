import { v4 as uuidv4 } from 'uuid';

import Circumference from '@/classes/anthropometry/Circumference';
import HeightWeight from '@/classes/anthropometry/HeightWeight';
import ChopScaleTest from '@/classes/ChopScaleTest';
import Disability from '@/classes/disability/Disability';
import History from '@/classes/history/History';
import HmfseScaleTest from '@/classes/HmfseScaleTest';
import Human from '@/classes/humans/Human';
import PatientDiagnosis from '@/classes/patients/PatientDiagnosis';
import PatientDiagnosisAnamnesis from '@/classes/patients/PatientDiagnosisAnamnesis';
import PatientDrugRegimen from '@/classes/patients/PatientDrugRegimen';
import RegisterGroupToPatient from '@/classes/RegisterGroupToPatient';
import RegisterToPatient from '@/classes/RegisterToPatient';
import RepresentativeToPatient from '@/classes/representatives/RepresentativeToPatient';
import ICircumference from '@/interfaces/anthropometry/ICircumference';
import IHeightWeight from '@/interfaces/anthropometry/IHeightWeight';
import IDisability from '@/interfaces/disabilities/IDisability';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IHistory from '@/interfaces/history/IHistory';
import IHuman from '@/interfaces/IHuman';
import IRegisterGroupToPatient from '@/interfaces/IRegisterGroupToPatient';
import IRegisterToPatient from '@/interfaces/IRegisterToPatient';
import IPatientConstructor from '@/interfaces/patients/IPatientConstructor';
import IPatientDiagnosisAnamnesis from '@/interfaces/patients/IPatientDiagnosisAnamnesis';
import IPatientDrugRegimen from '@/interfaces/patients/IPatientDrugRegimen';
import IRepresentativeToPatient from '@/interfaces/representatives/IRepresentativeToPatient';
import ClassBuilder from '@/services/ClassBuilder';
import RemoveFromClass from '@/services/RemoveFromClass';

export default class Patient {
  id?: string;
  patientHistoryId?: string;
  human: IHuman = new Human();
  regionId?: string;
  history?: IHistory = new History();
  @ClassBuilder.GetClassConstructorForArray(RepresentativeToPatient)
  representativeToPatient: IRepresentativeToPatient[] = [];
  representativeToPatientForDelete: string[] = [];
  @ClassBuilder.GetClassConstructorForArray(Disability)
  disabilities: IDisability[] = [];
  disabilitiesForDelete: string[] = [];
  @ClassBuilder.GetClassConstructorForArray(PatientDiagnosis)
  patientDiagnosis: PatientDiagnosis[] = [];
  patientDiagnosisForDelete: string[] = [];
  @ClassBuilder.GetClassConstructorForArray(HeightWeight)
  heightWeight: IHeightWeight[] = [];
  heightWeightForDelete: string[] = [];
  @ClassBuilder.GetClassConstructorForArray(Circumference)
  chestCircumference: ICircumference[] = [];
  chestCircumferenceForDelete: string[] = [];
  @ClassBuilder.GetClassConstructorForArray(Circumference)
  headCircumference: ICircumference[] = [];
  headCircumferenceForDelete: string[] = [];
  @ClassBuilder.GetClassConstructorForArray(RegisterToPatient)
  registerToPatient: IRegisterToPatient[] = [];
  registerToPatientForDelete: string[] = [];
  @ClassBuilder.GetClassConstructorForArray(RegisterGroupToPatient)
  registerGroupsToPatient: IRegisterGroupToPatient[] = [];
  registerGroupsToPatientForDelete: string[] = [];
  @ClassBuilder.GetClassConstructorForArray(PatientDrugRegimen)
  patientDrugRegimen: IPatientDrugRegimen[] = [];
  patientDrugRegimenForDelete: string[] = [];
  @ClassBuilder.GetClassConstructorForArray(ChopScaleTest)
  chopScaleTests: ChopScaleTest[] = [];
  chopScaleTestsForDelete: string[] = [];

  @ClassBuilder.GetClassConstructorForArray(HmfseScaleTest)
  hmfseScaleTests: HmfseScaleTest[] = [];
  hmfseScaleTestsForDelete: string[] = [];

  createdAt?: Date;
  updatedAt?: Date;
  createdById?: string;
  updatedById?: string;

  constructor(i?: IPatientConstructor) {
    ClassBuilder.BuildPrimitives(this, i);
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

  getFileInfos(): IFileInfo[] {
    return [
      ...Human.GetFileInfos(this.human),
      ...Disability.GetFileInfos(this.disabilities),
      ...RegisterGroupToPatient.GetFileInfos(this.registerGroupsToPatient),
    ];
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

  getParentsAddresses(): string[] {
    const addresses: string[] = [];
    this.representativeToPatient.forEach((rtp: IRepresentativeToPatient) => {
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
    const registerGroupToPatient = new RegisterGroupToPatient();
    registerGroupToPatient.id = uuidv4();
    registerGroupToPatient.registerGroupId = registerGroupId;
    this.registerGroupsToPatient.push(registerGroupToPatient);
  }

  removeRegisterGroupToPatient(paneName: string): void {
    const i = this.registerGroupsToPatient.findIndex((r: IRegisterGroupToPatient) => r.id === paneName);
    if (i > -1) {
      RemoveFromClass(i, this.registerGroupsToPatient, this.registerGroupsToPatientForDelete);
    }
  }

  getRegisterGroupsToPatientByGroupId(groupId: string): IRegisterGroupToPatient[] {
    return this.registerGroupsToPatient.filter((r: IRegisterGroupToPatient) => r.registerGroupId === groupId);
  }

  initRegisterGroupsToPatient(registerGroupId: string): void {
    const groupExists = this.registerGroupsToPatient.find((r: IRegisterGroupToPatient) => r.registerGroupId === registerGroupId);
    if (groupExists) {
      return;
    }
    const newGroup = new RegisterGroupToPatient();
    newGroup.registerGroupId = registerGroupId;
    this.registerGroupsToPatient.push(newGroup);
  }

  addChopScaleTest(): void {
    this.chopScaleTests.push(new ChopScaleTest());
  }

  addHmfseScaleTest(): void {
    this.hmfseScaleTests.push(new HmfseScaleTest());
  }
}
