import IFileInfo from '@/interfaces/files/IFileInfo';
import SubMenu from '@/services/classes/SubMenu';
import ClassHelper from '@/services/ClassHelper';
export default class Menu {
  id?: string;
  name = '';
  link = '';
  top = true;
  side = true;
  show = false;
  hide = false;
  active = false;
  order = 0;
  selected = false;
  editMode = false;

  @ClassHelper.GetClassConstructor(SubMenu)
  subMenus: SubMenu[] = [];
  subMenusForDelete: string[] = [];

  constructor(i?: Menu) {
    ClassHelper.BuildClass(this, i);
  }

  getLink(): string {
    return this.link;
  }

  withoutChildren(): boolean {
    return this.subMenus.length === 0;
  }

  getFileInfos(): IFileInfo[] {
    const fileInfos: IFileInfo[] = [];
    return fileInfos;
  }

  addSubMenu(): void {
    this.subMenus.push(new SubMenu());
  }

  removeSubMenu(index: number): void {
    const idForDelete = this.subMenus[index].id;
    if (idForDelete) {
      this.subMenusForDelete.push(idForDelete);
    }
    this.subMenus.splice(index, 1);
  }

  setColorsForSubMenus(): void {
    const colors: string[] = ['#00A248', '#E63021', '#006BB5', '#F3911F', '#6F6D6B'];
    let i = 0;
    this.subMenus.forEach((subMenu) => {
      subMenu.color = colors[i];
      i === colors.length - 1 ? (i = 0) : i++;
    });
  }

  containPath(path: string): boolean {
    return this.getLink() === path || !!this.subMenus.find((subMenu: SubMenu) => subMenu.getLink() === path);
  }
}
