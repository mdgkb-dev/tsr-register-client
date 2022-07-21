import IFileInfo from '@/interfaces/files/IFileInfo';
import IModelInfo from '@/interfaces/shared/IModelInfo';

import IHuman from '../IHuman';
import IRepresentativeToPatient from './IRepresentativeToPatient';

export default interface IRepresentative extends IModelInfo {
  id?: string;
  human: IHuman;
  representativeToPatient: IRepresentativeToPatient[];
  representativeToPatientForDelete: string[];

  getFileInfos: () => IFileInfo[];
  getChildrenAddresses: () => string[];
}
