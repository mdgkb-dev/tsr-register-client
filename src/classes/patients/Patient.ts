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
        (representativeToPatient: IRepresentativeToPatient) => new RepresentativeToPatient(representativeToPatient)
      );
    }
    if (patient.disabilities) {
      this.disabilities = patient.disabilities.map((disability: IDisability) => new Disability(disability));
    }
  }

  getAnthropometryDataFull(): string {
    let total = '';
    this.anthropometryData.forEach((data: IAnthropometryData) => {
      total = `${total} ${data.getFullInfo()} \n`;
    });
    return total;
  }

  getActuallyDisability(): IDisability {
    return this.disabilities[this.disabilities.length - 1];
  }
}
