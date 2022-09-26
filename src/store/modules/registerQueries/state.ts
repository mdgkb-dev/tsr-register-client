import IRegisterQuery from '@/interfaces/IRegisterQuery';

export default interface State {
  registerQuery: IRegisterQuery;
  registerQueries: IRegisterQuery[];
  isAddPropertyDisabled: boolean;
}
