import IFileInfo from '@/interfaces/files/IFileInfo';

export default interface IPostParams {
  payload: any;
  query?: string;
  headers?: Headers;
  isFormData?: boolean;
  fileInfos?: IFileInfo[];
}
