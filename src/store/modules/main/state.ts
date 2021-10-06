import IMainHeader from '@/interfaces/shared/IMainHeader';

export interface State {
  isDrawerOpen: boolean;
  mainHeader: IMainHeader;
  activeMenu: string;
}
