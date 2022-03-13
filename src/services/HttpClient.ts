import IFileInfo from '@/interfaces/files/IFileInfo';
// import moment from 'moment';
import { IBodilessParams, IBodyfulParams, IHttpClient } from '@/interfaces/httpClient/IHTTPTypes';
import axiosInstance from '@/services/Axios';
// import IToUtcDateMethods from '@/interfaces/httpClient/IToUtcDateMethods';

export default class HttpClient implements IHttpClient {
  endpoint: string;
  headers: Record<string, string>;

  constructor(endpoint = '') {
    this.endpoint = endpoint;
    this.headers = { 'Content-Type': 'application/json' };
  }

  private static download(url: string, name: string) {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', name);
    link.setAttribute('target', '_blank');
    document.body.appendChild(link);
    link.click();
  }

  private static getDownloadFileName(clientFileName: string | undefined, serverFileName: string | undefined): string {
    if (clientFileName) {
      return clientFileName;
    }
    if (serverFileName) {
      return serverFileName;
    }
    return 'file.xlsx';
  }

  async get<ReturnType>(params?: IBodilessParams): Promise<ReturnType> {
    const isBlob = params?.isBlob;
    const headers = params?.headers;

    const res = await axiosInstance({
      url: this.buildUrl(params?.query),
      method: 'get',
      headers: { ...(headers ?? this.headers), token: localStorage.getItem('token') },
      responseType: !isBlob ? 'json' : 'blob',
    });
    if (!isBlob) {
      return res.data;
    }

    const headerLine = res.headers['content-disposition'];
    const startFileNameIndex = headerLine.indexOf('"') + 1;
    const endFileNameIndex = headerLine.lastIndexOf('"');
    const filename = headerLine.substring(startFileNameIndex, endFileNameIndex);

    const url = URL.createObjectURL(res.data);
    const fileName = HttpClient.getDownloadFileName(undefined, filename);
    HttpClient.download(url, fileName);
    return res.data;
  }

  async post<PayloadType, ReturnType>(params: IBodyfulParams<PayloadType>): Promise<ReturnType> {
    const { payload, fileInfos, query, headers, isFormData } = params;
    const { data } = await axiosInstance({
      url: this.buildUrl(query),
      method: 'post',
      headers: { ...(headers ?? this.headers), token: localStorage.getItem('token') },
      data: !isFormData ? payload : this.createFormDataPayload<PayloadType>(payload, fileInfos),
    });

    return data;
  }

  async put<PayloadType, ReturnType>(params: IBodyfulParams<PayloadType>): Promise<ReturnType> {
    const { payload, fileInfos, query, headers, isFormData } = params;

    const { data } = await axiosInstance({
      url: this.buildUrl(query),
      method: 'put',
      headers: { ...(headers ?? this.headers), token: localStorage.getItem('token') },
      data: !isFormData ? payload : this.createFormDataPayload<PayloadType>(payload, fileInfos),
    });

    return data;
  }

  async delete<PayloadType, ReturnType>(params: IBodyfulParams<PayloadType>): Promise<ReturnType> {
    const { payload, fileInfos, query, headers, isFormData } = params;

    const { data } = await axiosInstance({
      url: this.buildUrl(query),
      method: 'delete',
      headers: { ...(headers ?? this.headers), token: localStorage.getItem('token') },
      data: !isFormData ? payload : this.createFormDataPayload<PayloadType>(payload, fileInfos),
    });

    return data;
  }

  private buildUrl(query?: string): string {
    const baseUrl = process.env.VUE_APP_BASE_URL ?? '';
    const apiVersion = process.env.VUE_APP_API_V1 ?? '';

    if (query) {
      const queryString = query ?? '';

      return this.endpoint.length <= 0 ? baseUrl + apiVersion + queryString : baseUrl + apiVersion + this.endpoint + '/' + queryString;
    }

    return baseUrl + apiVersion + this.endpoint;
  }

  private createFormDataPayload<PayloadType>(payload?: PayloadType, fileInfos?: IFileInfo[]): FormData {
    const data = new FormData();
    data.append('form', JSON.stringify(payload));

    if (fileInfos) {
      for (const fileInfo of fileInfos) {
        if (fileInfo.file) {
          data.append(fileInfo.id ?? 'files', fileInfo.file, fileInfo.originalName);
        }
      }
    }

    return data;
  }

  // private toUtc<PayloadType>(payload: PayloadType): void {
  //   if (!payload || typeof payload !== 'object') {
  //     return;
  //   }

  //   for (const key in payload) {
  //     if (Object.prototype.hasOwnProperty.call(payload, key)) {
  //       this.convertToUtc<PayloadType[Extract<keyof PayloadType, string>]>(payload[key]);
  //     }
  //   }
  // }

  // private convertToUtc<PropertyType extends IToUtcDateMethods>(property: PropertyType): void {
  //   if (property && typeof property === 'object' && typeof property.getMonth !== 'function') {
  //     this.toUtc(property);
  //   }

  //   if (property && typeof property.getMonth === 'function') {
  //     property = moment(property).add(+moment().utcOffset(), 'm');
  //     property = property.parseZone().utc().format();
  //   }
  // }
}
