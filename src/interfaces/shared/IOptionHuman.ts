import IHuman from '@/interfaces/IHuman';
import IOption from '@/interfaces/shared/IOption';

export default interface IOptionHuman extends IOption {
  human: IHuman;
}
