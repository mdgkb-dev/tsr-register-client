import { ClassNameGetter } from '@/services/interfaces/Class';
import { Orders } from '@/services/interfaces/Orders';

export default class SortModel {
  model = '';
  table = '';
  col = '';
  order: Orders | undefined;
  label = '';
  default = false;
  version = '';
  selected = false;

  static CreateSortModel(table: string, col: string, order?: Orders, label?: string, defaultModel?: boolean): SortModel {
    const model = new SortModel();
    model.table = table;
    model.col = col;
    model.order = order ?? Orders.Asc;
    model.label = label ?? '';
    model.default = defaultModel ?? false;
    return model;
  }

  static CreateSortModelV2(model: string | ClassNameGetter, col: string | undefined, order?: Orders, label?: string, defaultModel?: boolean): SortModel {
    const m = new SortModel();
    m.model = typeof model === 'string' ? model : model.GetClassName();
    m.col = col ?? '';
    m.order = order ?? Orders.Asc;
    m.label = label ?? '';
    m.default = defaultModel ?? false;
    m.version = 'v2';
    return m;
  }

  isAsc(): boolean {
    return this.order === Orders.Asc;
  }

  isDesc(): boolean {
    return this.order === Orders.Desc;
  }

  toUrlQuery(): string {
    let url = '';
    Object.keys(this).forEach((el, i) => {
      const value = this[el as keyof typeof this];
      const isObj = typeof this[el as keyof typeof this] == 'object';
      if (value && url !== '?' && !isObj) {
        if (i !== 0) {
          url += '&';
        }
        url += `${el}=${value}`;
      }
    });
    url += '|';
    return url;
  }

  async fromUrlQuery(): Promise<void> {
    const str = window.location.search;
    const sormModelString = str.substring(str.indexOf('s=') + 2, str.indexOf('|'));
    const params = new URLSearchParams(decodeURIComponent(sormModelString));
    this.model = params.get('model') ?? '';
    this.col = params.get('col') ?? '';
    this.label = params.get('label') ?? '';
    this.version = params.get('version') ?? '';
    this.default = Boolean(params.get('default'));
    // this.id = params.get('id') ?? '';
    this.order = (params.get('order') as Orders) ?? ('' as Orders);
  }
}
