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
    if (!this.drug) {
      return '';
    }
    return this.drug.nameINN;
  }

  setDrug(item?: Drug) {
    this.drug = item;
    this.drugId = item ? item.id : undefined;
    this.setDrugForm();
  }

  setDrugForm(item?: DrugForm) {
    this.drugForm = item;
    this.drugFormId = item ? item.id : undefined;
    this.setDrugDoze();
  }

  setDrugDoze(item?: DrugDoze) {
    this.drugDoze = item;
    this.drugDozeId = item ? item.id : undefined;
  }

  getStepsFunctions() {
    return [this.setDrug.bind(this), this.setDrugForm.bind(this)];
  }
}
