import IHeightWeightConstructor from '@/interfaces/anthropometry/IHeightWeightConstructor';

export default interface IHeightWeight extends IHeightWeightConstructor {
  getBmiGroup: (dateBirth: string, isMale: boolean) => string;
}
