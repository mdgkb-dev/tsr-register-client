import ClassHelper from '@/services/ClassHelper';

export default class SubMenu {
  id?: string;
  name = '';
  link = '';
  selected = false;
  hide = false;
  editMode = false;
  color = '';
  background = '';

  order = 0;
  menuId?: string;

  iconName = '';
  svgCode = '';

  constructor(i?: SubMenu) {
    ClassHelper.BuildClass(this, i);
  }

  getLink(): string {
    return this.link;
  }

  isLink(): boolean {
    return this.link !== '';
  }
}
