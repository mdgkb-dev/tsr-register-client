import IAnthropometry from '@/interfaces/anthropometry/IAnthropometry';

export default class Anthropometry implements IAnthropometry {
  id?: string;
  name: string;
  measure: string;

  constructor() {
    this.id = '';
    this.name = '';
    this.measure = '';
  }
}
