import { v4 as uuidv4 } from 'uuid';

import Drug from '@/classes/Drug';
import DrugDoze from '@/classes/DrugDoze';
import DrugForm from '@/classes/DrugForm';
import ClassHelper from '@/services/ClassHelper';

export default class DrugRecipe {
  id?: string;

  @ClassHelper.GetClassConstructor(Drug)
  drug?: Drug;
  drugId?: string;

  @ClassHelper.GetClassConstructor(DrugForm)
  drugForm?: DrugForm;
  drugFormId?: string;

  @ClassHelper.GetClassConstructor(DrugDoze)
  drugDoze?: DrugDoze;
  drugDozeId?: string;

  constructor(i?: Drug) {
    ClassHelper.BuildClass(this, i);
  }

  static Create(drug: Drug, drugForm: DrugForm, drugDoze: DrugDoze): DrugRecipe {
    const item = new DrugRecipe();
    item.id = uuidv4();
    item.drug = drug;
    item.drugId = drug.id;

    item.drugForm = drugForm;
    item.drugFormId = drugForm.id;

    item.drugDoze = drugDoze;
    item.drugDozeId = drugDoze.id;
    return item;
  }

  getName(): string {
    return this.drug ? this.drug.nameINN : '';
  }

  setDrug(item?: Drug): void {
    this.drug = item;
    this.drugId = item ? item.id : undefined;
    this.setDrugForm();
  }

  setDrugForm(item?: DrugForm): void {
    this.drugForm = item;
    this.drugFormId = item ? item.id : undefined;
    this.setDrugDoze();
  }

  setDrugDoze(item?: DrugDoze): void {
    this.drugDoze = item;
    this.drugDozeId = item ? item.id : undefined;
  }

  getFullName(): string {
    const drugName = this.drug ? this.drug.name : '';
    const drugFormName = this.drugForm ? this.drugForm.name : '';
    const drugDozeName = this.drugDoze ? this.drugDoze.name : '';
    return `${drugName}, ${drugFormName}, ${drugDozeName}`;
  }
}
