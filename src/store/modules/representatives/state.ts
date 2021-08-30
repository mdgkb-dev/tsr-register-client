import IFilesList from '@/interfaces/files/IFIlesList';
import IRepresentative from '@/interfaces/representatives/IRepresentative';

export interface State {
  representatives: IRepresentative[];
  representative: IRepresentative;
  count: number;
  filteredRepresentatives: IRepresentative[];
  photoFileList: IFilesList[];
}
