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
    const res = await fetch(this.baseUrl(params), {
      method: 'PUT',
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
    return process.env.VUE_APP_BASE_URL + this.api + `${params}`;
  }
}
