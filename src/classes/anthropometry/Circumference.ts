import ICircumference from '@/interfaces/anthropometry/ICircumference';

export default class Circumference implements ICircumference {
  id?: string;
  value = 0;
  date = '';
  patientId?: string;

  constructor(circumference?: ICircumference) {
    if (!circumference) {
      return;
    }

    this.id = circumference.id;
    this.value = circumference.value;
    this.date = circumference.date;
    this.patientId = circumference.patientId;
  }
}
