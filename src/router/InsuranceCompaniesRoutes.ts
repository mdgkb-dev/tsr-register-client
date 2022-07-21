import InsuranceCompaniesList from '@/components/InsuranceCompanies/InsuranceCompaniesList.vue';
import InsuranceCompanyPage from '@/components/InsuranceCompanies/InsuranceCompanyPage.vue';

export default [
  {
    path: '/insurance-companies',
    name: 'InsuranceCompanies',
    component: InsuranceCompaniesList,
  },
  {
    path: '/insurance-companies/new',
    name: 'CreateInsuranceCompany',
    component: InsuranceCompanyPage,
  },
  {
    path: '/insurance-companies/:insuranceCompanyId',
    name: 'EditInsuranceCompany',
    component: InsuranceCompanyPage,
  },
];
