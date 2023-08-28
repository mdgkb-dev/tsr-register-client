import ClassHelper from '@/services/ClassHelper';

export default class MkbItem {
  id = '';
  code = '';
  name = '';
  rangeStart?: string;
  rangeEnd?: string;
  comment?: string;
  relevant?: boolean;
  leaf = false;
  disabled = true;
  showCheckbox = false;
  @ClassHelper.GetClassConstructor(MkbItem)
  children: MkbItem[] = [];
  @ClassHelper.GetClassConstructor(MkbItem)
  parent?: MkbItem;
  parentId?: string;

  constructor(i?: MkbItem) {
    ClassHelper.BuildClass(this, i);
  }

  getFullName(): string {
    return `${this.getCode()} ${this.name}`;
  }

  getCode(): string {
    return this.code !== '' && this.code !== '-' ? this.code : '';
  }
}
