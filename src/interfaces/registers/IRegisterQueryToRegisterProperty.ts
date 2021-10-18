export default interface IRegisterQueryToRegisterProperty {
  id?: string;
  registerQueryId?: string;
  registerPropertyId?: string;
  order: number;
  isAggregate: boolean;
}
