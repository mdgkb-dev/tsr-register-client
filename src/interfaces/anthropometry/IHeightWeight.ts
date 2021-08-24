export default interface IHeightWeight {
  id?: string;
  height: number;
  weight: number;
  date: string;
  patientId?: string;

  getBmiGroup: (dateBirth: string, isMale: boolean) => string;
}
