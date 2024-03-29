import AdminCommissionsRoutes from '@/router/AdminCommissionsRoutes';
import AdminDrugArrivesRoutes from '@/router/AdminDrugArrivesRoutes';
import AdminDrugsApplicationsRoutes from '@/router/AdminDrugsApplicationsRoutes';
import AdminPatientsRoutes from '@/router/AdminPatientsRoutes';
import AdminRepresentativeRoutes from '@/router/AdminRepresentativeRoutes';

import AdminResearchesRouters from './AdminResearchesRouters';

export default [
  ...AdminPatientsRoutes,
  ...AdminRepresentativeRoutes,
  ...AdminDrugsApplicationsRoutes,
  ...AdminDrugArrivesRoutes,
  ...AdminCommissionsRoutes,
  ...AdminResearchesRouters,
];
