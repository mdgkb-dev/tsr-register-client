import IHeightWeight from '@/interfaces/anthropometry/IHeightWeight';
import Bmi from '@/classes/bmi/Bmi';
import IAnthropometryData from '@/interfaces/anthropometry/IAnthropometryData';
import AnthropometryDate from '@/classes/anthropometry/AnthropometryData';

export default class HeightWeight implements IHeightWeight {
  id: string;
  anthropometryId: string;
  height: number;
  weight: number;
  date: string;

  constructor(id = '', anthropometryId = '', height = 0, weight = 0, date = '') {
    this.id = id;
    this.anthropometryId = anthropometryId;
    this.height = height;
    this.weight = weight;
    this.date = date;
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

  static anthropometryDataToHeightWeightArr(anthropometryData: IAnthropometryData[]): IHeightWeight[] {
    let heightWeight = new HeightWeight();
    const resultHeightWeight: IHeightWeight[] = [];

    anthropometryData.forEach((a: IAnthropometryData) => {
      if (!a.anthropometry) return;
      if (a.isHeight()) {
        heightWeight.height = a.value;
      }
      if (a.isWeight()) {
        heightWeight.weight = a.value;
      }
      if (heightWeight.height && heightWeight.weight) {
        resultHeightWeight.push(new HeightWeight(a.id, a.anthropometryId, heightWeight.height, heightWeight.weight, a.date));
        heightWeight = new HeightWeight();
      }
    });

    return resultHeightWeight;
  }

  static toAnthropometryData(heightWeight: IHeightWeight[], patientId?: string): IAnthropometryData[] {
    const result: IAnthropometryData[] = [];
    heightWeight.forEach((heightWightItem: IHeightWeight) => {
      const anthro = new AnthropometryDate();
      anthro.patientId = patientId;
      anthro.id = heightWightItem.id;
      anthro.value = heightWightItem.height ?? heightWightItem.weight;
      anthro.date = heightWightItem.date;
      anthro.anthropometryId = heightWightItem.anthropometryId;
      result.push(anthro);
    });
    return result;
  }
}
