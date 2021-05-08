import IAnthropometryData from '@/interfaces/anthropometry/IAnthropometryData';

export default class AnthropometryDate implements IAnthropometryData {
  id?: string;

  anthropometryId?: string;

  patientId?: string;

  value: number;

  date: string;

  constructor() {
    this.anthropometryId = '';
    this.patientId = '';
    this.value = 0;
    this.date = '';
  }
}
