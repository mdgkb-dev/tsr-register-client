import ColorPercentile from '@/classes//shared/ColorPercentile';
import BmiBoys from '@/classes/bmi/BmiBoys';
import BmiGirls from '@/classes/bmi/BmiGirls';

type BmiMonths = '1st' | '3rd' | '5th' | '15th' | '25th' | '50th' | '75th' | '85th' | '95th' | '97th' | '99th';

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

  static birthDateToMonth = (birthDate: string): number => {
    return (new Date().getFullYear() - new Date(birthDate).getFullYear()) * 12;
  };

  static birthDateToMeasureToMonth = (birthDate: Date, measureDate: string): number => {
    const dateFrom = new Date(measureDate);
    const dateTo = new Date(birthDate);
    return dateTo.getMonth() - dateFrom.getMonth() + (dateFrom.getFullYear() - dateTo.getFullYear()) * 12;
  };

  static findBmiMonth = (month: number, isMale: boolean): IBmiMonth => {
    if (isMale) {
      return BmiBoys[month + 1];
    }

    return BmiGirls[month + 1];
  };

  static calculateGroup = (bmi: number, bmiMonth: IBmiMonth): string => {
    let groupBmi = 0;

    for (const groupProp in bmiMonth) {
      const group: BmiMonths = groupProp as BmiMonths;

      if (Object.prototype.hasOwnProperty.call(bmiMonth, group)) {
        groupBmi = bmiMonth[group];

        if (bmi < groupBmi && bmi >= bmiMonth['1st']) {
          return group;
        }
      }
    }

    return '';
  };

  static getGroup = (group: string): ColorPercentile | string => {
    const red = 'Eсть вероятность патологии развития';
    const orange = 'Возможно потребуются дополнительные обследования и консультации специалистов';
    const yellow = 'Требуются дополнительные обследования и консультации специалистов';
    const lightGreen = 'Нормальный вес';
    const green = 'Эталон';
    switch (group) {
      case '1st':
        return new ColorPercentile({ color: 'red', recomendation: red, percentiles: '1st' });
      case '99th':
        return new ColorPercentile({ color: 'red', recomendation: red, percentiles: '99th' });

      case '3rd':
        return new ColorPercentile({ color: 'orange', recomendation: orange, percentiles: '3rd' });
      case '5th':
        return new ColorPercentile({ color: 'orange', recomendation: orange, percentiles: '5th' });
      case '95th':
        return new ColorPercentile({ color: 'orange', recomendation: orange, percentiles: '95th' });
      case '97th':
        return new ColorPercentile({ color: 'orange', recomendation: orange, percentiles: '97th' });

      case '15th':
        return new ColorPercentile({ color: 'yellow', recomendation: yellow, percentiles: '15th' });
      case '85th':
        return new ColorPercentile({ color: 'yellow', recomendation: yellow, percentiles: '85th' });

      case '25th':
        return new ColorPercentile({ color: 'lightGreen', recomendation: lightGreen, percentiles: '25th' });
      case '75th':
        return new ColorPercentile({ color: 'lightGreen', recomendation: lightGreen, percentiles: '75th' });

      case '50th':
        return new ColorPercentile({ color: 'green', recomendation: green, percentiles: '50th' });

      default:
        return '';
    }
  };
}
