import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import InsuranceCompaniesList from '@/components/InsuranceCompanies/InsuranceCompaniesList.vue';
import InsuranceCompanyPage from '@/components/InsuranceCompanies/InsuranceCompanyPage.vue';
import { isAuthorized } from '@/router/index';

export default [
  {
    path: '/insurance-companies',
    name: 'InsuranceCompanies',
    component: InsuranceCompaniesList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/insurance-companies/new',
    name: 'CreateInsuranceCompany',
    component: InsuranceCompanyPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/insurance-companies/:insuranceCompanyId',
    name: 'EditInsuranceCompany',
    component: InsuranceCompanyPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
];
