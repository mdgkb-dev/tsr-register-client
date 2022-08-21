import IHeightWeightConstructor from '@/interfaces/anthropometry/IHeightWeightConstructor';
import IColorPercentile from '@/interfaces/shared/IColorPercentile';

export default interface IHeightWeight extends IHeightWeightConstructor {
  getBmiGroup: (dateBirth: Date, isMale: boolean) => IColorPercentile | string;
}
