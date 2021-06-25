import Human from '@/classes/humans/Human';
import RepresentativeToPatient from '@/classes/representatives/RepresentativeToPatient';
import IHuman from '@/interfaces/humans/IHuman';
import IRepresentative from '@/interfaces/representatives/IRepresentative';
import IRepresetnationType from '@/interfaces/representatives/IRepresentativeToPatient';

export default class Representative implements IRepresentative {
  id?: string;
  human: IHuman = new Human();
  representativeToPatient: IRepresetnationType[] = [];

  constructor(representative?: IRepresentative) {
    if (!representative) {
      return;
    }
    this.id = representative.id;
    this.human = new Human(representative.human);
    this.representativeToPatient = representative.representativeToPatient.map((r: RepresentativeToPatient) => new RepresentativeToPatient(r));
  }
}
