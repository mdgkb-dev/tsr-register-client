import IFileSet from '@/interfaces/files/IFileSet';

export default interface IPostParams {
  payload: any;
  fileSets?: IFileSet[];
  query?: string;
  headers?: Headers;
  isFormData?: boolean;
}
