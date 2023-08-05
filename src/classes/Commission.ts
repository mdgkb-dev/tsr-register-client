import { v4 as uuidv4 } from 'uuid';

import CommissionDoctor from '@/classes/CommissionDoctor';
import CommissionDoctorTemplate from '@/classes/CommissionDoctorTemplate';
import CommissionTemplate from '@/classes/CommissionTemplate';
import Doctor from '@/classes/Doctor';
import DrugRecipe from '@/classes/DrugRecipe';
import FundContract from '@/classes/FundContract';
import Patient from '@/classes/Patient';
import PatientDiagnosis from '@/classes/PatientDiagnosis';
import Status from '@/classes/Status';
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
  @ClassHelper.GetClassConstructor(DrugRecipe)
  drugRecipe?: DrugRecipe;
  drugRecipeId?: string;

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

  @ClassHelper.GetClassConstructor(Status)
  status?: Status;
  statusId?: string;

  constructor(i?: Commission) {
    ClassHelper.BuildClass(this, i);
  }

  static CreateFromTemplate(template: CommissionTemplate): Commission {
    const item = new Commission();
    item.id = uuidv4();
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

  doctorExists(id?: string): boolean {
    return this.commissionsDoctors.some((c: CommissionDoctor) => c.doctorId === id);
  }

  setPatient(patient: Patient): void {
    this.patient = patient;
    this.patientId = patient.id;
    this.setDrugRecipe();
    this.setPatientDiagnosis();
  }

  setPatientDiagnosis(patientDiagnosis?: PatientDiagnosis): void {
    this.patientDiagnosis = patientDiagnosis;
    this.patientDiagnosisId = patientDiagnosis ? patientDiagnosis.id : undefined;
  }

  setDrugRecipe(item?: DrugRecipe): void {
    this.drugRecipe = item;
    this.drugRecipeId = item ? item.id : undefined;
  }

  getProtocolName(): string {
    const formatter = new DateTimeFormat();
    return `Протокол №${this.number} от ${formatter.format(this.date)}. Пациент ${this.patient.human.getFullName()}.docx`;
  }

  canGetProtocol(): boolean {
    return !!this.patient.id && !!this.patient.human.id && !!this.drugRecipe && !!this.patientDiagnosis?.mkbItem;
  }

  getFullNameWithPatient(): string {
    const n = `№${this.number}`;
    const fio = this.patient.human.getShortName();
    return `${n} (${fio})`;
  }
}
