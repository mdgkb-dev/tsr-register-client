import RegisterPropertyOther from '@/classes/RegisterPropertyOther';
import IRegisterProperty from '@/interfaces/IRegisterProperty';
import IRegisterPropertyOther from '@/interfaces/IRegisterPropertyOther';
import IRegisterPropertyRadio from '@/interfaces/IRegisterPropertyRadio';

export default class RegisterPropertyRadio implements IRegisterPropertyRadio {
  id?: string;
  name = '';
  registerPropertyId?: string;
  registerProperty?: IRegisterProperty;
  registerPropertyOthers: IRegisterPropertyOther[] = [];
  registerPropertyOthersForDelete: string[] = [];
  order = 0;
  constructor(i?: IRegisterPropertyRadio) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.order = i.order;
    this.registerPropertyId = i.registerPropertyId;
    if (i.registerPropertyOthers) {
      this.registerPropertyOthers = i.registerPropertyOthers.map((item: IRegisterPropertyOther) => new RegisterPropertyOther(item));
    }
  }

  addRegisterPropertyOther(): void {
    this.registerPropertyOthers.push(new RegisterPropertyOther());
  }

  removeRegisterPropertyOther(index: number): void {
    const idForDelete = this.registerPropertyOthers[index].id;
    if (idForDelete) {
      this.registerPropertyOthersForDelete.push(idForDelete);
    }
    this.registerPropertyOthers.splice(index, 1);
  }
}
