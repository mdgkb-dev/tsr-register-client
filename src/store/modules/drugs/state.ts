import IDrug from '@/interfaces/drugs/IDrug';

export interface State {
  drugs: IDrug[];
  drug: IDrug;
  activeCollapseName: string;
}
