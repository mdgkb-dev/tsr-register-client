import IRepresentative from '@/interfaces/representatives/IRepresentative';
import IFilesList from '@/interfaces/files/IFIlesList';

export interface State {
  representatives: IRepresentative[];
  representative: IRepresentative;
  count: number;
  filteredRepresentatives: IRepresentative[];
  photoFileList: IFilesList[];
}
