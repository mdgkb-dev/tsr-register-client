import AnswerVariant from '@/classes/AnswerVariant';
import QuestionExample from '@/classes/QuestionExample';
import QuestionMeasure from '@/classes/QuestionMeasure';
import QuestionVariant from '@/classes/QuestionVariant';
import ValueType from '@/classes/valueTypes/ValueType';
import ClassHelper from '@/services/ClassHelper';

export default class Question {
  id?: string;
  name = '';
  shortName = '';
  code = '';
  colWidth = 150;
  valueTypeId?: string;
  order = 0;
  setFilterString = '';
  ageCompare = false;
  @ClassHelper.GetClassConstructor(AnswerVariant)
  answerVariants: AnswerVariant[] = [];
  answerVariantsForDelete: string[] = [];
  // @ClassHelper.GetClassConstructor(RegisterPropertyOther)
  // registerPropertyOthers: RegisterPropertyOther[] = [];
  @ClassHelper.GetClassConstructor(QuestionExample)
  questionExamples: QuestionExample[] = [];
  questionExamplesForDelete: string[] = [];
  @ClassHelper.GetClassConstructor(QuestionVariant)
  questionVariants: QuestionVariant[] = [];
  questionVariantsForDelete: string[] = [];

  valueType: ValueType = new ValueType();
  withOther = false;
  @ClassHelper.GetClassConstructor(QuestionMeasure)
  questionMeasures: QuestionMeasure[] = [];
  questionMeasuresForDelete: string[] = [];
  tag = '';
  showSet = false;
  showRadio = false;
  isEdit = false;
  @ClassHelper.GetClassConstructor(Question)
  children: Question[] = [];
  @ClassHelper.GetClassConstructor(Question)
  parent?: Question;
  parentId?: string;

  constructor(i?: Question) {
    ClassHelper.BuildClass(this, i);
    this.changeRelation([this.valueType]);
  }

  getRegisterPropertyRadioOriginalValue(id: string): string {
    const radio = this.answerVariants.find((propertyRadio: AnswerVariant) => propertyRadio.id === id);
    if (radio) {
      return radio.name;
    }
    return '';
  }

  addRegisterPropertyExample(item?: QuestionExample): void {
    this.questionExamples.push(new QuestionExample(item));
  }

  removeRegisterPropertyExample(i: number): void {
    const idForDelete = this.questionExamples[i].id;
    if (idForDelete) {
      this.questionExamplesForDelete.push(idForDelete);
    }
    this.questionExamples.splice(i, 1);
  }

  addRadioItem(item?: AnswerVariant): void {
    this.answerVariants.push(new AnswerVariant(item));
  }

  removeRadioItem(i: number): void {
    const idForDelete = this.answerVariants[i].id;
    if (idForDelete) {
      this.answerVariantsForDelete.push(idForDelete);
    }
    this.answerVariants.splice(i, 1);
  }

  changeRelation(valueTypes: ValueType[]): void {
    const valueType = valueTypes.find((i: ValueType) => i.id === this.valueTypeId);
    if (!valueType) {
      return;
    }
    if (valueType.isRadio()) {
      this.showRadio = true;
      this.showSet = false;
      return;
    }
    if (valueType.isSet()) {
      this.showSet = true;
      this.showRadio = false;
      return;
    }
    this.showSet = false;
    this.showRadio = false;
    this.valueType = valueType;
  }

  // getOthers(propResult: boolean | string | number | Date | null): RegisterPropertyOther[] {
  //   const radioProperty = this.answers.find((radio: Answer) => radio.id === propResult);
  //   if (radioProperty) {
  //     return radioProperty.registerPropertyOthers;
  //   }
  //   const setProperty = this.registerPropertySets.find((set: RegisterPropertySet) => set.id === propResult);
  //   // console.log(setProperty, propResult);
  //   if (setProperty) {
  //     return setProperty.registerPropertyOthers;
  //   }
  //   return [];
  // }

  editRegisterProperty(isEdit?: boolean): void {
    this.isEdit = isEdit ?? !this.isEdit;
  }

  sortExamples(): void {
    this.questionExamples.forEach((item: QuestionExample, index: number) => (item.order = index));
  }

  addRegisterPropertyMeasure(item?: QuestionMeasure): void {
    this.questionMeasures.push(new QuestionMeasure(item));
  }

  addRegisterPropertyVariant(): void {
    this.questionVariants.push(new QuestionVariant());
  }

  // getRegisterPropertySets(): RegisterPropertySet[] {
  //   if (this.setFilterString === '') {
  //     return this.registerPropertySets;
  //   }
  //
  //   return this.registerPropertySets.filter((s: RegisterPropertySet) => {
  //     return s.name.toLowerCase().includes(this.setFilterString.toLowerCase());
  //   });
  // }
}
