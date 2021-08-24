import Bmi from '@/classes/bmi/Bmi';
import IHeightWeight from '@/interfaces/anthropometry/IHeightWeight';

export default class HeightWeight implements IHeightWeight {
  id?: string;
  height = 0;
  weight = 0;
  date = '';
  patientId?: string;

  constructor(i?: IHeightWeight) {
    if (!i) return;
    this.id = i.id;
    this.height = i.height;
    this.weight = i.weight;
    this.date = i.date;
    this.patientId = i.patientId;
  }

  getBmiGroup(birthDate: string, isMale: boolean): string {
    if (!this.weight || !this.height) return 'Недостаточно данных';
    const bmi = Bmi.calculate(this.weight, this.height);
    const monthFromBirth = Bmi.birthDateToMeasureToMonth(birthDate, this.date);
    const bmiMonth = Bmi.findBmiMonth(monthFromBirth, isMale);
    if (!bmiMonth) return 'Данные по данной дате рождения неизвестны';
    const group = Bmi.calculateGroup(bmi, bmiMonth);
    if (!group) return 'Некорректные данные антропометрии';
    const weightClass = Bmi.getWeightClass(group);
    return `${group}, ${weightClass}`;
  }
}
