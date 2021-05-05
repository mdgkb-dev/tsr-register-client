import ISurgicalIntervention from '@/interfaces/sma/ISurgicalIntervention';

export default interface SmaPatientStatus {
  id: string;
  smaId: string;
  cantHoldHeadUp: boolean;
  scoliosis: boolean;
  respiratorySupport: string;
  tracheotomy: boolean;
  firstSmaSymptomsDate: Date;
  SurgicalIntervention: ISurgicalIntervention[];
}
