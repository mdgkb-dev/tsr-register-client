import Human from '@/classes/Human';
import Patient from '@/classes/Patient';
import PatientRepresentative from '@/classes/PatientRepresentative';
import User from '@/classes/User';
import IFileInfo from '@/interfaces/files/IFileInfo';
import ClassHelper from '@/services/ClassHelper';

export default class Representative {
  id?: string;
  human: Human = new Human();
  @ClassHelper.GetClassConstructor(PatientRepresentative)
  representativeToPatient: PatientRepresentative[] = [];
  representativeToPatientForDelete: string[] = [];

  createdAt?: Date;
  updatedAt?: Date;
  createdById?: string;
  updatedById?: string;
  createdBy?: User;
  updatedBy?: User;

  fullName?: string;
  dateBirth?: string;

  constructor(i?: Representative) {
    ClassHelper.BuildClass(this, i);
  }

  getFileInfos(): IFileInfo[] {
    return [...Human.GetFileInfos(this.human)];
  }

  getChildrenAddresses(): string[] {
    const addresses: string[] = [];
    this.representativeToPatient.forEach((rtp: PatientRepresentative) => {
      if (rtp.patient?.human.addressResidential != '' && rtp.patient?.human.addressResidential) {
        addresses.push(rtp.patient?.human.addressResidential);
      }
      if (rtp.patient?.human.addressResidential !== rtp.patient?.human.addressRegistration && rtp.patient?.human.addressRegistration) {
        addresses.push(rtp.patient?.human.addressRegistration);
      }
    });
    return [...new Set(Array.from(new Set(addresses)))];
  }

  addPatient(patient: Patient): void {
    const item = new PatientRepresentative();
    item.patient = new Patient(patient);
    item.patientId = patient.id;
    this.representativeToPatient.push(item);
  }

  patientExists(patientId: string): boolean {
    return this.representativeToPatient.some((rtp: PatientRepresentative) => rtp.patientId === patientId);
  }

  getHuman(): Human {
    return this.human;
  }
}
