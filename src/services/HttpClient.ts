import moment from 'moment';

import IPostParams from '@/interfaces/fetchApi/IPostParams';

export default class HttpClient {
  endpoint: string;
  headers: Record<string, string>;

  constructor(endpoint = '/') {
    this.endpoint = endpoint;
    this.headers = { 'Content-Type': 'application/json' };
  }

  async get(query?: string): Promise<any> {
    const res = await fetch(this.baseUrl(query), {
      method: 'GET',
      headers: this.headers,
    });

    return res.json();
  }

  async post(params: IPostParams): Promise<any> {
    const {
      payload, fileSets, query, headers, isFormData,
    } = params;
    this.toUtc(payload);
    let body: string | FormData = JSON.stringify(payload);

    if (isFormData) {
      body = new FormData();
      body.append('form', JSON.stringify(payload));

      if (fileSets) {
        for (const fileSet of fileSets) {
          for (const file of fileSet.files) {
            body.append(fileSet.category, file);
          }
        }
      }
    }

    const res = await fetch(this.baseUrl(query), {
      method: 'POST',
      headers: headers ?? isFormData
        ? {}
        : this.headers,
      body,
    });

    return res.json();
  }

  async put(payload: any, query?: string): Promise<any> {
    this.toUtc(payload);
    const res = await fetch(this.baseUrl(query), {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify(payload),
    });
    return res.json();
  }

  async delete(query?: string): Promise<any> {
    const res = await fetch(this.baseUrl(query), {
      method: 'DELETE',
      headers: this.headers,
    });
    return res.json();
  }

  private baseUrl(query?: string): string {
    if (!query) {
      return process.env.VUE_APP_BASE_URL + this.endpoint;
    }

    return `${process.env.VUE_APP_BASE_URL + this.endpoint}/${query}`;
  }

  private toUtc(payload: Record<string, any>): Record<string, any> {
    const obj = payload;
    if (!obj) {
      return obj;
    }

    for (const item of Object.keys(obj)) {
      if (obj[item] && typeof obj[item].getMonth !== 'function' && typeof obj[item] === 'object') {
        this.toUtc(obj[item]);
      }

      if (obj[item] && typeof obj[item].getMonth === 'function') {
        obj[item] = moment(obj[item]).add(+moment().utcOffset(), 'm');
        obj[item] = obj[item]
          .parseZone()
          .utc()
          .format();
      }
    }

    return obj;
  }
}
