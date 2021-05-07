import moment from 'moment';

export default class HttpClient {
  api: string;
  headers: {};

  constructor(api: string = '/') {
    this.api = api;
    this.headers = { 'Content-Type': 'application/json' };
  }

  async get(params?: any): Promise<any> {
    const res = await fetch(this.baseUrl(params), {
      method: 'GET',
      headers: this.headers,
    });

    return await res.json();
  }

  async post(payload: any, params?: any): Promise<any> {
    this.toUtc(payload);
    const res = await fetch(this.baseUrl(params), {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(payload),
    });
    return await res.json();
  }

  async put(payload: any, params?: any): Promise<any> {
    const res = await fetch(this.baseUrl(params), {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify(payload),
    });
    return await res.json();
  }

  async delete(params?: any): Promise<any> {
    const res = await fetch(this.baseUrl(params), {
      method: 'DELETE',
      headers: this.headers,
    });
    return await res.json();
  }

  private baseUrl(params?: any): string {
    if (!params) {
      return process.env.VUE_APP_BASE_URL + this.api;
    }
    return process.env.VUE_APP_BASE_URL + this.api + '/' + `${params}`;
  }

  private toUtc(payload: object) {
    if (!payload) {
      return;
    }
    for (let item of Object.values(payload)) {
      if (item && typeof item.getMonth !== 'function' && typeof item === 'object') {
        console.log(item);
        this.toUtc(item);
      }
      if (item && typeof item.getMonth === 'function') {
        console.log('error1');
        item = moment(item).add(+moment().utcOffset(), 'm');
        item = moment
          .parseZone(item)
          .utc()
          .format();
      }
    }
  }
}
