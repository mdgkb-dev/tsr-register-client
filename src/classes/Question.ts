import AnswerVariant from '@/classes/AnswerVariant';
import QuestionExample from '@/classes/QuestionExample';
import QuestionMeasure from '@/classes/QuestionMeasure';
import QuestionVariant from '@/classes/QuestionVariant';
import ValueType from '@/services/classes/ValueType';
import ClassHelper from '@/services/ClassHelper';

export default class Question {
  id?: string;
  name = '';
  code = '';
  valueTypeId?: string;
  order = 0;
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
  @ClassHelper.GetClassConstructor(QuestionMeasure)
  questionMeasures: QuestionMeasure[] = [];
  showSet = false;
  showRadio = false;
  isEdit = false;
  @ClassHelper.GetClassConstructor(Question)
  children: Question[] = [];
  @ClassHelper.GetClassConstructor(Question)
  parent?: Question;
  parentId?: string;

  researchId?: string;
  selected = false;

  constructor(i?: Question) {
    ClassHelper.BuildClass(this, i);
    this.changeRelation([this.valueType]);
  }
  static Create(researchId?: string): Question {
    const item = new Question();
    item.researchId = researchId;
    return item;
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

  getIdWithoutDashes(): string {
    return this.id ? this.id.replaceAll(/[^a-zA-Z]+/g, '') : '';
  }

  static GetClassName(): string {
    return 'question';
  }

  setType(item: ValueType): void {
    this.valueType = item;
    this.valueTypeId = item.id;
  }

  setName(item: string): void {
    this.name = item;
  }

  addAnswerVariant(): AnswerVariant {
    const item = AnswerVariant.Create(this.id);
    item.name = 'Вариант';
    this.answerVariants.push(item);
    return item;
  }
  addChild(): Question {
    const item = Question.Create();
    item.parentId = this.id;
    item.name = 'Вопрос';
    this.children.push(item);
    return item;
  }
  addQuestionVariant(): QuestionVariant {
    const item = QuestionVariant.Create(this.id);
    this.questionVariants.push(item);
    return item;
  }
}
