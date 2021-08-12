import IInsuranceCompany from '@/interfaces/insuranceCompanies/IInsuranceCompany';

export interface State {
  insuranceCompanies: IInsuranceCompany[];
  insuranceCompany: IInsuranceCompany;
}
