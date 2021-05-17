import IPatient from '@/interfaces/patients/IPatient';
import IHuman from '@/interfaces/humans/IHuman';
import IAnthropometryData from '@/interfaces/anthropometry/IAnthropometryData';
import IMkbToPatient from '@/interfaces/mkb/IMkbToPatient';
import Human from '@/classes/humans/Human';
import MkbToPatient from '@/classes/mkb/MkbToPatient';
import AnthropometryData from '@/classes/anthropometry/AnthropometryData';
import IDisability from '@/interfaces/disabilities/IDisability';
import RepresentativeToPatient from '@/classes/representatives/RepresentativeToPatient';
import IRepresentativeToPatient from '@/interfaces/representatives/IRepresentativeToPatient';
import Disability from '@/classes/disability/Disability';

export default class Patient implements IPatient {
  id?: string;
  human: IHuman = new Human();
  anthropometryData: IAnthropometryData[] = [];
  mkbToPatient: IMkbToPatient[] = [];
  representativeToPatient: IRepresentativeToPatient[] = [];
  disabilities: IDisability[] = [];

  constructor(patient?: IPatient) {
    if (!patient) {
      return;
    }
    this.id = patient.id;
    this.human = new Human(patient.human);
    this.anthropometryData = patient.anthropometryData.map((a: IAnthropometryData) => new AnthropometryData(a));
    if (patient.mkbToPatient) {
      this.mkbToPatient = patient.mkbToPatient.map((mkbToPatient: IMkbToPatient) => new MkbToPatient(mkbToPatient));
    }
    if (patient.representativeToPatient) {
      this.representativeToPatient = patient.representativeToPatient.map(
        (representativeToPatient: IRepresentativeToPatient) => new RepresentativeToPatient(representativeToPatient),
      );
    }
    if (patient.disabilities) {
      this.disabilities = patient.disabilities.map((disability: IDisability) => new Disability(disability));
    }
  }

  getAnthropometryDataFull(): string {
    let total = '';
    this.anthropometryData.forEach((data: IAnthropometryData) => {
      total = `${total} ${data.getFullInfo()} \n`;
    });
    return total;
  }

  getActuallyDisability(): IDisability {
    return this.disabilities[this.disabilities.length - 1];
  }
}
