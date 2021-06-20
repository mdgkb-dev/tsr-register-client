import IHeightWeight from '@/interfaces/anthropometry/IHeightWeight';
import Bmi from '@/classes/bmi/Bmi';
import IAnthropometryData from '@/interfaces/anthropometry/IAnthropometryData';
import AnthropometryDate from '@/classes/anthropometry/AnthropometryData';

export default class HeightWeight implements IHeightWeight {
  id: string;
  heightId: string;
  weightId: string;
  height: number;
  weight: number;
  date: string;

  constructor(id = '', heightId = '', height = 0, weightId = '', weight = 0, date = '') {
    this.id = id;
    this.heightId = heightId;
    this.height = height;
    this.weightId = weightId;
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
        heightWeight.heightId = a.id ?? '';
        heightWeight.height = a.value;
      }
      if (a.isWeight()) {
        heightWeight.weightId = a.id ?? '';
        heightWeight.weight = a.value;
      }
      if (heightWeight.height && heightWeight.weight) {
        resultHeightWeight.push(new HeightWeight(a.id, heightWeight.heightId, heightWeight.height, heightWeight.weightId, heightWeight.weight, a.date));
        heightWeight = new HeightWeight();
      }
    });

    return resultHeightWeight;
  }

  static toAnthropometryData(heightWeight: IHeightWeight[], heightId: string, weightId: string, patientId?: string): IAnthropometryData[] {
    const result: IAnthropometryData[] = [];
    heightWeight.forEach((heightWightItem: IHeightWeight) => {
      const anthro = new AnthropometryDate();
      if (heightWightItem.id !== '') anthro.id = heightWightItem.heightId;
      anthro.patientId = patientId;
      anthro.date = heightWightItem.date;
      anthro.anthropometryId = heightId;
      anthro.value = heightWightItem.height;
      result.push(anthro);

      const anthro2 = new AnthropometryDate();
      if (heightWightItem.id !== '') anthro2.id = heightWightItem.weightId;
      anthro2.patientId = patientId;
      anthro2.date = heightWightItem.date;
      anthro2.anthropometryId = weightId;
      anthro2.value = heightWightItem.weight;
      result.push(anthro2);
    });

    return result;
  }
}
