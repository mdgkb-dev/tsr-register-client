import Bmi from '@/classes/bmi/Bmi';
import IHeightWeight from '@/interfaces/anthropometry/IHeightWeight';
import IHeightWeightConstructor from '@/interfaces/anthropometry/IHeightWeightConstructor';
import IColorPercentile from '@/interfaces/shared/IColorPercentile';

export default class HeightWeight implements IHeightWeight {
  id?: string;
  height = 0;
  weight = 0;
  date = '';
  patientId?: string;

  constructor(i?: IHeightWeightConstructor) {
    if (!i) {
      return;
    }

    this.id = i.id;
    this.height = i.height;
    this.weight = i.weight;
    this.date = i.date;
    this.patientId = i.patientId;
  }

  getBmiGroup(dateBirth: Date, isMale: boolean): IColorPercentile | string {
    if (!this.weight || !this.height) {
      return 'Недостаточно данных';
    }
    const bmi = Bmi.calculate(this.weight, this.height);
    const monthFromBirth = Bmi.birthDateToMeasureToMonth(dateBirth, this.date);
    const bmiMonth = Bmi.findBmiMonth(monthFromBirth, isMale);
    if (!bmiMonth) {
      return 'Некорректные данные по дате рождения или дате изменения';
    }
    const group = Bmi.calculateGroup(bmi, bmiMonth);
    if (!group) {
      return 'Некорректные данные антропометрии';
    }
    return Bmi.getGroup(group);
  }
}
