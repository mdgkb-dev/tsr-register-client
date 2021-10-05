import IInsuranceCompany from '@/interfaces/insuranceCompanies/IInsuranceCompany';

export default interface IInsuranceCompanyToHuman {
  id?: string;
  insuranceCompanyId?: string;
  insuranceCompany?: IInsuranceCompany;
  humanId?: string;
  number: string;
}
