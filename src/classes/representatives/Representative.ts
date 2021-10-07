import Human from '@/classes/humans/Human';
import RepresentativeToPatient from '@/classes/representatives/RepresentativeToPatient';
import User from '@/classes/user/User';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IHuman from '@/interfaces/humans/IHuman';
import IRepresentative from '@/interfaces/representatives/IRepresentative';
import IRepresetnationType from '@/interfaces/representatives/IRepresentativeToPatient';
import IUser from '@/interfaces/users/IUser';

export default class Representative implements IRepresentative {
  id?: string;
  human: IHuman = new Human();
  representativeToPatient: IRepresetnationType[] = [];
  representativeToPatientForDelete: string[] = [];

  createdAt?: Date;
  updatedAt?: Date;
  createdById?: string;
  updatedById?: string;
  createdBy?: IUser;
  updatedBy?: IUser;

  constructor(representative?: IRepresentative) {
    if (!representative) {
      return;
    }
    this.id = representative.id;
    this.human = new Human(representative.human);
    if (representative.representativeToPatient) {
      this.representativeToPatient = representative.representativeToPatient.map(
        (r: RepresentativeToPatient) => new RepresentativeToPatient(r)
      );
    }
    this.createdAt = representative.createdAt;
    this.updatedAt = representative.updatedAt;
    this.createdById = representative.createdById;
    this.updatedById = representative.updatedById;
    if (representative.createdBy) this.createdBy = new User(representative.createdBy);
    if (representative.updatedBy) this.updatedBy = new User(representative.updatedBy);
  }

  getFileInfos(): IFileInfo[] {
    return [...Human.GetFileInfos(this.human)];
  }
}
