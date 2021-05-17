import IPatient from '@/interfaces/patients/IPatient';
import IHuman from '@/interfaces/humans/IHuman';
import IAnthropometryData from '@/interfaces/anthropometry/IAnthropometryData';
import IMkbToPatient from '@/interfaces/mkb/IMkbToPatient';
import Human from '@/classes/humans/Human';
import MkbToPatient from '@/classes/mkb/MkbToPatient';
import AnthropometryData from '@/classes/anthropometry/AnthropometryData';
import IDisability from '@/interfaces/disabilities/IDisability';
import RepresentativeToPatient from '@/classes/representatives/RepresentativeToPatient';
import IRepresentativeToPatient from '@/interfaces/representatives/IRepresentativeToPatient';
import Disability from '@/classes/disability/Disability';
import Bmi from '../bmi/Bmi';

export default class Patient implements IPatient {
  id?: string;
  human: IHuman = new Human();
  anthropometryData: IAnthropometryData[] = [];
  mkbToPatient: IMkbToPatient[] = [];
  representativeToPatient: IRepresentativeToPatient[] = [];
  disabilities: IDisability[] = [];

  constructor(patient?: IPatient) {
    if (!patient) {
      return;
    }
    this.id = patient.id;
    this.human = new Human(patient.human);
    this.anthropometryData = patient.anthropometryData.map((a: IAnthropometryData) => new AnthropometryData(a));
    if (patient.mkbToPatient) {
      this.mkbToPatient = patient.mkbToPatient.map((mkbToPatient: IMkbToPatient) => new MkbToPatient(mkbToPatient));
    }
    if (patient.representativeToPatient) {
      this.representativeToPatient = patient.representativeToPatient.map(
        (representativeToPatient: IRepresentativeToPatient) => new RepresentativeToPatient(representativeToPatient)
      );
    }
    if (patient.disabilities) {
      this.disabilities = patient.disabilities.map((disability: IDisability) => new Disability(disability));
    }
  }

  getAnthropometryDataFull(): string {
    let total = '';

    const anthropometryNames: (string | undefined)[] = [...new Set(this.anthropometryData.map((data: IAnthropometryData) => data.anthropometry?.name))];
    anthropometryNames.forEach((name: string | undefined) => {
      const lastAnthropometry = this.anthropometryData.reduce((mostRecent: IAnthropometryData, item: IAnthropometryData) => {
        return item.anthropometry?.name === name ?? item.date > mostRecent.date ? item : mostRecent;
      });
      total = `${total} ${lastAnthropometry.getFullInfo()} \n`;
    });
    return total;
  }

  getActuallyDisability(): IDisability {
    return this.disabilities[this.disabilities.length - 1];
  }

  getLastAnthropometryValue(name: string): number {
    const currentAnthropometryData = this.anthropometryData.filter((data: IAnthropometryData) => {
      return data.anthropometry?.name.toLowerCase() === name.toLowerCase();
    });
    if (!currentAnthropometryData.length) return 0;
    const lastAnthropometry = currentAnthropometryData.reduce((mostRecent: IAnthropometryData, item: IAnthropometryData) => {
      return item.date > mostRecent.date ? item : mostRecent;
    });
    return lastAnthropometry.value;
  }

  getBmiGroup(): string {
    const lastWeight = this.getLastAnthropometryValue('вес');
    const lastHeight = this.getLastAnthropometryValue('рост');
    if (!lastWeight || !lastHeight) return 'Недостаточно данных';
    const bmi = Bmi.calculate(lastWeight, lastHeight);
    const month = Bmi.birthDateToMonth(this.human.dateBirth);
    const bmiMonth = Bmi.findBmiMonth(month, this.human.isMale);
    const bmiGroup = Bmi.calculateGroup(bmi, bmiMonth);
    return bmiGroup;
  }
}
