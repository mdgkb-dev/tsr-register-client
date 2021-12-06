import RegisterPropertyOther from '@/classes/registers/RegisterPropertyOther';
import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';
import IRegisterPropertyOther from '@/interfaces/registers/IRegisterPropertyOther';
import IRegisterPropertyRadio from '@/interfaces/registers/IRegisterPropertyRadio';

export default class RegisterPropertyRadio implements IRegisterPropertyRadio {
  id?: string;
  name = '';
  registerPropertyId?: string;
  registerProperty?: IRegisterProperty;
  registerPropertyOthers: IRegisterPropertyOther[] = [];
  registerPropertyOthersForDelete: string[] = [];
  constructor(i?: IRegisterPropertyRadio) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
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
