import { v4 as uuidv4 } from 'uuid';

import ClassHelper from '@/services/ClassHelper';

export default class SelectedAnswerVariant {
  id?: string;
  answerId?: string;
  answerVariantId?: string;

  constructor(i?: SelectedAnswerVariant) {
    ClassHelper.BuildClass(this, i);
  }

  static Create(answerId?: string, answerVariantId?: string): SelectedAnswerVariant {
    const item = new SelectedAnswerVariant();
    item.id = uuidv4();
    item.answerId = answerId;
    item.answerVariantId = answerVariantId;
    return item;
  }
  static GetClassName(): string {
    return 'selectedAnswerVariant';
  }
}
