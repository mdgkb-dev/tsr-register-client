export default interface IRepresentationType {
  id?: number;
  type: string;
  patientId?: number;
  patient?: {
    id?: number;
  };
}
