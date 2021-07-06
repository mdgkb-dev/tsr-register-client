import IAnthropometry from '@/interfaces/anthropometry/IAnthropometry';

export default interface IAnthropometryData {
  id?: string;
  anthropometryId?: string;
  patientId?: string;
  value: number;
  date: string;
  anthropometry?: IAnthropometry;

  getFullInfo: () => string;
  getShortInfo: () => string;
  isWeight: () => boolean;
  isHeight: () => boolean;
}
