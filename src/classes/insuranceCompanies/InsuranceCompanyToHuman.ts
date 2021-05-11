import IInsuranceCompanyToHuman from '@/interfaces/insuranceCompanies/IInsuranceCompanyToHuman';

export default class InsuranceCompanyToHuman implements IInsuranceCompanyToHuman {
  id?: string;
  insuranceCompanyId?: string;
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
  }
}
