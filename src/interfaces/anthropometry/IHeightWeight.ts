export default interface IHeightWeight {
  id: string;
  anthropometryId: string;
  height: number;
  weight: number;
  date: string;

  getBmiGroup: (dateBirth: string, isMale: boolean) => string;
}
