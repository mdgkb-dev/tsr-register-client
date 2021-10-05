import InsuranceCompany from '@/classes/insuranceCompanies/InsuranceCompany';
import IInsuranceCompany from '@/interfaces/insuranceCompanies/IInsuranceCompany';
import IInsuranceCompanyToHuman from '@/interfaces/insuranceCompanies/IInsuranceCompanyToHuman';

export default class InsuranceCompanyToHuman implements IInsuranceCompanyToHuman {
  id?: string;
  insuranceCompanyId?: string;
  insuranceCompany?: IInsuranceCompany = new InsuranceCompany();
  humanId?: string;
  number = '';

  constructor(insuranceCompanyToHuman?: IInsuranceCompanyToHuman) {
    if (!insuranceCompanyToHuman) {
      return;
    }
    this.id = insuranceCompanyToHuman.id;
    this.number = insuranceCompanyToHuman.number;
    this.humanId = insuranceCompanyToHuman.humanId;
    this.insuranceCompanyId = insuranceCompanyToHuman.insuranceCompanyId;
    if (insuranceCompanyToHuman.insuranceCompany) {
      this.insuranceCompany = new InsuranceCompany(insuranceCompanyToHuman.insuranceCompany);
    }
  }
}
