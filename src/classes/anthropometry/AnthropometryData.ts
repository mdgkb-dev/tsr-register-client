import IAnthropometryData from '@/interfaces/anthropometry/IAnthropometryData';
import IAnthropometry from '@/interfaces/anthropometry/IAnthropometry';

export default class AnthropometryDate implements IAnthropometryData {
  id?: string;
  patientId?: string;
  value = 0;
  date = '';
  anthropometryId?: string;
  anthropometry?: IAnthropometry;

  constructor(anthropometryDate?: IAnthropometryData) {
    if (!anthropometryDate) {
      return;
    }
    this.id = anthropometryDate.id;
    this.anthropometryId = anthropometryDate.anthropometryId;
    this.patientId = anthropometryDate.patientId;
    this.value = anthropometryDate.value;
    this.date = anthropometryDate.date;
    this.anthropometry = anthropometryDate.anthropometry;
  }

  getFullInfo(): string {
    return `${this.anthropometry?.name}: ${this.value} ${this.anthropometry?.measure}.`;
  }

  isWeight(): boolean {
    if (!this.anthropometry) return false;
    return this.anthropometry.name.toLowerCase() === 'вес';
  }

  isHeight(): boolean {
    if (!this.anthropometry) return false;
    return this.anthropometry.name.toLowerCase() === 'рост';
  }
}
