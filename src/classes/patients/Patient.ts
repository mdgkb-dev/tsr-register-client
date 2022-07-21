import { v4 as uuidv4 } from 'uuid';

import Circumference from '@/classes/anthropometry/Circumference';
import HeightWeight from '@/classes/anthropometry/HeightWeight';
import Disability from '@/classes/disability/Disability';
import History from '@/classes/history/History';
import Human from '@/classes/humans/Human';
import PatientDiagnosis from '@/classes/patients/PatientDiagnosis';
import PatientDiagnosisAnamnesis from '@/classes/patients/PatientDiagnosisAnamnesis';
import PatientDrugRegimen from '@/classes/patients/PatientDrugRegimen';
import RegisterGroupToPatient from '@/classes/RegisterGroupToPatient';
import RegisterToPatient from '@/classes/registers/RegisterToPatient';
import RepresentativeToPatient from '@/classes/representatives/RepresentativeToPatient';
import User from '@/classes/User';
import ICircumference from '@/interfaces/anthropometry/ICircumference';
import IHeightWeight from '@/interfaces/anthropometry/IHeightWeight';
import IDisability from '@/interfaces/disabilities/IDisability';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IHistory from '@/interfaces/history/IHistory';
import IHuman from '@/interfaces/IHuman';
import IUser from '@/interfaces/IUser';
import IPatient from '@/interfaces/patients/IPatient';
import IPatientConstructor from '@/interfaces/patients/IPatientConstructor';
import IPatientDiagnosis from '@/interfaces/patients/IPatientDiagnosis';
import IPatientDiagnosisAnamnesis from '@/interfaces/patients/IPatientDiagnosisAnamnesis';
import IPatientDrugRegimen from '@/interfaces/patients/IPatientDrugRegimen';
import IRegisterGroupToPatient from '@/interfaces/registers/IRegisterGroupToPatient';
import IRegisterToPatient from '@/interfaces/registers/IRegisterToPatient';
import IRepresentativeToPatient from '@/interfaces/representatives/IRepresentativeToPatient';
import RemoveFromClass from '@/services/RemoveFromClass';

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
  registerGroupsToPatient: IRegisterGroupToPatient[] = [];
  registerGroupsToPatientForDelete: string[] = [];

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
    if (i.registerGroupsToPatient) {
      this.registerGroupsToPatient = i.registerGroupsToPatient.map((i: IRegisterGroupToPatient) => new RegisterGroupToPatient(i));
    }
    if (i.disabilities) {
      this.disabilities = i.disabilities.map((disability: IDisability) => new Disability(disability));
    }
    if (i.registerToPatient) {
      this.registerToPatient = i.registerToPatient.map((i: IRegisterToPatient) => new RegisterToPatient(i));
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
}
