import IPatient from '@/interfaces/patients/IPatient';
import IHuman from '@/interfaces/humans/IHuman';
import IAnthropometryData from '@/interfaces/anthropometry/IAnthropometryData';
import Human from '@/classes/humans/Human';
import AnthropometryData from '@/classes/anthropometry/AnthropometryData';
import IDisability from '@/interfaces/disabilities/IDisability';
import RepresentativeToPatient from '@/classes/representatives/RepresentativeToPatient';
import IRepresentativeToPatient from '@/interfaces/representatives/IRepresentativeToPatient';
import Disability from '@/classes/disability/Disability';
import IPatientDiagnosis from '@/interfaces/patients/IPatientDiagnosis';
import PatientDiagnosis from '@/classes/patients/PatientDiagnosis';
import Bmi from '../bmi/Bmi';

export default class Patient implements IPatient {
  id?: string;
  human: IHuman = new Human();
  anthropometryData: IAnthropometryData[] = [];
  representativeToPatient: IRepresentativeToPatient[] = [];
  disabilities: IDisability[] = [];
  patientDiagnosis: IPatientDiagnosis[] = [];

  constructor(patient?: IPatient) {
    if (!patient) {
      return;
    }
    this.id = patient.id;
    this.human = new Human(patient.human);
    this.anthropometryData = patient.anthropometryData.map((a: IAnthropometryData) => new AnthropometryData(a));
    if (patient.patientDiagnosis) {
      this.patientDiagnosis = patient.patientDiagnosis.map((patientDiagnosis: IPatientDiagnosis) => new PatientDiagnosis(patientDiagnosis));
    }
    if (patient.representativeToPatient) {
      this.representativeToPatient = patient.representativeToPatient.map(
        (representativeToPatient: IRepresentativeToPatient) => new RepresentativeToPatient(representativeToPatient),
      );
    }
    if (patient.disabilities) {
      this.disabilities = patient.disabilities.map((disability: IDisability) => new Disability(disability));
    }
  }

  getAnthropometryDataFull(): string {
    let total = '';
    // const anthropometryNames: (string | undefined)[] = [...new Set(this.anthropometryData.map((data: IAnthropometryData) => data.anthropometry?.name))];
    const anthropometryNames: string[] = ['Вес', 'Рост'];
    anthropometryNames.forEach((name: string) => {
      const currentAnthropometryData = this.anthropometryData.filter((data: IAnthropometryData) => data.anthropometry?.name.toLowerCase() === name.toLowerCase());
      if (currentAnthropometryData.length) {
        const lastAnthropometry = currentAnthropometryData.reduce((mostRecent: IAnthropometryData, item: IAnthropometryData) => (new Date(item.date) > new Date(mostRecent.date) ? item : mostRecent));
        total = `${total} ${lastAnthropometry.getFullInfo()} \n`;
      }
    });
    return total;
  }

  getActuallyDisability(): IDisability {
    return this.disabilities[this.disabilities.length - 1];
  }

  getLastAnthropometryValue(name: string): number {
    const currentAnthropometryData = this.anthropometryData.filter((data) => data.anthropometry?.name.toLowerCase() === name.toLowerCase());
    if (!currentAnthropometryData.length) return 0;
    const lastAnthropometry = currentAnthropometryData.reduce((mostRecent: IAnthropometryData, item: IAnthropometryData) => (new Date(item.date) > new Date(mostRecent.date) ? item : mostRecent));
    return lastAnthropometry.value;
  }

  getBmiGroup(): string {
    const lastWeight = this.getLastAnthropometryValue('вес');
    const lastHeight = this.getLastAnthropometryValue('рост');
    if (!lastWeight || !lastHeight) return 'Недостаточно данных';
    const bmi = Bmi.calculate(lastWeight, lastHeight);
    const month = Bmi.birthDateToMonth(this.human.dateBirth);
    const bmiMonth = Bmi.findBmiMonth(month, this.human.isMale);
    if (!bmiMonth) return 'Данные по данной дате рождения неизвестны';
    const group = Bmi.calculateGroup(bmi, bmiMonth);
    if (!group) return 'Некорректные данные антропометрии';
    const weightClass = Bmi.getWeightClass(bmi);
    console.log(bmi);
    const result = `${group}, ${weightClass}`;
    return result;
  }
}
