import { v4 as uuidv4 } from 'uuid';

import CommissionDoctor from '@/classes/CommissionDoctor';
import CommissionDoctorTemplate from '@/classes/CommissionDoctorTemplate';
import CommissionTemplate from '@/classes/CommissionTemplate';
import Doctor from '@/classes/Doctor';
import Drug from '@/classes/Drug';
import DrugRegimen from '@/classes/DrugRegimen';
import FundContract from '@/classes/FundContract';
import Patient from '@/classes/Patient';
import PatientDiagnosis from '@/classes/PatientDiagnosis';
import ClassHelper from '@/services/ClassHelper';
import DateTimeFormat from '@/services/DateFormat';

export default class Commission {
  id?: string;
  date = new Date();
  startDate = new Date();
  endDate = new Date();
  @ClassHelper.GetClassConstructor(Patient)
  patient: Patient = new Patient();
  patientId?: string;
  @ClassHelper.GetClassConstructor(Drug)
  drug?: Drug;
  drugId?: string;
  @ClassHelper.GetClassConstructor(DrugRegimen)
  drugRegimen?: DrugRegimen;
  volume = '';
  @ClassHelper.GetClassConstructor(CommissionDoctor)
  commissionsDoctors: CommissionDoctor[] = [];
  number?: number;
  @ClassHelper.GetClassConstructor(FundContract)
  fundContract: FundContract = new FundContract();
  fundContractId?: string;
  @ClassHelper.GetClassConstructor(PatientDiagnosis)
  patientDiagnosis?: PatientDiagnosis;
  patientDiagnosisId?: string;

  constructor(i?: Commission) {
    ClassHelper.BuildClass(this, i);
  }

  static CreateFromTemplate(template: CommissionTemplate): Commission {
    const item = new Commission();
    item.id = uuidv4();
    item.drug = template.drug;
    item.drugRegimen = template.drugRegimen;
    item.volume = template.volume;
    item.commissionsDoctors = template.commissionsDoctorsTemplates.map((cdt: CommissionDoctorTemplate) =>
      CommissionDoctor.CreateFromTemplate(cdt)
    );
    return item;
  }

  addDoctor(doctor: Doctor): CommissionDoctor {
    const item = CommissionDoctor.Create(doctor);
    this.commissionsDoctors.push(item);
    item.commissionId = this.id;
    item.order = this.commissionsDoctors.length - 1;
    return item;
  }

  setPatient(patient: Patient): void {
    this.patient = patient;
    this.patientId = patient.id;
  }

  setDrug(drug: Drug): void {
    this.drug = drug;
    this.drugId = drug.id;
  }

  getProtocolName(): string {
    const formatter = new DateTimeFormat();
    return `Протокол №${this.number} от ${formatter.format(this.date)}. Пациент ${this.patient.human.getFullName()}.docx`;
  }

  canGetProtocol(): boolean {
    return !!this.patient && !!this.patient.human && !!this.drug && !!this.patientDiagnosis?.mkbItem;
  }
}
