import RegisterProperty from '@/classes/RegisterProperty';
import IRegisterGroup from '@/interfaces/IRegisterGroup';
import IRegisterProperty from '@/interfaces/IRegisterProperty';

export default class RegisterGroup implements IRegisterGroup {
  id?: string;
  name = '';
  order = 0;
  registerProperties: IRegisterProperty[] = [];
  registerPropertiesForDelete: string[] = [];
  isEdit = false;
  withDates = false;
  constructor(i?: IRegisterGroup) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.order = i.order;
    this.isEdit = i.isEdit;
    this.withDates = i.withDates;
    if (i.registerProperties) {
      this.registerProperties = i.registerProperties.map((item: IRegisterProperty) => new RegisterProperty(item));
    }
  }

  editRegisterGroup(isEdit?: boolean): void {
    this.isEdit = isEdit ?? !this.isEdit;
  }

  addRegisterProperty(item?: IRegisterProperty): void {
    const newItem = new RegisterProperty(item);
    newItem.order = this.registerProperties.length;
    this.registerProperties.push(newItem);
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
