import { ILoadingInstance } from 'element-plus';

import IAdminMenu from '@/interfaces/IAdminMenu';
import AdminHeaderParams from '@/services/classes/admin/AdminHeaderParams';
// import IApplicationsCount from '@/interfaces/IApplicationsCount';
import ISearchQuery from '@/services/interfaces/ISearchQuery';

export interface State {
  headerParams: AdminHeaderParams;
  isCollapseSideMenu: boolean;
  showHeader: boolean;
  isDrawerOpen: boolean;
  loading: ILoadingInstance | undefined;
  menus: IAdminMenu[];
  searchMenus: ISearchQuery[];
  headSpinner: boolean;
  headSuccess: boolean;
  // applicationsCounts: IApplicationsCount[];
}
