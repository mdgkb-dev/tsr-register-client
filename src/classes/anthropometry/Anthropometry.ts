import IAnthropometry from '@/interfaces/anthropometry/IAnthropometry';

export default class Anthropometry implements IAnthropometry {
  id?: string;
  name: string = '';
  measure: string = '';

  constructor(anthropometry?: IAnthropometry) {
    if (!anthropometry) {
      return;
    }
    this.id = anthropometry.id;
    this.name = anthropometry.name;
    this.measure = anthropometry.measure;
  }
}
