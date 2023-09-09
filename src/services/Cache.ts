import ClassHelper from '@/services/ClassHelper';

export default class Cache {
  name = '';

  constructor(i?: Cache) {
    ClassHelper.BuildClass(this, i);
  }

  public cache<DataType>(data: DataType): void {
    sessionStorage.setItem(this.name, JSON.stringify(data));
  }

  getFromCache<DataType>(): DataType | null {
    const res = sessionStorage.getItem(this.name);
    if (res) {
      return JSON.parse(res);
    } else {
      return null;
    }
  }

  async storeGetWithCache<DataType>(get: () => Promise<DataType | void>): Promise<DataType | void | null> {
    let res;
    res = this.getFromCache<DataType>();
    if (!res) {
      res = await get();
      if (res) {
        this.cache<DataType>(res);
      }
    }
    return res;
  }
}
