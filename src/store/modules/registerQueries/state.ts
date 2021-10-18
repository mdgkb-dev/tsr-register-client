import IRegisterQuery from '@/interfaces/registers/IRegisterQuery';

export default interface State {
  registerQuery: IRegisterQuery;
  registerQueries: IRegisterQuery[];
  isAddPropertyDisabled: boolean;
}
