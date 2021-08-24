import IFileInfo from '@/interfaces/files/IFileInfo';

export interface IHttpClient {
  endpoint: string;
  headers: Record<string, string>;

  get: <ReturnType>(params?: IBodilessParams) => Promise<ReturnType>;
  post: <PayloadType, ReturnType>(params: IBodyfulParams<PayloadType>) => Promise<ReturnType>;
  put: <PayloadType, ReturnType>(params: IBodyfulParams<PayloadType>) => Promise<ReturnType>;
  delete: <PayloadType, ReturnType>(params: IBodyfulParams<PayloadType>) => Promise<ReturnType>;
}

export interface IBodilessParams {
  query?: string;
  headers?: Headers;
  isBlob?: boolean;
}

export interface IBodyfulParams<PayloadType> {
  payload?: PayloadType;
  query?: string;
  headers?: Headers;
  isFormData?: boolean;
  fileInfos?: IFileInfo[];
}
