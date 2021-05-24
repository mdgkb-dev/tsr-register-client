import IRepresentativeType from '@/interfaces/representatives/IRepresentativeType';

export interface State {
  representativeTypes: IRepresentativeType[];
  representativeType?: IRepresentativeType;
}
