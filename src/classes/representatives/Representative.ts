import IHuman from '@/interfaces/humans/IHuman';
import Human from '@/classes/humans/Human';
import IRepresentative from '@/interfaces/representatives/IRepresentative';
import IRepresetnationType from '@/interfaces/representatives/IRepresetnationType';

export default class Representative implements IRepresentative {
  id?: string;

  human: IHuman;

  representativeToPatient: IRepresetnationType[];

  constructor() {
    this.human = new Human();
    this.representativeToPatient = [];
  }
}
