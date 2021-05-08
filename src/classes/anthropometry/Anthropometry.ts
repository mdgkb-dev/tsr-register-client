import IAnthropometry from '@/interfaces/anthropometry/IAnthropometry';

export default class Anthropometry implements IAnthropometry {
  id?: string;

  name: string;

  measure: string;

  constructor() {
    this.name = '';
    this.measure = '';
  }
}
