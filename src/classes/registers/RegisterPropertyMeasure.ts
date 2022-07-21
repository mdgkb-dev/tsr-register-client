import IRegisterPropertyMeasure from '@/interfaces/registers/IRegisterPropertyMeasure';

export default class RegisterPropertyMeasure implements IRegisterPropertyMeasure {
  id?: string;
  name = '';
  order = 0;

  constructor(i?: IRegisterPropertyMeasure) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.order = i.order;
  }
}
