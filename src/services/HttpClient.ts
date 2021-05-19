import moment from 'moment';

export default class HttpClient {
  api: string;

  headers: Record<string, string>;

  constructor(api = '/') {
    this.api = api;
    this.headers = { 'Content-Type': 'application/json' };
  }

  async get(params?: any): Promise<any> {
    const res = await fetch(this.baseUrl(params), {
      method: 'GET',
      headers: this.headers,
    });

    return res.json();
  }

  async post(payload: any, params?: any): Promise<any> {
    const res = await fetch(this.baseUrl(params), {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(this.toUtc(payload)),
    });
    return res.json();
  }

  async put(payload: any, params?: any): Promise<any> {
    this.toUtc(payload);
    const res = await fetch(this.baseUrl(params), {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify(payload),
    });
    return res.json();
  }

  async delete(params?: any): Promise<any> {
    const res = await fetch(this.baseUrl(params), {
      method: 'DELETE',
      headers: this.headers,
    });
    return res.json();
  }

  private baseUrl(params?: any): string {
    if (!params) {
      return process.env.VUE_APP_BASE_URL + this.api;
    }
    return `${process.env.VUE_APP_BASE_URL + this.api}/${params}`;
  }

  private toUtc(payload: Record<string, any>): Record<string, any> {
    const obj = payload;
    if (!obj) return obj;
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
