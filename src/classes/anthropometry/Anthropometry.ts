import IAnthropometry from '@/interfaces/anthropometry/IAnthropometry';

export default class Anthropometry implements IAnthropometry {
  id?: string;
  name = '';
  measure = '';

  constructor(anthropometry?: IAnthropometry) {
    if (!anthropometry) {
      return;
    }
    this.id = anthropometry.id;
    this.name = anthropometry.name;
    this.measure = anthropometry.measure;
  }

  isWeight(): boolean {
    return this.name.toLowerCase() === 'вес';
  }

  isHeight(): boolean {
    return this.name.toLowerCase() === 'рост';
  }
}
