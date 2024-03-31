import axios, { AxiosPromise, ResponseType } from 'axios';

import HttpError from './classes/HttpError';
import { HttpMethods } from './types/HttpMethods';

const engine = axios.create();
engine.interceptors.response.use(
  (response) => response,
  async (error) => await HttpError.Handle(error, engine)
);

export default abstract class HttpEngine {
  static async Get(url: string, headers: unknown, responseType: ResponseType): Promise<AxiosPromise> {
    return await engine({ method: HttpMethods.GET, url: url, headers: headers, responseType: responseType });
  }
  static async Post(url: string, headers: unknown, responseType: ResponseType, data: unknown): Promise<AxiosPromise> {
    return await engine({ method: HttpMethods.POST, url: url, headers: headers, responseType: responseType, data: data });
  }
  static async Put(url: string, headers: unknown, data: unknown): Promise<AxiosPromise> {
    return await engine({ method: HttpMethods.PUT, url: url, headers: headers, data: data });
  }
}
