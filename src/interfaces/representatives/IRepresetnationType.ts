export default interface IRepresentationType {
  id?: string;
  type: string;
  patientId?: string;
  patient?: {
    id?: string;
  };
}
