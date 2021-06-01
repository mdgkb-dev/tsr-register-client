export default interface IHeightWeight {
  id: string;
  heightId: string;
  weightId: string;
  height: number;
  weight: number;
  date: string;

  getBmiGroup: (dateBirth: string, isMale: boolean) => string;
}
