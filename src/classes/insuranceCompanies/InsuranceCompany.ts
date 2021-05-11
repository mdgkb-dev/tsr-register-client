import IInsuranceCompany from '@/interfaces/insuranceCompanies/IInsuranceCompany';

export default class InsuranceCompany implements IInsuranceCompany {
  id?: string;
  name = '';

  constructor(insuranceCompany?: IInsuranceCompany) {
    if (!insuranceCompany) {
      return;
    }
    this.id = insuranceCompany.id;
    this.name = insuranceCompany.name ?? '';
  }
}
