import { LocationQuery } from 'vue-router';

import { Orders } from '@/services/interfaces/Orders';

import { ClassNameGetter } from '../interfaces/Class';

export default class SortModel {
  model = '';
  table = '';
  col = '';
  order: Orders | undefined;
  label = '';
  default = false;
  selected = false;

  static CreateSortModel(
    model: string | ClassNameGetter,
    col: unknown,
    order: Orders = Orders.Asc,
    label?: string,
    defaultModel?: boolean
  ): SortModel {
    console.log(1);
    const m = new SortModel();
    m.model = typeof model === 'string' ? model : model.GetClassName();
    m.col = (col as string) ?? '';
    m.order = order ?? Orders.Asc;
    m.label = label ?? '';
    m.default = defaultModel ?? false;
    return m;
  }

  isAsc(): boolean {
    return this.order === Orders.Asc;
  }

  isDesc(): boolean {
    return this.order === Orders.Desc;
  }

  toUrlQuery(): string {
    const model = this.model ? `"model":"${this.model}"` : '';
    const col = this.col ? `"col":"${this.col}"` : '';
    const order = this.order ? `"order":"${this.order}"` : '';

    return [model, col, order].toString();
  }
  async fromUrlQuery(obj: LocationQuery): Promise<void> {
    const str = window.location.search;
    const sormModelString = str.substring(str.indexOf('s=') + 2, str.indexOf('|'));
    const params = new URLSearchParams(decodeURIComponent(sormModelString));
    this.model = params.get('model') ?? '';
    this.col = params.get('col') ?? '';
    this.label = params.get('label') ?? '';
    this.default = Boolean(params.get('default'));
    // this.id = params.get('id') ?? '';
    this.order = (params.get('order') as Orders) ?? ('' as Orders);
  }
}
