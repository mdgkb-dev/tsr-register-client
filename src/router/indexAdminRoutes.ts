import AdminDrugArrivesRoutes from '@/router/AdminDrugArrivesRoutes';
import AdminDrugsApplicationsRoutes from '@/router/AdminDrugsApplicationsRoutes';
import AdminPatientsRoutes from '@/router/AdminPatientsRoutes';
import AdminRepresentativeRoutes from '@/router/AdminRepresentativeRoutes';

export default [...AdminPatientsRoutes, ...AdminRepresentativeRoutes, ...AdminDrugsApplicationsRoutes, ...AdminDrugArrivesRoutes];
