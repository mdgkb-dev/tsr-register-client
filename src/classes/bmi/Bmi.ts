import BmiBoys from '@/classes/bmi/BmiBoys';
import BmiGirls from '@/classes/bmi/BmiGirls';

interface IBmiMonth {
  '1st': number;
  '3rd': number;
  '5th': number;
  '15th': number;
  '25th': number;
  '50th': number;
  '75th': number;
  '85th': number;
  '95th': number;
  '97th': number;
  '99th': number;
}

export default class Bmi {
  // вес в кг поделить на рост в метрах в квадрате
  // рост будет передаваться в сантиметрах
  static calculate = (weight: number, height: number): number => {
    const m2 = height / 100;
    const h2 = m2 * m2;
    return weight / h2;
  };

  static birthDateToMonth = (birthDate: string): number => (new Date().getFullYear() - new Date(birthDate).getFullYear()) * 12;

  static birthDateToMeasureToMonth = (birthDate: string, measureDate: string): number =>
    (new Date(measureDate).getFullYear() - new Date(birthDate).getFullYear()) * 12;

  static findBmiMonth = (month: number, isMale: boolean): IBmiMonth => {
    if (isMale) {
      return BmiBoys[month + 1];
    }
    return BmiGirls[month + 1];
  };

  static calculateGroup = (bmi: number, bmiMonth: IBmiMonth): string => {
    let groupBmi = 0;
    for (const group in bmiMonth) {
      if (Object.prototype.hasOwnProperty.call(bmiMonth, group)) {
        groupBmi = (bmiMonth as any)[group];
        if (bmi < groupBmi) {
          return group;
        }
      }
    }
    return '';
  };

  static getWeightClass = (group: string): string => {
    switch (group) {
      case '1st':
      case '99th':
        return 'есть вероятность патологии развития';
      case '3rd':
      case '5th':
      case '95th':
      case '97th':
        return 'возможно потребуются дополнительные обследования и консультации специалистов';
      case '15th':
      case '85th':
        return 'требуются дополнительные обследования и консультации специалистов';
      case '25th':
      case '75th':
        return 'нормальный вес';
      case '50th':
        return 'эталон';
      default:
        return '';
    }
  };
}
