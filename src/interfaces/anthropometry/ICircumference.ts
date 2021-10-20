import IChestCircumferenceGroup from '@/interfaces/anthropometry/IChestCircumferenceGroup';
import IHeadCircumferenceGroup from '@/interfaces/anthropometry/IHeadCircumferenceGroup';
import IColorPercentile from '@/interfaces/shared/IColorPercentile';

export default interface ICircumference {
  id?: string;
  value: number;
  date: string;
  patientId?: string;
  findChestCircumferenceGroup: (month: number, isMale: boolean) => IChestCircumferenceGroup | undefined;
  findHeadCircumferenceGroup: (month: number, isMale: boolean) => IHeadCircumferenceGroup;
  calculateChestCircumferenceGroup: (chestCircumference: number, monthGroups: IChestCircumferenceGroup) => string;
  getCircumferenceGroupRecomendation: (group: string) => IColorPercentile | string;
  getChestCircumferenceGroup: (dateBirth: string, isMale: boolean) => IColorPercentile | string;
  getHeadCircumferenceGroup: (dateBirth: string, isMale: boolean) => IColorPercentile | string;
}
