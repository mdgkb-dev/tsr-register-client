import ColorPercentile from '@/classes//shared/ColorPercentile';
import ChestCircumferenceBoys from '@/classes/anthropometry/ChestCircumferenceBoys';
import ChestCircumferenceGirls from '@/classes/anthropometry/ChestCircumferenceGirls';
import HeadCircumferenceBoys from '@/classes/anthropometry/HeadCircumferenceBoys';
import HeadCircumferenceGirls from '@/classes/anthropometry/HeadCircumferenceGirls';
import Bmi from '@/classes/bmi/Bmi';
import IChestCircumferenceGroup from '@/interfaces/anthropometry/IChestCircumferenceGroup';
import ICircumference from '@/interfaces/anthropometry/ICircumference';
import IHeadCircumferenceGroup from '@/interfaces/anthropometry/IHeadCircumferenceGroup';
import IColorPercentile from '@/interfaces/shared/IColorPercentile';

type ChestCircumferenceGroup = '3rd' | '10th' | '25th' | '50th' | '75th' | '90th' | '97th';
type HeadCircumferenceGroup = '1st' | '3rd' | '5th' | '15th' | '25th' | '50th' | '75th' | '85th' | '95th' | '97th' | '99th';

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

  findChestCircumferenceGroup = (month: number, isMale: boolean): IChestCircumferenceGroup | undefined => {
    const CircumferenceTable = isMale ? ChestCircumferenceBoys : ChestCircumferenceGirls;
    let monthGroups;
    for (let i = 0; i < CircumferenceTable.length; i++) {
      if (month <= CircumferenceTable[i].Month) {
        monthGroups = CircumferenceTable[i];
        break;
      }
    }
    return monthGroups;
  };

  findHeadCircumferenceGroup = (month: number, isMale: boolean): IHeadCircumferenceGroup => {
    return isMale ? HeadCircumferenceBoys[month] : HeadCircumferenceGirls[month];
  };

  calculateChestCircumferenceGroup = (chestCircumference: number, monthGroups: IChestCircumferenceGroup): string => {
    let tableChestCircumference = 0;

    for (const groupProp in monthGroups) {
      const tableGroup: ChestCircumferenceGroup = groupProp as ChestCircumferenceGroup;

      if (Object.prototype.hasOwnProperty.call(monthGroups, tableGroup) && groupProp !== 'Month') {
        tableChestCircumference = monthGroups[tableGroup];

        if (chestCircumference <= tableChestCircumference && chestCircumference >= monthGroups['3rd']) {
          return tableGroup;
        }
      }
    }
    return '';
  };

  calculateHeadCircumferenceGroup = (headCircumference: number, monthGroups: IHeadCircumferenceGroup): string => {
    let tableHeadCircumference = 0;

    for (const groupProp in monthGroups) {
      const tableGroup: HeadCircumferenceGroup = groupProp as HeadCircumferenceGroup;

      if (Object.prototype.hasOwnProperty.call(monthGroups, tableGroup)) {
        tableHeadCircumference = monthGroups[tableGroup];

        if (headCircumference <= tableHeadCircumference && headCircumference >= monthGroups['1st']) {
          return tableGroup;
        }
      }
    }
    return '';
  };

  getCircumferenceGroupRecomendation = (group: string): IColorPercentile | string => {
    const red = 'Есть вероятность патологии развития';
    const orange = 'Требуются дополнительные обследования и консультации специалистов';
    const yellow = 'Оценка развития ниже/выше среднего';
    const lightGreen = 'Норма';
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

      case '10th':
        return new ColorPercentile({ color: 'yellow', recomendation: yellow, percentiles: '10th' });
      case '15th':
        return new ColorPercentile({ color: 'yellow', recomendation: yellow, percentiles: '15th' });
      case '85th':
        return new ColorPercentile({ color: 'yellow', recomendation: yellow, percentiles: '85th' });
      case '90th':
        return new ColorPercentile({ color: 'yellow', recomendation: yellow, percentiles: '90th' });

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

  getChestCircumferenceGroup(dateBirth: Date, isMale: boolean): IColorPercentile | string {
    if (!this.value) {
      return 'Недостаточно данных';
    }
    const monthFromBirth = Bmi.birthDateToMeasureToMonth(dateBirth, this.date);
    const monthGroups = this.findChestCircumferenceGroup(monthFromBirth, isMale);
    if (!monthGroups) {
      return 'Некорректные данные по дате рождения или дате изменения';
    }
    const group = this.calculateChestCircumferenceGroup(this.value, monthGroups);
    if (!group) {
      return 'Некорректные данные окружности груди';
    }
    return this.getCircumferenceGroupRecomendation(group);
  }

  getHeadCircumferenceGroup(dateBirth: Date, isMale: boolean): IColorPercentile | string {
    if (!this.value) {
      return 'Недостаточно данных';
    }
    const monthFromBirth = Bmi.birthDateToMeasureToMonth(dateBirth, this.date);
    const monthGroups = this.findHeadCircumferenceGroup(monthFromBirth, isMale);
    if (!monthGroups) {
      return 'Некорректные данные по дате рождения или дате изменения';
    }
    const group = this.calculateHeadCircumferenceGroup(this.value, monthGroups);
    if (!group) {
      return 'Некорректные данные окружности головы';
    }
    return this.getCircumferenceGroupRecomendation(group);
  }
}
