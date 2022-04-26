import RegisterProperty from '@/classes/registers/RegisterProperty';
import IRegisterGroup from '@/interfaces/registers/IRegisterGroup';
import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';

export default class RegisterGroup implements IRegisterGroup {
  id?: string;
  name = '';
  order = 0;
  registerProperties: IRegisterProperty[] = [];
  registerPropertiesForDelete: string[] = [];
  isEdit = false;

  constructor(i?: IRegisterGroup) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.order = i.order;
    this.isEdit = i.isEdit;
    if (i.registerProperties) {
      this.registerProperties = i.registerProperties.map((item: IRegisterProperty) => new RegisterProperty(item));
    }
  }

  editRegisterGroup(isEdit?: boolean): void {
    this.isEdit = isEdit ?? !this.isEdit;
  }

  addRegisterProperty(item?: IRegisterProperty): void {
    this.registerProperties.push(new RegisterProperty(item));
  }

  removeRegisterProperty(index: number): void {
    const idForDelete = this.registerProperties[index].id;
    if (idForDelete) {
      this.registerPropertiesForDelete.push(idForDelete);
    }
    this.registerProperties.splice(index, 1);
  }

  sortProperties(): void {
    this.registerProperties.forEach((item: IRegisterProperty, index: number) => (item.order = index));
  }
}
