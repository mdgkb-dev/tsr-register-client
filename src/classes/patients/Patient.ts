import IPatient from '@/interfaces/patients/IPatient';
import IHuman from '@/interfaces/humans/IHuman';
import IAnthropometryData from '@/interfaces/anthropometry/IAnthropometryData';
import IMkbToPatient from '@/interfaces/mkb/IMkbToPatient';
import IRepresentationType from '@/interfaces/representatives/IRepresetnationType';
import Human from '@/classes/humans/Human';

export default class Patient implements IPatient {
  id?: string;
  human: IHuman;
  anthropometryData: IAnthropometryData[];
  mkbToPatient: IMkbToPatient[];
  representativeToPatient: IRepresentationType[];

  constructor() {
    this.id = '';
    this.human = new Human();
    this.anthropometryData = [];
    this.mkbToPatient = [];
    this.representativeToPatient = [];
  }
}
